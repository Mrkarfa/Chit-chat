"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { MessageSquare, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const supabase = createClient();

        // Check if we have the token from the URL hash (Supabase puts it there)
        const hashParams = new URLSearchParams(
          window.location.hash.substring(1),
        );
        const accessToken = hashParams.get("access_token");
        const refreshToken = hashParams.get("refresh_token");
        const type = hashParams.get("type");

        if (accessToken && type === "signup") {
          // User came from email verification link
          const { error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken || "",
          });

          if (error) {
            setStatus("error");
            setMessage("Failed to verify email. The link may have expired.");
            return;
          }

          // Update user profile to mark email as confirmed
          const {
            data: { user },
          } = await supabase.auth.getUser();
          if (user) {
            await supabase
              .from("users")
              .update({ email_confirmed: true })
              .eq("id", user.id);
          }

          setStatus("success");
          setMessage("Your email has been verified successfully!");
        } else if (searchParams.get("error_description")) {
          setStatus("error");
          setMessage(
            searchParams.get("error_description") || "Verification failed",
          );
        } else {
          // No token in URL, show waiting state
          setStatus("loading");
          setMessage("Processing verification...");

          // Check if already logged in and verified
          const {
            data: { user },
          } = await supabase.auth.getUser();
          if (user?.email_confirmed_at) {
            setStatus("success");
            setMessage("Your email is already verified!");
          } else if (!accessToken) {
            setStatus("error");
            setMessage("Invalid verification link. Please try again.");
          }
        }
      } catch {
        setStatus("error");
        setMessage("An unexpected error occurred.");
      }
    };

    verifyEmail();
  }, [searchParams]);

  return (
    <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-8 shadow-lg">
      {status === "loading" && (
        <>
          <div className="w-16 h-16 bg-[var(--primary)]/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Loader2 className="w-8 h-8 text-[var(--primary)] animate-spin" />
          </div>
          <h1 className="text-2xl font-bold text-[var(--foreground)] mb-2">
            Verifying...
          </h1>
          <p className="text-[var(--muted-foreground)]">{message}</p>
        </>
      )}

      {status === "success" && (
        <>
          <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
          <h1 className="text-2xl font-bold text-[var(--foreground)] mb-2">
            Email Verified!
          </h1>
          <p className="text-[var(--muted-foreground)] mb-6">{message}</p>
          <Link
            href="/chat"
            className="inline-block px-6 py-3 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            Start Chatting
          </Link>
        </>
      )}

      {status === "error" && (
        <>
          <div className="w-16 h-16 bg-[var(--destructive)]/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <XCircle className="w-8 h-8 text-[var(--destructive)]" />
          </div>
          <h1 className="text-2xl font-bold text-[var(--foreground)] mb-2">
            Verification Failed
          </h1>
          <p className="text-[var(--muted-foreground)] mb-6">{message}</p>
          <div className="flex flex-col gap-3">
            <Link
              href="/login"
              className="inline-block px-6 py-3 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Go to Login
            </Link>
            <Link
              href="/signup"
              className="inline-block px-6 py-3 border border-[var(--border)] text-[var(--foreground)] rounded-lg font-medium hover:bg-[var(--secondary)] transition-colors"
            >
              Create New Account
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-8 shadow-lg">
      <div className="w-16 h-16 bg-[var(--primary)]/10 rounded-full flex items-center justify-center mx-auto mb-4">
        <Loader2 className="w-8 h-8 text-[var(--primary)] animate-spin" />
      </div>
      <h1 className="text-2xl font-bold text-[var(--foreground)] mb-2">
        Loading...
      </h1>
      <p className="text-[var(--muted-foreground)]">Please wait...</p>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[var(--background)]">
      <div className="w-full max-w-md text-center">
        {/* Logo */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <MessageSquare className="w-10 h-10 text-[var(--primary)]" />
            <span className="text-2xl font-bold text-[var(--foreground)]">
              Chugli
            </span>
          </Link>
        </div>

        {/* Status Card */}
        <Suspense fallback={<LoadingFallback />}>
          <VerifyEmailContent />
        </Suspense>
      </div>
    </div>
  );
}
