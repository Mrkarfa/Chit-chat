"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Shuffle,
  Send,
  Loader2,
  SkipForward,
  LogOut,
  Flag,
  Ban,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useChatStore } from "@/lib/stores/chat-store";

type ChatStatus = "idle" | "searching" | "matched" | "ended";

interface RandomMessage {
  id: string;
  session_id: string;
  message_text: string;
  created_at: string;
  isOwn: boolean;
}

export default function RandomChatPage() {
  const router = useRouter();
  const { currentUser } = useChatStore();

  const [status, setStatus] = useState<ChatStatus>("idle");
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [tempUsername, setTempUsername] = useState<string>("");
  const [strangerUsername, setStrangerUsername] = useState<string>("");
  const [messages, setMessages] = useState<RandomMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [searchTime, setSearchTime] = useState(0);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const searchTimerRef = useRef<number | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Search timer
  useEffect(() => {
    if (status === "searching") {
      searchTimerRef.current = window.setInterval(() => {
        setSearchTime((t) => t + 1);
      }, 1000);
    } else {
      if (searchTimerRef.current) {
        clearInterval(searchTimerRef.current);
      }
      setSearchTime(0);
    }
    return () => {
      if (searchTimerRef.current) {
        clearInterval(searchTimerRef.current);
      }
    };
  }, [status]);

  const generateTempUsername = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "Stranger_";
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const startSearching = async () => {
    if (!currentUser) return;

    const supabase = createClient();
    const myTempUsername = generateTempUsername();
    setTempUsername(myTempUsername);
    setStatus("searching");

    try {
      // Create a random chat session
      const { data: session, error: sessionError } = await supabase
        .from("random_chat_sessions")
        .insert({
          user_id: currentUser.id,
          temporary_username: myTempUsername,
          status: "matching",
        })
        .select()
        .single();

      if (sessionError || !session) {
        console.error("Failed to create session:", sessionError);
        setStatus("idle");
        return;
      }

      setSessionId(session.session_id);

      // Look for another user in matching status
      const { data: matchingUsers, error: matchError } = await supabase
        .from("random_chat_sessions")
        .select("*")
        .eq("status", "matching")
        .neq("user_id", currentUser.id)
        .limit(1);

      if (matchError) {
        console.error("Match error:", matchError);
      }

      if (matchingUsers && matchingUsers.length > 0) {
        const match = matchingUsers[0];

        // Create conversation
        const { data: convo, error: convError } = await supabase
          .from("conversations")
          .insert({
            conversation_type: "random",
            status: "active",
          })
          .select()
          .single();

        if (convError || !convo) {
          console.error("Failed to create conversation:", convError);
          return;
        }

        // Update both sessions
        await supabase
          .from("random_chat_sessions")
          .update({ status: "matched", conversation_id: convo.id })
          .eq("session_id", session.session_id);

        await supabase
          .from("random_chat_sessions")
          .update({ status: "matched", conversation_id: convo.id })
          .eq("session_id", match.session_id);

        setConversationId(convo.id);
        setStrangerUsername(match.temporary_username);
        setStatus("matched");

        // Subscribe to messages
        subscribeToMessages(convo.id, session.session_id);
      } else {
        // Wait for someone to match with us
        const channel = supabase
          .channel(`random_session:${session.session_id}`)
          .on(
            "postgres_changes",
            {
              event: "UPDATE",
              schema: "public",
              table: "random_chat_sessions",
              filter: `session_id=eq.${session.session_id}`,
            },
            async (payload) => {
              const updated = payload.new as {
                status: string;
                conversation_id: string;
              };
              if (updated.status === "matched" && updated.conversation_id) {
                setConversationId(updated.conversation_id);

                // Get stranger's username
                const { data: strangerSession } = await supabase
                  .from("random_chat_sessions")
                  .select("temporary_username")
                  .eq("conversation_id", updated.conversation_id)
                  .neq("session_id", session.session_id)
                  .single();

                if (strangerSession) {
                  setStrangerUsername(strangerSession.temporary_username);
                }

                setStatus("matched");
                subscribeToMessages(
                  updated.conversation_id,
                  session.session_id,
                );
              }
            },
          )
          .subscribe();

        // Clean up subscription on unmount
        return () => {
          supabase.removeChannel(channel);
        };
      }
    } catch (err) {
      console.error("Error starting search:", err);
      setStatus("idle");
    }
  };

  const subscribeToMessages = (convId: string, sessId: string) => {
    const supabase = createClient();

    supabase
      .channel(`random_messages:${convId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "random_chat_messages",
          filter: `conversation_id=eq.${convId}`,
        },
        (payload) => {
          const msg = payload.new as {
            id: string;
            session_id: string;
            message_text: string;
            created_at: string;
          };
          setMessages((prev) => [
            ...prev,
            {
              ...msg,
              isOwn: msg.session_id === sessId,
            },
          ]);
        },
      )
      .subscribe();
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !conversationId || !sessionId || sending) return;

    const text = newMessage.trim();
    setNewMessage("");
    setSending(true);

    try {
      const supabase = createClient();

      await supabase.from("random_chat_messages").insert({
        conversation_id: conversationId,
        session_id: sessionId,
        message_text: text,
      });
    } catch (err) {
      console.error("Send error:", err);
    } finally {
      setSending(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const endChat = async (reason: "next" | "leave") => {
    if (!sessionId) return;

    const supabase = createClient();

    await supabase
      .from("random_chat_sessions")
      .update({
        status: "ended",
        ended_at: new Date().toISOString(),
        end_reason: reason,
      })
      .eq("session_id", sessionId);

    // Delete messages
    if (conversationId) {
      await supabase
        .from("random_chat_messages")
        .delete()
        .eq("conversation_id", conversationId);

      await supabase
        .from("conversations")
        .update({ status: "ended" })
        .eq("id", conversationId);
    }

    if (reason === "next") {
      // Reset and search again
      setMessages([]);
      setConversationId(null);
      setSessionId(null);
      setStrangerUsername("");
      startSearching();
    } else {
      // Return to chat home
      router.push("/chat");
    }
  };

  const cancelSearch = async () => {
    if (sessionId) {
      const supabase = createClient();
      await supabase
        .from("random_chat_sessions")
        .update({ status: "ended", end_reason: "disconnect" })
        .eq("session_id", sessionId);
    }
    setStatus("idle");
    setSessionId(null);
  };

  // Idle state - show start button
  if (status === "idle") {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 bg-[var(--background)]">
        <div className="max-w-md text-center">
          <div className="w-20 h-20 bg-[var(--primary)]/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shuffle className="w-10 h-10 text-[var(--primary)]" />
          </div>
          <h1 className="text-2xl font-bold text-[var(--foreground)] mb-3">
            Random Chat
          </h1>
          <p className="text-[var(--muted-foreground)] mb-6">
            Chat anonymously with a random stranger. Your identity is protected
            with a temporary username. Messages are deleted when the chat ends.
          </p>

          <div className="space-y-4">
            <button
              onClick={startSearching}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-xl font-medium text-lg hover:opacity-90 transition-opacity"
            >
              <Shuffle className="w-5 h-5" />
              Start Random Chat
            </button>

            <Link
              href="/chat"
              className="inline-flex items-center gap-2 text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Chats
            </Link>
          </div>

          <div className="mt-8 p-4 bg-[var(--secondary)] rounded-lg text-left text-sm">
            <p className="font-medium text-[var(--foreground)] mb-2">
              Safety Tips:
            </p>
            <ul className="text-[var(--muted-foreground)] space-y-1 list-disc list-inside">
              <li>Never share personal information</li>
              <li>Report inappropriate behavior</li>
              <li>Leave if you feel uncomfortable</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  // Searching state
  if (status === "searching") {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 bg-[var(--background)]">
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-[var(--primary)] animate-spin mx-auto mb-6" />
          <h2 className="text-xl font-semibold text-[var(--foreground)] mb-2">
            Finding a stranger...
          </h2>
          <p className="text-[var(--muted-foreground)] mb-4">
            Searching for {searchTime}s
          </p>
          <p className="text-sm text-[var(--muted-foreground)] mb-6">
            Your temporary username:{" "}
            <strong className="text-[var(--foreground)]">{tempUsername}</strong>
          </p>
          <button
            onClick={cancelSearch}
            className="px-6 py-2 border border-[var(--border)] text-[var(--foreground)] rounded-lg hover:bg-[var(--secondary)] transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  // Matched state - chat interface
  return (
    <div className="flex-1 flex flex-col bg-[var(--background)]">
      {/* Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-[var(--border)] bg-[var(--card)]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold">
            ?
          </div>
          <div>
            <p className="font-medium text-[var(--foreground)]">
              {strangerUsername}
            </p>
            <p className="text-xs text-green-500">Connected</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            className="p-2 text-[var(--muted-foreground)] hover:text-yellow-500 transition-colors"
            title="Report"
          >
            <Flag className="w-5 h-5" />
          </button>
          <button
            className="p-2 text-[var(--muted-foreground)] hover:text-red-500 transition-colors"
            title="Block"
          >
            <Ban className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        <div className="text-center py-4">
          <p className="text-sm text-[var(--muted-foreground)]">
            You&apos;re now connected with <strong>{strangerUsername}</strong>
          </p>
          <p className="text-xs text-[var(--muted-foreground)] mt-1">
            Say hi! Remember to stay safe and respectful.
          </p>
        </div>

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.isOwn ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[70%] px-4 py-2.5 rounded-2xl ${
                msg.isOwn
                  ? "bg-[var(--primary)] text-[var(--primary-foreground)] rounded-br-md"
                  : "bg-[var(--secondary)] text-[var(--foreground)] rounded-bl-md"
              }`}
            >
              <p className="break-words">{msg.message_text}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Controls */}
      <div className="p-4 border-t border-[var(--border)] bg-[var(--card)]">
        <div className="flex items-end gap-3 mb-3">
          <div className="flex-1">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              rows={1}
              className="w-full px-4 py-2.5 bg-[var(--secondary)] border border-[var(--border)] rounded-xl text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] resize-none"
            />
          </div>
          <button
            onClick={sendMessage}
            disabled={!newMessage.trim() || sending}
            className="p-2.5 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-xl hover:opacity-90 disabled:opacity-50"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => endChat("next")}
            className="flex-1 flex items-center justify-center gap-2 py-2 border border-[var(--border)] text-[var(--foreground)] rounded-lg hover:bg-[var(--secondary)] transition-colors"
          >
            <SkipForward className="w-4 h-4" />
            Next Stranger
          </button>
          <button
            onClick={() => endChat("leave")}
            className="flex items-center justify-center gap-2 py-2 px-4 border border-[var(--destructive)] text-[var(--destructive)] rounded-lg hover:bg-[var(--destructive)]/10 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Leave
          </button>
        </div>
      </div>
    </div>
  );
}
