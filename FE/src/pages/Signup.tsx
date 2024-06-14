import { useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import { authClient } from "../auth-clients";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");

    if (name.trim().length < 2) {
      setMessage("Please enter your full name.");
      return;
    }

    if (password.length < 8) {
      setMessage("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);

    const { error } = await authClient.signUp.email({
      name: name.trim(),
      email: email.trim(),
      password,
    });

    if (error) {
      setMessage(error.message || "Signup failed.");
      setLoading(false);
      return;
    }

    setMessage("Signup successful. You can now login.");
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-(--color-bg) text-(--color-text)">
      <section className="mx-auto flex min-h-screen w-full max-w-md items-center px-6 py-10">
        <div className="w-full rounded-xl border border-(--color-border) bg-(--color-surface) p-6 shadow-sm">
          <h1 className="text-2xl font-semibold tracking-tight">Create account</h1>
          <p className="mt-2 text-sm text-(--color-muted)">Start your exam preparation journey.</p>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <input
              className="w-full rounded-md border border-(--color-border) bg-white px-3 py-2 text-sm outline-none focus:border-black"
              type="text"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              className="w-full rounded-md border border-(--color-border) bg-white px-3 py-2 text-sm outline-none focus:border-black"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              className="w-full rounded-md border border-(--color-border) bg-white px-3 py-2 text-sm outline-none focus:border-black"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={8}
              required
            />
            <button
              className="w-full rounded-md bg-black px-3 py-2 text-sm font-medium text-white transition hover:bg-(--color-primary-hover) disabled:cursor-not-allowed disabled:opacity-70"
              type="submit"
              disabled={loading}
            >
              {loading ? "Creating account..." : "Sign up"}
            </button>
          </form>

          {message && <p className="mt-4 text-sm">{message}</p>}

          <p className="mt-4 text-sm text-(--color-muted)">
            Already have an account?{" "}
            <Link className="font-medium text-black underline" to="/login">
              Login
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}

export default Signup;
