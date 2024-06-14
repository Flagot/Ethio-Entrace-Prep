import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authClient } from "../auth-clients";

function LogoutButton() {
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
      className="rounded-md border border-(--color-border) bg-white px-3 py-2 text-sm font-medium text-black transition hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-70"
      type="button"
      onClick={handleLogout}
      disabled={loading}
    >
      {loading ? "Logging out..." : "Log out"}
    </button>
  );
}

export default LogoutButton;
