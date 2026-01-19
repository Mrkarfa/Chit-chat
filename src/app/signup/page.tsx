"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  MessageSquare,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  Loader2,
  Check,
  X,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Password validation
  const hasMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const passwordsMatch = password === confirmPassword && password.length > 0;

  // Username validation
  const usernameValid = /^[a-zA-Z0-9_]{3,20}$/.test(username);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validations
    if (!usernameValid) {
      setError(
        "Username must be 3-20 characters and contain only letters, numbers, and underscores.",
      );
      setLoading(false);
      return;
    }

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

    if (!ageConfirmed) {
      setError("You must be 16 or older to use Chugli.");
      setLoading(false);
      return;
    }

    if (!termsAccepted) {
      setError("You must accept the Terms of Service.");
      setLoading(false);
      return;
    }

    try {
      const supabase = createClient();

      // Check if username is taken
      const { data: existingUser } = await supabase
        .from("users")
        .select("username")
        .eq("username", username.toLowerCase())
        .single();

      if (existingUser) {
        setError("Username is already taken. Please choose another.");
        setLoading(false);
        return;
      }

      // Sign up with Supabase Auth - pass username as metadata for the trigger
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/verify-email`,
          data: {
            username: username.toLowerCase(),
            display_name: displayName || username,
          },
        },
      });

      if (authError) {
        if (authError.message.includes("already registered")) {
          setError(
            "This email is already registered. Please login or reset your password.",
          );
        } else {
          setError(authError.message);
        }
        return;
      }

      if (!authData.user) {
        setError("Failed to create account. Please try again.");
        return;
      }

      // Profile is created automatically by database trigger
      setSuccess(true);
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-[var(--background)]">
        <div className="w-full max-w-md text-center">
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-8 shadow-lg">
            <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-green-500" />
            </div>
            <h1 className="text-2xl font-bold text-[var(--foreground)] mb-2">
              Check your email
            </h1>
            <p className="text-[var(--muted-foreground)] mb-6">
              We&apos;ve sent a verification link to{" "}
              <strong className="text-[var(--foreground)]">{email}</strong>.
              Click the link to verify your account.
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

        {/* Signup Card */}
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-8 shadow-lg">
          <h1 className="text-2xl font-bold text-[var(--foreground)] mb-2">
            Create account
          </h1>
          <p className="text-[var(--muted-foreground)] mb-6">
            Join Chugli and start chatting
          </p>

          <form onSubmit={handleSignup} className="space-y-4">
            {/* Email */}
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

            {/* Username */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-[var(--foreground)] mb-1.5"
              >
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--muted-foreground)]" />
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="cooluser123"
                  required
                  minLength={3}
                  maxLength={20}
                  className="w-full pl-10 pr-4 py-3 bg-[var(--secondary)] border border-[var(--border)] rounded-lg text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all"
                />
              </div>
              {username && (
                <p
                  className={`mt-1 text-xs ${usernameValid ? "text-green-500" : "text-[var(--destructive)]"}`}
                >
                  {usernameValid
                    ? "✓ Valid username"
                    : "3-20 chars, letters, numbers, underscores only"}
                </p>
              )}
            </div>

            {/* Display Name */}
            <div>
              <label
                htmlFor="displayName"
                className="block text-sm font-medium text-[var(--foreground)] mb-1.5"
              >
                Display Name{" "}
                <span className="text-[var(--muted-foreground)]">
                  (optional)
                </span>
              </label>
              <input
                id="displayName"
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="John Doe"
                maxLength={50}
                className="w-full px-4 py-3 bg-[var(--secondary)] border border-[var(--border)] rounded-lg text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-[var(--foreground)] mb-1.5"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--muted-foreground)]" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
              {/* Password Requirements */}
              {password && (
                <div className="mt-2 grid grid-cols-2 gap-1 text-xs">
                  <PasswordReq met={hasMinLength} text="8+ characters" />
                  <PasswordReq met={hasUppercase} text="Uppercase letter" />
                  <PasswordReq met={hasLowercase} text="Lowercase letter" />
                  <PasswordReq met={hasNumber} text="Number" />
                </div>
              )}
            </div>

            {/* Confirm Password */}
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

            {/* Age Confirmation */}
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={ageConfirmed}
                onChange={(e) => setAgeConfirmed(e.target.checked)}
                className="mt-0.5 w-5 h-5 rounded border-[var(--border)] bg-[var(--secondary)] text-[var(--primary)] focus:ring-[var(--primary)] cursor-pointer"
              />
              <span className="text-sm text-[var(--muted-foreground)]">
                I confirm that I am 16 years of age or older
              </span>
            </label>

            {/* Terms */}
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="mt-0.5 w-5 h-5 rounded border-[var(--border)] bg-[var(--secondary)] text-[var(--primary)] focus:ring-[var(--primary)] cursor-pointer"
              />
              <span className="text-sm text-[var(--muted-foreground)]">
                I agree to the{" "}
                <Link
                  href="/terms"
                  className="text-[var(--primary)] hover:underline"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="text-[var(--primary)] hover:underline"
                >
                  Privacy Policy
                </Link>
              </span>
            </label>

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-[var(--destructive)]/10 border border-[var(--destructive)]/20 rounded-lg">
                <p className="text-sm text-[var(--destructive)]">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Creating account...
                </>
              ) : (
                "Create account"
              )}
            </button>
          </form>

          {/* Login Link */}
          <p className="mt-6 text-center text-[var(--muted-foreground)]">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-[var(--primary)] hover:underline font-medium"
            >
              Sign in
            </Link>
          </p>
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
