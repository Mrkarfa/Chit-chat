"use client";

import { useState } from "react";
import Link from "next/link";
import {
  MessageSquare,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  Check,
  X,
  ArrowLeft,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [step, setStep] = useState<"request" | "reset" | "success">("request");
  const [isFromEmail, setIsFromEmail] = useState(false);

  // Password validation
  const hasMinLength = newPassword.length >= 8;
  const hasUppercase = /[A-Z]/.test(newPassword);
  const hasLowercase = /[a-z]/.test(newPassword);
  const hasNumber = /[0-9]/.test(newPassword);
  const passwordsMatch =
    newPassword === confirmPassword && newPassword.length > 0;

  // Check if user came from email reset link
  useState(() => {
    if (typeof window !== "undefined") {
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const type = hashParams.get("type");
      if (type === "recovery") {
        setIsFromEmail(true);
        setStep("reset");
      }
    }
  });

  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        setError(error.message);
        return;
      }

      setStep("success");
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!hasMinLength || !hasUppercase || !hasLowercase || !hasNumber) {
      setError("Password does not meet the requirements.");
      setLoading(false);
      return;
    }

    if (!passwordsMatch) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        setError(error.message);
        return;
      }

      setStep("success");
      setIsFromEmail(false);
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Success after password reset
  if (step === "success" && !isFromEmail) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-[var(--background)]">
        <div className="w-full max-w-md text-center">
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-8 shadow-lg">
            <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-green-500" />
            </div>
            <h1 className="text-2xl font-bold text-[var(--foreground)] mb-2">
              {step === "success" && isFromEmail
                ? "Password Updated!"
                : "Check your email"}
            </h1>
            <p className="text-[var(--muted-foreground)] mb-6">
              {step === "success" && !isFromEmail
                ? `We've sent a password reset link to ${email}.`
                : "Your password has been updated successfully."}
            </p>
            <Link
              href="/login"
              className="inline-block px-6 py-3 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Go to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[var(--background)]">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <MessageSquare className="w-10 h-10 text-[var(--primary)]" />
            <span className="text-2xl font-bold text-[var(--foreground)]">
              Chugli
            </span>
          </Link>
        </div>

        {/* Reset Card */}
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-8 shadow-lg">
          {step === "request" && (
            <>
              <Link
                href="/login"
                className="inline-flex items-center gap-1 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] mb-4"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to login
              </Link>
              <h1 className="text-2xl font-bold text-[var(--foreground)] mb-2">
                Reset password
              </h1>
              <p className="text-[var(--muted-foreground)] mb-6">
                Enter your email and we'll send you a reset link
              </p>

              <form onSubmit={handleRequestReset} className="space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-[var(--foreground)] mb-1.5"
                  >
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--muted-foreground)]" />
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      required
                      className="w-full pl-10 pr-4 py-3 bg-[var(--secondary)] border border-[var(--border)] rounded-lg text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                {error && (
                  <div className="p-3 bg-[var(--destructive)]/10 border border-[var(--destructive)]/20 rounded-lg">
                    <p className="text-sm text-[var(--destructive)]">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send Reset Link"
                  )}
                </button>
              </form>
            </>
          )}

          {step === "reset" && (
            <>
              <h1 className="text-2xl font-bold text-[var(--foreground)] mb-2">
                Set new password
              </h1>
              <p className="text-[var(--muted-foreground)] mb-6">
                Enter your new password below
              </p>

              <form onSubmit={handleResetPassword} className="space-y-4">
                <div>
                  <label
                    htmlFor="newPassword"
                    className="block text-sm font-medium text-[var(--foreground)] mb-1.5"
                  >
                    New Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--muted-foreground)]" />
                    <input
                      id="newPassword"
                      type={showPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      className="w-full pl-10 pr-12 py-3 bg-[var(--secondary)] border border-[var(--border)] rounded-lg text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {newPassword && (
                    <div className="mt-2 grid grid-cols-2 gap-1 text-xs">
                      <PasswordReq met={hasMinLength} text="8+ characters" />
                      <PasswordReq met={hasUppercase} text="Uppercase letter" />
                      <PasswordReq met={hasLowercase} text="Lowercase letter" />
                      <PasswordReq met={hasNumber} text="Number" />
                    </div>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-[var(--foreground)] mb-1.5"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--muted-foreground)]" />
                    <input
                      id="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      className="w-full pl-10 pr-4 py-3 bg-[var(--secondary)] border border-[var(--border)] rounded-lg text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all"
                    />
                  </div>
                  {confirmPassword && (
                    <p
                      className={`mt-1 text-xs ${passwordsMatch ? "text-green-500" : "text-[var(--destructive)]"}`}
                    >
                      {passwordsMatch
                        ? "✓ Passwords match"
                        : "✗ Passwords do not match"}
                    </p>
                  )}
                </div>

                {error && (
                  <div className="p-3 bg-[var(--destructive)]/10 border border-[var(--destructive)]/20 rounded-lg">
                    <p className="text-sm text-[var(--destructive)]">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    "Update Password"
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function PasswordReq({ met, text }: { met: boolean; text: string }) {
  return (
    <div
      className={`flex items-center gap-1 ${met ? "text-green-500" : "text-[var(--muted-foreground)]"}`}
    >
      {met ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
      <span>{text}</span>
    </div>
  );
}
