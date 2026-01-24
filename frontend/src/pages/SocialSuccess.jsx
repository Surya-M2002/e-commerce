import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "../config";
/**
 * Handles OAuth redirect from backend:
 * Backend redirects to: FRONTEND/social-success?token=JWT
 * We store token, fetch /users/me, store pb_user, and redirect to home.
 */
const SocialSuccess = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const run = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token") || "";
        if (!token) {
          navigate("/login");
          return;
        }
        try { localStorage.setItem("pb_token", token); } catch { void 0; }
        try {
          const res = await fetch(`${API_URL}/users/me`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          if (res.ok) {
            const user = await res.json();
            try { localStorage.setItem("pb_user", JSON.stringify(user)); } catch { void 0; }
          }
        } catch { void 0; }
        navigate("/");
      } catch {
        navigate("/login");
      }
    };
    run();
  }, [navigate]);
  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center">
      <div className="text-center">
        <div className="spinner-border text-success" role="status" />
        <div className="mt-3">Signing you in…</div>
      </div>
    </div>
  );
};
export default SocialSuccess;
