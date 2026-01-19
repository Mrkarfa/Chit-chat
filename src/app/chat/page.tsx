"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MessageSquare, Shuffle, Users, ArrowRight } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useChatStore } from "@/lib/stores/chat-store";
import type { ConversationWithParticipants } from "@/types/database.types";

export default function ChatHomePage() {
  const { currentUser, conversations, setConversations } = useChatStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadConversations = async () => {
      if (!currentUser) return;

      const supabase = createClient();

      // Load user's conversations with participants
      const { data: participations, error } = await supabase
        .from("conversation_participants")
        .select(
          `
          conversation_id,
          unread_count,
          muted,
          conversations (
            id,
            conversation_type,
            status,
            last_message_at,
            created_at
          )
        `,
        )
        .eq("user_id", currentUser.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Failed to load conversations:", error);
        setLoading(false);
        return;
      }

      // Transform data
      const convos: ConversationWithParticipants[] = (participations || [])
        .filter((p) => p.conversations)
        .map((p) => ({
          ...(p.conversations as unknown as ConversationWithParticipants),
          participants: [],
        }));

      setConversations(convos);
      setLoading(false);
    };

    loadConversations();
  }, [currentUser, setConversations]);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-[var(--muted-foreground)]">
          Loading conversations...
        </div>
      </div>
    );
  }

  // Empty state - no conversations
  if (conversations.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="max-w-md text-center">
          <div className="w-20 h-20 bg-[var(--primary)]/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <MessageSquare className="w-10 h-10 text-[var(--primary)]" />
          </div>
          <h1 className="text-2xl font-bold text-[var(--foreground)] mb-3">
            Welcome to Chugli!
          </h1>
          <p className="text-[var(--muted-foreground)] mb-8">
            Start a conversation with someone you know, or try our anonymous
            random chat to meet new people.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/chat/new"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-xl font-medium hover:opacity-90 transition-opacity"
            >
              <Users className="w-5 h-5" />
              Start New Chat
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/chat/random"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-[var(--secondary)] text-[var(--foreground)] rounded-xl font-medium hover:bg-[var(--accent)] transition-colors border border-[var(--border)]"
            >
              <Shuffle className="w-5 h-5" />
              Random Chat
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Has conversations - show prompt to select
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 bg-[var(--background)]">
      <div className="text-center">
        <MessageSquare className="w-16 h-16 text-[var(--muted-foreground)] mx-auto mb-4 opacity-30" />
        <h2 className="text-xl font-semibold text-[var(--foreground)] mb-2">
          Select a Conversation
        </h2>
        <p className="text-[var(--muted-foreground)]">
          Choose a chat from the sidebar or start a new one
        </p>
      </div>
    </div>
  );
}
