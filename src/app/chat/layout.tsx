"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  MessageSquare,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  Search,
  Plus,
  Shuffle,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useChatStore } from "@/lib/stores/chat-store";
import type { User } from "@/types/database.types";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { currentUser, setCurrentUser, conversations } = useChatStore();

  useEffect(() => {
    const initUser = async () => {
      const supabase = createClient();

      // Get current user
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      // Get user profile
      const { data: profile, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error || !profile) {
        console.error("Failed to load profile:", error);
        router.push("/login");
        return;
      }

      setCurrentUser(profile as User);
      setLoading(false);

      // Update online status
      await supabase
        .from("users")
        .update({
          online_status: "online",
          last_seen_at: new Date().toISOString(),
        })
        .eq("id", user.id);
    };

    initUser();

    // Cleanup - set offline on unmount
    return () => {
      const updateOffline = async () => {
        const supabase = createClient();
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (user) {
          await supabase
            .from("users")
            .update({
              online_status: "offline",
              last_seen_at: new Date().toISOString(),
            })
            .eq("id", user.id);
        }
      };
      updateOffline();
    };
  }, [router, setCurrentUser]);

  const handleLogout = async () => {
    const supabase = createClient();

    // Update status to offline
    if (currentUser) {
      await supabase
        .from("users")
        .update({
          online_status: "offline",
          last_seen_at: new Date().toISOString(),
        })
        .eq("id", currentUser.id);
    }

    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
        <div className="flex flex-col items-center gap-4">
          <MessageSquare className="w-12 h-12 text-[var(--primary)] animate-pulse" />
          <p className="text-[var(--muted-foreground)]">Loading Chugli...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex bg-[var(--background)]">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-80 bg-[var(--card)] border-r border-[var(--border)]
        transform transition-transform duration-200 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        flex flex-col
      `}
      >
        {/* Sidebar Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-[var(--border)]">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-7 h-7 text-[var(--primary)]" />
            <span className="text-lg font-bold text-[var(--foreground)]">
              Chugli
            </span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Profile Mini */}
        <div className="p-4 border-b border-[var(--border)]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[var(--primary)] flex items-center justify-center text-[var(--primary-foreground)] font-semibold">
              {currentUser?.display_name?.[0] ||
                currentUser?.username?.[0] ||
                "?"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-[var(--foreground)] truncate">
                {currentUser?.display_name || currentUser?.username}
              </p>
              <p className="text-xs text-[var(--muted-foreground)] truncate">
                @{currentUser?.username}
              </p>
            </div>
            <div
              className="w-2.5 h-2.5 rounded-full bg-green-500"
              title="Online"
            />
          </div>
        </div>

        {/* Search */}
        <div className="p-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-foreground)]" />
            <input
              type="text"
              placeholder="Search chats..."
              className="w-full pl-9 pr-4 py-2 bg-[var(--secondary)] border border-[var(--border)] rounded-lg text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="px-3 pb-3 flex gap-2">
          <Link
            href="/chat/new"
            className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
          >
            <Plus className="w-4 h-4" />
            New Chat
          </Link>
          <Link
            href="/chat/random"
            className="flex items-center justify-center gap-2 py-2 px-3 bg-[var(--secondary)] text-[var(--foreground)] rounded-lg text-sm font-medium hover:bg-[var(--accent)] transition-colors border border-[var(--border)]"
          >
            <Shuffle className="w-4 h-4" />
          </Link>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto">
          {conversations.length === 0 ? (
            <div className="p-6 text-center">
              <Users className="w-12 h-12 text-[var(--muted-foreground)] mx-auto mb-3 opacity-50" />
              <p className="text-sm text-[var(--muted-foreground)]">
                No conversations yet.
                <br />
                Start a new chat or try random chat!
              </p>
            </div>
          ) : (
            <div className="p-2 space-y-1">
              {/* Conversation items will be rendered here */}
            </div>
          )}
        </div>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-[var(--border)]">
          <div className="flex items-center gap-2">
            <Link
              href="/chat/settings"
              className="flex-1 flex items-center justify-center gap-2 py-2 px-3 text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--secondary)] rounded-lg transition-colors text-sm"
            >
              <Settings className="w-4 h-4" />
              Settings
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-2 py-2 px-3 text-[var(--destructive)] hover:bg-[var(--destructive)]/10 rounded-lg transition-colors text-sm"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <div className="lg:hidden h-14 flex items-center px-4 border-b border-[var(--border)] bg-[var(--card)]">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="ml-3 flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-[var(--primary)]" />
            <span className="font-semibold text-[var(--foreground)]">
              Chugli
            </span>
          </div>
        </div>

        {/* Page Content */}
        {children}
      </main>
    </div>
  );
}
