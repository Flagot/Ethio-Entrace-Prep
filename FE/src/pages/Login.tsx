import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authClient } from "../auth-clients";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");
    setLoading(true);

    const { error } = await authClient.signIn.email({
      email,
      password,
    });

    if (error) {
      setMessage(error.message || "Login failed.");
      setLoading(false);
      return;
    }

    setMessage("Login successful.");
    setLoading(false);
    navigate("/home");
  };

  return (
    <main className="min-h-screen bg-(--color-bg) text-(--color-text)">
      <section className="mx-auto flex min-h-screen w-full max-w-md items-center px-6 py-10">
        <div className="w-full rounded-xl border border-(--color-border) bg-(--color-surface) p-6 shadow-sm">
          <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
          <p className="mt-2 text-sm text-(--color-muted)">Login to continue your preparation.</p>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
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
              required
            />
            <button
              className="w-full rounded-md bg-black px-3 py-2 text-sm font-medium text-white transition hover:bg-(--color-primary-hover) disabled:cursor-not-allowed disabled:opacity-70"
              type="submit"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {message && <p className="mt-4 text-sm">{message}</p>}

          <p className="mt-4 text-sm text-(--color-muted)">
            Don&apos;t have an account?{" "}
            <Link className="font-medium text-black underline" to="/signup">
              Sign up
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}

export default Login;
