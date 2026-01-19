"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Search, User, Loader2, MessageSquare } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { useChatStore } from "@/lib/stores/chat-store";
import type { User as UserType } from "@/types/database.types";

export default function NewChatPage() {
  const router = useRouter();
  const { currentUser } = useChatStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<UserType[]>([]);
  const [searching, setSearching] = useState(false);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    setError("");

    if (query.trim().length < 2) {
      setSearchResults([]);
      return;
    }

    setSearching(true);

    try {
      const supabase = createClient();

      const { data, error } = await supabase
        .from("users")
        .select(
          "id, username, display_name, profile_picture_url, online_status",
        )
        .or(`username.ilike.%${query}%,display_name.ilike.%${query}%`)
        .neq("id", currentUser?.id || "")
        .eq("is_active", true)
        .eq("banned", false)
        .limit(10);

      if (error) {
        console.error("Search error:", error);
        setError("Failed to search users");
        return;
      }

      setSearchResults((data || []) as UserType[]);
    } catch {
      setError("An error occurred while searching");
    } finally {
      setSearching(false);
    }
  };

  const startConversation = async (userId: string) => {
    if (!currentUser) return;
    setCreating(true);
    setError("");

    try {
      const supabase = createClient();

      // Check if conversation already exists
      const { data: existingParticipation } = await supabase
        .from("conversation_participants")
        .select("conversation_id")
        .eq("user_id", currentUser.id);

      if (existingParticipation && existingParticipation.length > 0) {
        // Check if the other user is in any of these conversations
        const conversationIds = existingParticipation.map(
          (p) => p.conversation_id,
        );

        const { data: otherParticipation } = await supabase
          .from("conversation_participants")
          .select("conversation_id")
          .eq("user_id", userId)
          .in("conversation_id", conversationIds);

        if (otherParticipation && otherParticipation.length > 0) {
          // Existing conversation found
          router.push(`/chat/${otherParticipation[0].conversation_id}`);
          return;
        }
      }

      // Create new conversation
      const { data: newConversation, error: convError } = await supabase
        .from("conversations")
        .insert({
          conversation_type: "persistent",
          status: "active",
        })
        .select()
        .single();

      if (convError || !newConversation) {
        setError("Failed to create conversation");
        return;
      }

      // Add participants
      const { error: partError } = await supabase
        .from("conversation_participants")
        .insert([
          { conversation_id: newConversation.id, user_id: currentUser.id },
          { conversation_id: newConversation.id, user_id: userId },
        ]);

      if (partError) {
        setError("Failed to add participants");
        return;
      }

      // Navigate to new conversation
      router.push(`/chat/${newConversation.id}`);
    } catch {
      setError("An error occurred");
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-[var(--background)]">
      {/* Header */}
      <div className="h-16 flex items-center gap-4 px-4 border-b border-[var(--border)] bg-[var(--card)]">
        <Link
          href="/chat"
          className="p-2 text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-lg font-semibold text-[var(--foreground)]">
          New Chat
        </h1>
      </div>

      {/* Search */}
      <div className="p-4 border-b border-[var(--border)]">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--muted-foreground)]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search users by username or display name..."
            className="w-full pl-10 pr-4 py-3 bg-[var(--secondary)] border border-[var(--border)] rounded-lg text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
          />
          {searching && (
            <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--primary)] animate-spin" />
          )}
        </div>
        {error && (
          <p className="mt-2 text-sm text-[var(--destructive)]">{error}</p>
        )}
      </div>

      {/* Results */}
      <div className="flex-1 overflow-y-auto">
        {searchQuery.length < 2 ? (
          <div className="p-8 text-center">
            <User className="w-12 h-12 text-[var(--muted-foreground)] mx-auto mb-3 opacity-50" />
            <p className="text-[var(--muted-foreground)]">
              Search for users to start a conversation
            </p>
          </div>
        ) : searchResults.length === 0 && !searching ? (
          <div className="p-8 text-center">
            <p className="text-[var(--muted-foreground)]">
              No users found for &quot;{searchQuery}&quot;
            </p>
          </div>
        ) : (
          <div className="p-2">
            {searchResults.map((user) => (
              <button
                key={user.id}
                onClick={() => startConversation(user.id)}
                disabled={creating}
                className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-[var(--secondary)] transition-colors disabled:opacity-50"
              >
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-[var(--primary)] flex items-center justify-center text-[var(--primary-foreground)] font-semibold">
                    {user.profile_picture_url ? (
                      <img
                        src={user.profile_picture_url}
                        alt={user.display_name || user.username}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      user.display_name?.[0] || user.username?.[0] || "?"
                    )}
                  </div>
                  {user.online_status === "online" && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[var(--background)]" />
                  )}
                </div>
                <div className="flex-1 text-left">
                  <p className="font-medium text-[var(--foreground)]">
                    {user.display_name || user.username}
                  </p>
                  <p className="text-sm text-[var(--muted-foreground)]">
                    @{user.username}
                  </p>
                </div>
                <MessageSquare className="w-5 h-5 text-[var(--primary)]" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
