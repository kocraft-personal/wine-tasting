"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

interface NamePromptProps {
  next?: string;
}

export default function NamePrompt({ next = "/dashboard" }: NamePromptProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim()) {
      setError("Please enter both your first and last name.");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const supabase = createClient();
      const { error: signInError } = await supabase.auth.signInAnonymously();
      if (signInError) throw signInError;

      const res = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ first_name: firstName.trim(), last_name: lastName.trim() }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Failed to save profile");
      }

      router.push(next);
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-dark-wine flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="text-champagne mb-2" style={{ fontSize: "2.5rem", fontFamily: "var(--font-display)", fontStyle: "italic", letterSpacing: "0.02em" }}>
            Wine Tasting
          </div>
          <div className="rule-deco mb-4">
            <span style={{ fontFamily: "var(--font-heading)", fontSize: "0.6rem", letterSpacing: "0.25em", color: "var(--color-champagne)" }}>
              ◆
            </span>
          </div>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "rgba(245,235,214,0.6)", letterSpacing: "0.05em" }}>
            Who&apos;s tasting tonight?
          </p>
        </div>

        {/* Form */}
        <div
          className="corner-bracket p-8"
          style={{
            background: "rgba(245,235,214,0.04)",
            border: "1px solid rgba(212,184,106,0.2)",
            borderRadius: "2px",
          }}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                className="section-label block mb-1.5"
                style={{ color: "var(--color-champagne)", opacity: 0.7 }}
              >
                First Name
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Kyle"
                className="input-wine"
                autoComplete="given-name"
                autoFocus
              />
            </div>

            <div>
              <label
                className="section-label block mb-1.5"
                style={{ color: "var(--color-champagne)", opacity: 0.7 }}
              >
                Last Name
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Craft"
                className="input-wine"
                autoComplete="family-name"
              />
            </div>

            {error && (
              <p style={{ color: "var(--color-rose)", fontSize: "0.8rem" }}>
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full mt-2"
              style={{ opacity: loading ? 0.6 : 1 }}
            >
              {loading ? "One moment…" : "Let's Taste"}
            </button>
          </form>
        </div>

        <p
          style={{
            textAlign: "center",
            marginTop: "1.5rem",
            fontSize: "0.75rem",
            color: "rgba(245,235,214,0.35)",
            fontFamily: "var(--font-body)",
          }}
        >
          No account needed — just your name.
        </p>
      </div>
    </div>
  );
}
