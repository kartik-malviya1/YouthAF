import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logos/logo.png";
import heroImage from "../assets/bg/bgyouth.jpg";
import "./login.css";

export default function Login() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login, isAdmin } = useAuth();
  const navigate = useNavigate();

  const getLoginErrorMessage = (message) => {
    const normalized = message?.toLowerCase?.() || "";

    if (normalized.includes("invalid credentials")) {
      return "The email or password you entered is incorrect. Please try again.";
    }

    if (normalized.includes("user not found")) {
      return "No admin account was found with this email address.";
    }

    if (normalized.includes("failed to fetch") || normalized.includes("network")) {
      return "We couldn't reach the server right now. Please check your connection and try again.";
    }

    return message || "We couldn't sign you in. Please try again.";
  };

  // 🔥 AUTO REDIRECT IF ALREADY LOGGED IN
  useEffect(() => {
    if (isAdmin) {
      navigate("/admin");
    }
  }, [isAdmin, navigate]);

  const handleLogin = async () => {
    setError("");

    const trimmedEmail = email.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!trimmedEmail && !password) {
      setError("Please enter your admin email and password.");
      return;
    }

    if (!trimmedEmail) {
      setError("Please enter your admin email address.");
      return;
    }

    if (!emailPattern.test(trimmedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    setLoading(true);

    try {
      await login(trimmedEmail, password);
      // slight delay for smooth UX
      setTimeout(() => {
        navigate("/admin");
      }, 300);
    } catch (error) {
      setError(getLoginErrorMessage(error.message));
    } finally {
      setLoading(false);
    }
  };

  // ENTER KEY
  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <div className="login-page min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-6xl overflow-hidden rounded-4xl border border-white/70 bg-white/80 shadow-[0_30px_80px_rgba(102,39,22,0.18)] backdrop-blur-xl">
        <section className="login-story relative hidden w-full max-w-[48%] flex-col justify-between p-10 text-white lg:flex">
          <div className="login-story-overlay" />

          <div className="relative z-10">
            <div className="mb-10 flex items-center gap-4">
              <div className="rounded-2xl bg-white/14 p-3 backdrop-blur-md">
                <img src={logo} alt="YouthAid Foundation" className="h-14 w-14 object-contain" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/70">
                  YouthAid Foundation
                </p>
                <h1 className="login-serif text-3xl font-semibold leading-tight">
                  Building dignity through women-led livelihoods
                </h1>
              </div>
            </div>

            <div className="max-w-md space-y-5">
              <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/80">
                Admin access portal
              </span>
              <p className="text-base leading-7 text-white/86">
                Welcome back. This workspace supports the team behind grassroots entrepreneurship, mentorship, and seed-capital journeys across Maharashtra.
              </p>
            </div>
          </div>

          <div className="relative z-10 grid gap-4 sm:grid-cols-3">
            <div className="login-stat-card">
              <strong>16,000+</strong>
              <span>Women empowered</span>
            </div>
            <div className="login-stat-card">
              <strong>1,000+</strong>
              <span>Entrepreneurs backed</span>
            </div>
            <div className="login-stat-card">
              <strong>36</strong>
              <span>Districts reached</span>
            </div>
          </div>

          <img
            src={heroImage}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </section>

        <section className="flex flex-1 items-center justify-center bg-[linear-gradient(180deg,rgba(255,255,255,0.94),rgba(252,247,241,0.96))] p-6 sm:p-10">
          <div className="w-full max-w-md">
            <div className="mb-8 text-center lg:text-left">
              <div className="mx-auto mb-5 flex h-18 w-18 items-center justify-center rounded-3xl bg-red-50 shadow-[0_12px_30px_rgba(230,57,70,0.12)] lg:mx-0">
                <img src={logo} alt="YouthAid Foundation logo" className="h-11 w-11 object-contain" />
              </div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.32em] text-red-500">
                Secure administration
              </p>
              <h2 className="login-serif text-4xl font-semibold leading-tight text-stone-900">
                Welcome back to the mission desk
              </h2>
              <p className="mt-3 text-sm leading-6 text-stone-600">
                Sign in to manage stories, updates, and the digital presence of the foundation.
              </p>
            </div>

            {error && (
              <p className="mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </p>
            )}

            <div className="space-y-4">
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-stone-700">Admin Email</span>
                <input
                  autoFocus
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="login-input"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-stone-700">Password</span>
                <div className="relative">
                  <input
                    type={show ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="login-input pr-24"
                  />

                  <button
                    type="button"
                    onClick={() => setShow(!show)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-stone-500 transition hover:bg-stone-100 hover:text-stone-800"
                  >
                    {show ? "Hide" : "Show"}
                  </button>
                </div>
              </label>

              <button
                onClick={handleLogin}
                disabled={loading}
                className={`login-button w-full ${
                  loading
                    ? "cursor-not-allowed bg-red-300 shadow-none"
                    : "bg-red-500 hover:-translate-y-0.5 hover:bg-red-600 hover:shadow-[0_18px_35px_rgba(230,57,70,0.26)]"
                }`}
              >
                {loading ? "Logging in..." : "Login to Dashboard"}
              </button>
            </div>

            <div className="mt-6 rounded-2xl border border-stone-200/80 bg-white/70 px-4 py-4 text-sm text-stone-600 shadow-[0_12px_32px_rgba(28,25,23,0.05)]">
              <p className="font-medium text-stone-800">Restricted access</p>
              <p className="mt-1 leading-6">
                This portal is reserved for authorized administrators managing NGO operations and content.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
