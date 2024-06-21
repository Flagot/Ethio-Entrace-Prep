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
  const [googleLoading, setGoogleLoading] = useState(false);

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

  const handleGoogleLogin = async () => {
    setMessage("");
    setGoogleLoading(true);

    const { error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: `${window.location.origin}/home`,
    });

    if (error) {
      setMessage(error.message || "Google login failed.");
      setGoogleLoading(false);
      return;
    }

    setGoogleLoading(false);
  };

  return (
    <main className="min-h-screen bg-(--color-bg) text-(--color-text)">
      <section className="mx-auto flex min-h-screen w-full max-w-md items-center px-6 py-10">
        <div className="w-full rounded-xl border border-(--color-border) bg-(--color-surface) p-6 shadow-sm">
          <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
          <p className="mt-2 text-sm text-(--color-muted)">Login to continue your preparation.</p>

          <div className="mt-6">
            <button
              className="w-full rounded-md border border-(--color-border) bg-(--color-input-bg) px-3 py-2 text-sm font-medium text-(--color-text) transition hover:bg-(--color-primary) hover:text-(--color-on-primary) disabled:cursor-not-allowed disabled:opacity-70"
              type="button"
              onClick={handleGoogleLogin}
              disabled={loading || googleLoading}
            >
              {googleLoading ? "Redirecting..." : "Continue with Google"}
            </button>
          </div>

          <div className="my-4 flex items-center gap-3">
            <span className="h-px flex-1 bg-(--color-border)" />
            <span className="text-sm text-(--color-muted)">or</span>
            <span className="h-px flex-1 bg-(--color-border)" />
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              className="w-full rounded-md border border-(--color-border) bg-(--color-input-bg) px-3 py-2 text-sm outline-none focus:border-(--color-primary)"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              className="w-full rounded-md border border-(--color-border) bg-(--color-input-bg) px-3 py-2 text-sm outline-none focus:border-(--color-primary)"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              className="w-full rounded-md bg-(--color-primary) px-3 py-2 text-sm font-medium text-(--color-on-primary) transition hover:bg-(--color-primary-hover) disabled:cursor-not-allowed disabled:opacity-70"
              type="submit"
              disabled={loading || googleLoading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="mt-3 text-right text-sm">
            <Link className="text-(--color-muted) underline" to="/forgot-password">
              Forgot password?
            </Link>
          </p>

          {message && <p className="mt-4 text-sm">{message}</p>}

          <p className="mt-4 text-sm text-(--color-muted)">
            Don&apos;t have an account?{" "}
            <Link className="font-medium text-(--color-text) underline" to="/signup">
              Sign up
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}

export default Login;
