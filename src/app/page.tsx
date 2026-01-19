import Link from "next/link";
import { MessageSquare, Users, Shield, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 border-b border-[var(--border)] bg-[var(--background)]/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-8 h-8 text-[var(--primary)]" />
            <span className="text-xl font-bold text-[var(--foreground)]">
              Chugli
            </span>
          </div>
          <nav className="flex items-center gap-4">
            <Link
              href="/login"
              className="px-4 py-2 text-[var(--foreground)] hover:text-[var(--primary)] transition-colors"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="px-4 py-2 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-lg hover:opacity-90 transition-opacity"
            >
              Sign Up
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 pt-16">
        <div className="max-w-4xl mx-auto text-center py-20">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[var(--primary)] to-purple-400 bg-clip-text text-transparent">
            Chat Different.
            <br />
            Connect Better.
          </h1>
          <p className="text-xl text-[var(--muted-foreground)] mb-8 max-w-2xl mx-auto">
            Experience the future of messaging with Chugli. Stay connected with
            friends and discover new connections through anonymous random chats.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signup"
              className="px-8 py-4 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-xl font-semibold text-lg hover:opacity-90 transition-opacity shadow-lg"
            >
              Get Started Free
            </Link>
            <Link
              href="/login"
              className="px-8 py-4 border border-[var(--border)] text-[var(--foreground)] rounded-xl font-semibold text-lg hover:bg-[var(--secondary)] transition-colors"
            >
              I Have an Account
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="w-full max-w-6xl mx-auto py-20 px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-[var(--foreground)]">
            Why Chugli?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              icon={<MessageSquare className="w-8 h-8" />}
              title="Real-time Chat"
              description="Instant messaging with typing indicators and read receipts"
            />
            <FeatureCard
              icon={<Users className="w-8 h-8" />}
              title="Random Chat"
              description="Meet new people anonymously with our random matching"
            />
            <FeatureCard
              icon={<Shield className="w-8 h-8" />}
              title="Privacy First"
              description="Your data is secure with end-to-end protection"
            />
            <FeatureCard
              icon={<Zap className="w-8 h-8" />}
              title="Lightning Fast"
              description="Messages delivered in milliseconds, anywhere in the world"
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--border)] py-8">
        <div className="container mx-auto px-4 text-center text-[var(--muted-foreground)]">
          <p>© 2026 Chugli. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)] hover:border-[var(--primary)] transition-colors">
      <div className="w-12 h-12 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2 text-[var(--foreground)]">
        {title}
      </h3>
      <p className="text-[var(--muted-foreground)] text-sm">{description}</p>
    </div>
  );
}
