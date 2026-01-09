import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaGoogle,
  FaFacebookF,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaShoppingCart,
} from "react-icons/fa";
import API_URL from '../config';

const LoginPage = ({ onLoginSuccess }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("customer@demo.com");
  const [password, setPassword] = useState("demopass");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const emailOk = /^\S+@\S+\.\S+$/.test(email);
    const passOk = password.length >= 6;
    if (!emailOk || !passOk) {
      setError(!emailOk ? "Enter a valid email address" : "Password must be at least 6 characters");
      return;
    }
    setLoading(true);
  try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Login failed');
      }
      const data = await res.json();
      try { localStorage.setItem('pb_user', JSON.stringify(data.user)); } catch { void 0; }
      try { localStorage.setItem('pb_token', data.token || ''); } catch { void 0; }
      onLoginSuccess(data.user);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    setError("");
    setLoading(true);
    try {
      const p = (provider || "").toLowerCase();
      if (p === "google") {
        window.location.href = `${API_URL}/auth/google`;
        return;
      }
      setError("Facebook login is not enabled");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGuestCheckout = () => {
    const guest = { name: "Guest", email: "guest@checkout.com" };
    try { localStorage.setItem('pb_user', JSON.stringify(guest)); } catch { void 0; }
    try { localStorage.removeItem('pb_token'); } catch { void 0; }
    onLoginSuccess(guest);
  };
  
  const handleForgot = () => {
    setInfo(`Password reset link sent to ${email}`);
  };
  
  const goRegister = () => navigate('/register');

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light px-3">
      <div className="card shadow border-0 w-100" style={{ maxWidth: 420 }}>
        <div className="card-body p-4 p-md-5">

          {/* Header */}
          <div className="text-center mb-4">
            <div
              className="mx-auto mb-3 d-flex align-items-center justify-content-center"
              style={{
                width: 52,
                height: 52,
                borderRadius: "50%",
                backgroundColor: "#e6f5f1",
                color: "#009f7f",
              }}
            >
              <FaLock size={22} />
            </div>
            <h4 className="fw-bold mb-1">Welcome Back</h4>
            <p className="text-muted small">
              Login with your email & password
            </p>
          </div>

          {/* Social Login */}
          <div className="d-grid gap-2 mb-3">
            <button
              className="btn btn-outline-dark d-flex align-items-center justify-content-center gap-2 py-2 rounded-pill"
              onClick={() => handleSocialLogin("Google")}
            >
              <FaGoogle /> Continue with Google
            </button>

            <button
              className="btn btn-outline-primary d-flex align-items-center justify-content-center gap-2 py-2 rounded-pill"
              onClick={() => handleSocialLogin("Facebook")}
            >
              <FaFacebookF /> Continue with Facebook
            </button>
          </div>

          {/* Divider */}
          <div className="d-flex align-items-center my-4">
            <div className="flex-grow-1 border-top"></div>
            <span className="px-3 text-muted small">OR</span>
            <div className="flex-grow-1 border-top"></div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Email</label>
              <input
                type="email"
                className="form-control py-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div className="mb-2">
              <div className="d-flex justify-content-between">
                <label className="form-label fw-semibold">Password</label>
                <span className="text-success small cursor-pointer" onClick={handleForgot}>
                  Forgot password?
                </span>
              </div>

              <div className="position-relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control py-2"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span
                  className="position-absolute top-50 end-0 translate-middle-y px-3 text-muted cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>

          {/* Login Button */}
          <button
            type="submit"
            className="btn w-100 py-2 fw-bold text-white rounded-pill mt-3"
            style={{ backgroundColor: "#009f7f" }}
            disabled={loading}
          >
            {loading ? "Signing in..." : "Login"}
          </button>
          {error && <div className="text-danger small mt-2">{error}</div>}
          {info && <div className="text-success small mt-2">{info}</div>}
        </form>

          {/* Guest Checkout */}
          <button
            className="btn w-100 py-2 mt-3 text-white rounded-pill"
            style={{ backgroundColor: "#c2185b" }}
            onClick={handleGuestCheckout}
          >
            <FaShoppingCart className="me-2" />
            Checkout as Guest
          </button>

          {/* Footer */}
          <div className="text-center mt-4">
            <small className="text-muted">
              Don’t have an account?{" "}
              <span className="fw-semibold text-success cursor-pointer" onClick={goRegister}>
                Register
              </span>
            </small>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LoginPage;
