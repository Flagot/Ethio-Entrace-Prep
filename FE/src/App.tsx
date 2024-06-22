import type { ReactNode } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { authClient } from "./auth-clients";
import { ThemeSync } from "./components/ThemeToggle";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Exam from "./pages/exam";
import ResetPassword from "./pages/ResetPassword";
import Signup from "./pages/Signup";

function AppLoading() {
  return (
    <main className="grid min-h-screen place-items-center bg-(--color-bg) text-(--color-text)">
      <p className="text-sm text-(--color-muted)">Loading session...</p>
    </main>
  );
}

function RootRedirect() {
  const { data, isPending } = authClient.useSession();

  if (isPending) {
    return <AppLoading />;
  }

  return <Navigate to={data?.session ? "/home" : "/login"} replace />;
}

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { data, isPending } = authClient.useSession();

  if (isPending) {
    return <AppLoading />;
  }

  if (!data?.session) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function GuestRoute({ children }: { children: ReactNode }) {
  const { data, isPending } = authClient.useSession();

  if (isPending) {
    return <AppLoading />;
  }

  if (data?.session) {
    return <Navigate to="/home" replace />;
  }

  return children;
}

function App() {
  return (
    <>
      <ThemeSync />
      <Routes>
        <Route path="/" element={<RootRedirect />} />
        <Route
          path="/signup"
          element={
            <GuestRoute>
              <Signup />
            </GuestRoute>
          }
        />
        <Route
          path="/login"
          element={
            <GuestRoute>
              <Login />
            </GuestRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <GuestRoute>
              <ForgotPassword />
            </GuestRoute>
          }
        />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/exam/:examId"
          element={
            <ProtectedRoute>
              <Exam />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
