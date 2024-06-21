import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authClient } from "../auth-clients";

type LogoutButtonProps = {
  className?: string;
};

function LogoutButton({ className }: LogoutButtonProps) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    await authClient.signOut();
    setLoading(false);
    navigate("/login");
  };

  return (
    <button
      className={
        className ||
        "rounded-md border border-(--color-border) bg-(--color-input-bg) px-3 py-2 text-sm font-medium text-(--color-text) transition hover:bg-(--color-primary) hover:text-(--color-on-primary) disabled:cursor-not-allowed disabled:opacity-70"
      }
      type="button"
      onClick={handleLogout}
      disabled={loading}
    >
      {loading ? "Logging out..." : "Log out"}
    </button>
  );
}

export default LogoutButton;
