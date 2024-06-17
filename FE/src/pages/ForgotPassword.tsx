import { useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import { authClient } from "../auth-clients";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");
    setLoading(true);

    const { error } = await authClient.requestPasswordReset({
      email: email.trim(),
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
      setMessage(error.message || "Failed to request password reset.");
      setLoading(false);
      return;
    }

    setMessage("If this email exists, a reset link has been generated.");
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-(--color-bg) text-(--color-text)">
      <section className="mx-auto flex min-h-screen w-full max-w-md items-center px-6 py-10">
        <div className="w-full rounded-xl border border-(--color-border) bg-(--color-surface) p-6 shadow-sm">
          <h1 className="text-2xl font-semibold tracking-tight">Forgot password</h1>
          <p className="mt-2 text-sm text-(--color-muted)">
            Enter your email to receive a password reset link.
          </p>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <input
              className="w-full rounded-md border border-(--color-border) bg-white px-3 py-2 text-sm outline-none focus:border-black"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              className="w-full rounded-md bg-black px-3 py-2 text-sm font-medium text-white transition hover:bg-(--color-primary-hover) disabled:cursor-not-allowed disabled:opacity-70"
              type="submit"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send reset link"}
            </button>
          </form>

          {message && <p className="mt-4 text-sm">{message}</p>}

          <p className="mt-4 text-sm text-(--color-muted)">
            Back to{" "}
            <Link className="font-medium text-black underline" to="/login">
              Login
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}

export default ForgotPassword;
