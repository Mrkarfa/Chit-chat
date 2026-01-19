"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  MoreVertical,
  Send,
  Paperclip,
  Smile,
  Check,
  CheckCheck,
  Loader2,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useChatStore } from "@/lib/stores/chat-store";
import { formatDistanceToNow } from "date-fns";
import type { Message, User } from "@/types/database.types";

export default function ChatConversationPage() {
  const params = useParams();
  const router = useRouter();
  const conversationId = params.id as string;

  const { currentUser, messages, setMessages, addMessage } = useChatStore();
  const [otherUser, setOtherUser] = useState<User | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    const loadConversation = async () => {
      if (!currentUser) return;

      const supabase = createClient();

      // Get other participant
      const { data: participants, error: partError } = await supabase
        .from("conversation_participants")
        .select("user_id")
        .eq("conversation_id", conversationId)
        .neq("user_id", currentUser.id);

      if (partError || !participants || participants.length === 0) {
        console.error("Failed to load participants:", partError);
        router.push("/chat");
        return;
      }

      const participantUserId = participants[0].user_id;

      // Get other user's profile
      const { data: userProfile, error: userError } = await supabase
        .from("users")
        .select("*")
        .eq("id", participantUserId)
        .single();

      if (userError || !userProfile) {
        console.error("Failed to load user:", userError);
        router.push("/chat");
        return;
      }

      setOtherUser(userProfile as User);

      // Load messages
      const { data: messagesData, error: msgError } = await supabase
        .from("messages")
        .select("*")
        .eq("conversation_id", conversationId)
        .order("created_at", { ascending: true })
        .limit(100);

      if (msgError) {
        console.error("Failed to load messages:", msgError);
      } else {
        setMessages((messagesData || []) as Message[]);
      }

      setLoading(false);

      // Mark messages as read
      await supabase
        .from("messages")
        .update({ status: "read", read_at: new Date().toISOString() })
        .eq("conversation_id", conversationId)
        .eq("recipient_id", currentUser.id)
        .neq("status", "read");

      // Reset unread count
      await supabase
        .from("conversation_participants")
        .update({ unread_count: 0 })
        .eq("conversation_id", conversationId)
        .eq("user_id", currentUser.id);
    };

    loadConversation();

    // Subscribe to new messages
    const supabase = createClient();
    const channel = supabase
      .channel(`messages:${conversationId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `conversation_id=eq.${conversationId}`,
        },
        async (payload) => {
          const newMsg = payload.new as Message;
          // Only add if not from current user (optimistic UI already added it)
          if (newMsg.sender_id !== currentUser?.id) {
            addMessage(newMsg);
            // Mark as read if we're viewing
            await supabase
              .from("messages")
              .update({ status: "read", read_at: new Date().toISOString() })
              .eq("id", newMsg.id);
          }
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [conversationId, currentUser, router, setMessages, addMessage]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !currentUser || !otherUser || sending) return;

    const messageText = newMessage.trim();
    setNewMessage("");
    setSending(true);

    // Optimistic update
    const optimisticMessage: Message = {
      id: `temp-${Date.now()}`,
      conversation_id: conversationId,
      sender_id: currentUser.id,
      recipient_id: otherUser.id,
      message_text: messageText,
      message_type: "text",
      status: "sent",
      created_at: new Date().toISOString(),
      updated_at: null,
      media_url: null,
      media_caption: null,
      file_name: null,
      file_size: null,
      file_type: null,
      delivered_at: null,
      read_at: null,
      deleted_for: null,
      is_edited: false,
    };
    addMessage(optimisticMessage);

    try {
      const supabase = createClient();

      const { data, error } = await supabase
        .from("messages")
        .insert({
          conversation_id: conversationId,
          sender_id: currentUser.id,
          recipient_id: otherUser.id,
          message_text: messageText,
          message_type: "text",
          status: "sent",
        })
        .select()
        .single();

      if (error) {
        console.error("Failed to send message:", error);
        // Remove optimistic message on error
        setMessages(messages.filter((m) => m.id !== optimisticMessage.id));
        return;
      }

      // Update conversation last_message_at
      await supabase
        .from("conversations")
        .update({ last_message_at: new Date().toISOString() })
        .eq("id", conversationId);

      // Replace optimistic message with real one
      setMessages(
        messages.map((m) =>
          m.id === optimisticMessage.id ? (data as Message) : m,
        ),
      );
    } catch (err) {
      console.error("Send message error:", err);
    } finally {
      setSending(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[var(--background)]">
        <Loader2 className="w-8 h-8 text-[var(--primary)] animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-[var(--background)]">
      {/* Header */}
      <div className="h-16 flex items-center gap-4 px-4 border-b border-[var(--border)] bg-[var(--card)]">
        <Link
          href="/chat"
          className="p-2 text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors lg:hidden"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>

        <div className="flex items-center gap-3 flex-1">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-[var(--primary)] flex items-center justify-center text-[var(--primary-foreground)] font-semibold">
              {otherUser?.profile_picture_url ? (
                <img
                  src={otherUser.profile_picture_url}
                  alt={otherUser.display_name || otherUser.username}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                otherUser?.display_name?.[0] || otherUser?.username?.[0] || "?"
              )}
            </div>
            {otherUser?.online_status === "online" && (
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[var(--card)]" />
            )}
          </div>
          <div>
            <p className="font-medium text-[var(--foreground)]">
              {otherUser?.display_name || otherUser?.username}
            </p>
            <p className="text-xs text-[var(--muted-foreground)]">
              {otherUser?.online_status === "online"
                ? "Online"
                : otherUser?.last_seen_at
                  ? `Last seen ${formatDistanceToNow(new Date(otherUser.last_seen_at), { addSuffix: true })}`
                  : "Offline"}
            </p>
          </div>
        </div>

        <button className="p-2 text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors">
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-[var(--muted-foreground)]">
              No messages yet. Say hello! 👋
            </p>
          </div>
        ) : (
          messages.map((message) => (
            <MessageBubble
              key={message.id}
              message={message}
              isOwn={message.sender_id === currentUser?.id}
            />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-[var(--border)] bg-[var(--card)]">
        <div className="flex items-end gap-3">
          <button className="p-2 text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors">
            <Paperclip className="w-5 h-5" />
          </button>
          <button className="p-2 text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors">
            <Smile className="w-5 h-5" />
          </button>

          <div className="flex-1 relative">
            <textarea
              ref={inputRef}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              rows={1}
              className="w-full px-4 py-2.5 bg-[var(--secondary)] border border-[var(--border)] rounded-xl text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent resize-none max-h-32"
              style={{ minHeight: "42px" }}
            />
          </div>

          <button
            onClick={handleSendMessage}
            disabled={!newMessage.trim() || sending}
            className="p-2.5 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {sending ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

function MessageBubble({
  message,
  isOwn,
}: {
  message: Message;
  isOwn: boolean;
}) {
  return (
    <div className={`flex ${isOwn ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[70%] px-4 py-2.5 rounded-2xl ${
          isOwn
            ? "bg-[var(--message-sent)] text-[var(--message-sent-text)] rounded-br-md"
            : "bg-[var(--message-received)] text-[var(--message-received-text)] rounded-bl-md"
        }`}
      >
        <p className="break-words whitespace-pre-wrap">
          {message.message_text}
        </p>
        <div
          className={`flex items-center gap-1 mt-1 ${isOwn ? "justify-end" : "justify-start"}`}
        >
          <span
            className={`text-xs ${isOwn ? "opacity-70" : "text-[var(--muted-foreground)]"}`}
          >
            {new Date(message.created_at).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
          {isOwn && (
            <span className="opacity-70">
              {message.status === "read" ? (
                <CheckCheck className="w-4 h-4 text-blue-400" />
              ) : message.status === "delivered" ? (
                <CheckCheck className="w-4 h-4" />
              ) : (
                <Check className="w-4 h-4" />
              )}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
