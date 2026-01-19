"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  User,
  Palette,
  Bell,
  Shield,
  LogOut,
  Camera,
  Save,
  Loader2,
  Moon,
  Sun,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useChatStore } from "@/lib/stores/chat-store";

export default function SettingsPage() {
  const router = useRouter();
  const { currentUser, setCurrentUser } = useChatStore();

  const [activeTab, setActiveTab] = useState<
    "profile" | "appearance" | "notifications" | "privacy"
  >("profile");
  const [displayName, setDisplayName] = useState(
    currentUser?.display_name || "",
  );
  const [bio, setBio] = useState(currentUser?.bio || "");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [isDark, setIsDark] = useState(true);

  const handleSaveProfile = async () => {
    if (!currentUser) return;
    setSaving(true);
    setSaved(false);

    try {
      const supabase = createClient();

      const { error } = await supabase
        .from("users")
        .update({
          display_name: displayName || currentUser.username,
          bio: bio,
        })
        .eq("id", currentUser.id);

      if (error) {
        console.error("Failed to update profile:", error);
        return;
      }

      setCurrentUser({
        ...currentUser,
        display_name: displayName || currentUser.username,
        bio: bio,
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error("Update error:", err);
    } finally {
      setSaving(false);
    }
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  const handleLogout = async () => {
    const supabase = createClient();

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
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "appearance", label: "Appearance", icon: Palette },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "privacy", label: "Privacy", icon: Shield },
  ] as const;

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
          Settings
        </h1>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Sidebar */}
        <div className="lg:w-60 border-b lg:border-b-0 lg:border-r border-[var(--border)] bg-[var(--card)]">
          <nav className="p-2 flex lg:flex-col gap-1 overflow-x-auto lg:overflow-x-visible">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? "bg-[var(--primary)] text-[var(--primary-foreground)]"
                    : "text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--secondary)]"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}

            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-[var(--destructive)] hover:bg-[var(--destructive)]/10 transition-colors lg:mt-auto"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Profile Tab */}
          {activeTab === "profile" && (
            <div className="max-w-xl">
              <h2 className="text-xl font-semibold text-[var(--foreground)] mb-6">
                Profile Settings
              </h2>

              {/* Avatar */}
              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-[var(--primary)] flex items-center justify-center text-[var(--primary-foreground)] text-2xl font-semibold">
                    {currentUser?.profile_picture_url ? (
                      <img
                        src={currentUser.profile_picture_url}
                        alt="Profile"
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      currentUser?.display_name?.[0] ||
                      currentUser?.username?.[0] ||
                      "?"
                    )}
                  </div>
                  <button className="absolute bottom-0 right-0 p-1.5 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-full hover:opacity-90">
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
                <div>
                  <p className="font-medium text-[var(--foreground)]">
                    @{currentUser?.username}
                  </p>
                  <p className="text-sm text-[var(--muted-foreground)]">
                    {currentUser?.email}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {/* Display Name */}
                <div>
                  <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">
                    Display Name
                  </label>
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Your display name"
                    maxLength={50}
                    className="w-full px-4 py-2.5 bg-[var(--secondary)] border border-[var(--border)] rounded-lg text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                  />
                </div>

                {/* Bio */}
                <div>
                  <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">
                    Bio
                  </label>
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Tell us about yourself..."
                    maxLength={200}
                    rows={3}
                    className="w-full px-4 py-2.5 bg-[var(--secondary)] border border-[var(--border)] rounded-lg text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] resize-none"
                  />
                  <p className="text-xs text-[var(--muted-foreground)] mt-1">
                    {bio.length}/200 characters
                  </p>
                </div>

                {/* Save Button */}
                <button
                  onClick={handleSaveProfile}
                  disabled={saving}
                  className="flex items-center gap-2 px-6 py-2.5 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-lg font-medium hover:opacity-90 disabled:opacity-50"
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Save Changes
                    </>
                  )}
                </button>

                {saved && (
                  <p className="text-sm text-green-500">
                    Profile updated successfully!
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Appearance Tab */}
          {activeTab === "appearance" && (
            <div className="max-w-xl">
              <h2 className="text-xl font-semibold text-[var(--foreground)] mb-6">
                Appearance
              </h2>

              <div className="space-y-6">
                {/* Theme Toggle */}
                <div className="flex items-center justify-between p-4 bg-[var(--card)] border border-[var(--border)] rounded-lg">
                  <div className="flex items-center gap-3">
                    {isDark ? (
                      <Moon className="w-5 h-5 text-[var(--primary)]" />
                    ) : (
                      <Sun className="w-5 h-5 text-yellow-500" />
                    )}
                    <div>
                      <p className="font-medium text-[var(--foreground)]">
                        Theme
                      </p>
                      <p className="text-sm text-[var(--muted-foreground)]">
                        {isDark ? "Dark mode" : "Light mode"}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={toggleTheme}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      isDark ? "bg-[var(--primary)]" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        isDark ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                <p className="text-sm text-[var(--muted-foreground)]">
                  More appearance options coming soon...
                </p>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === "notifications" && (
            <div className="max-w-xl">
              <h2 className="text-xl font-semibold text-[var(--foreground)] mb-6">
                Notifications
              </h2>
              <p className="text-[var(--muted-foreground)]">
                Notification settings coming soon...
              </p>
            </div>
          )}

          {/* Privacy Tab */}
          {activeTab === "privacy" && (
            <div className="max-w-xl">
              <h2 className="text-xl font-semibold text-[var(--foreground)] mb-6">
                Privacy & Security
              </h2>
              <p className="text-[var(--muted-foreground)]">
                Privacy settings coming soon...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
