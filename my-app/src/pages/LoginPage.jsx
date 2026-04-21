import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare } from "lucide-react";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="mc-auth-page">
      {/* ── Left: Form ── */}
      <div className="mc-auth-form-side">
        <div className="mc-auth-card">
          {/* Brand */}
          <div className="mc-auth-brand">
            <div className="mc-auth-logo">
              <MessageSquare size={18} color="white" />
            </div>
            <span className="mc-auth-app-name">
              My<span>Chat</span>
            </span>
          </div>

          <h1 className="mc-auth-heading">Welcome back!</h1>
          <p className="mc-auth-subheading">Please enter your login details below</p>

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className="mc-form-group">
              <label className="mc-form-label">Email</label>
              <div className="mc-input-wrap">
                <Mail className="mc-input-icon" size={15} />
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="mc-input"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            {/* Password */}
            <div className="mc-form-group">
              <label className="mc-form-label">Password</label>
              <div className="mc-input-wrap">
                <Lock className="mc-input-icon" size={15} />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="mc-input has-right-icon"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="mc-input-right-btn"
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Forgot */}
            <a href="#" className="mc-forgot-link">Forgot password?</a>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoggingIn}
              className="mc-btn-primary"
            >
              {isLoggingIn ? (
                <>
                  <Loader2 size={16} className="mc-spinner" />
                  Signing in…
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          <p className="mc-auth-footer">
            Don't have an account?{" "}
            <Link to="/signup">Create account</Link>
          </p>
        </div>
      </div>

      {/* ── Right: Illustration ── */}
      <div
        className="mc-auth-visual"
        style={{ background: "#0d0d1a" }}
      >
        {/* Hex grid background */}
        <svg
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.07, pointerEvents: "none" }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="hex" x="0" y="0" width="50" height="44" patternUnits="userSpaceOnUse">
              <polygon points="25,2 48,14 48,38 25,50 2,38 2,14" fill="none" stroke="white" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hex)" />
        </svg>

        {/* Illustration */}
        <div style={{ position: "relative", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", padding: "0 32px" }}>
          <svg viewBox="0 0 340 380" style={{ width: 280, height: 280 }} xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="glowGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="hexGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1e1060" />
                <stop offset="100%" stopColor="#0d0820" />
              </linearGradient>
              <linearGradient id="screenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1a0a4a" />
                <stop offset="100%" stopColor="#0f0630" />
              </linearGradient>
              <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#e8d5c4" />
                <stop offset="100%" stopColor="#c9a98a" />
              </linearGradient>
              <linearGradient id="shirtGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#f0f0f0" />
                <stop offset="100%" stopColor="#d0d0d0" />
              </linearGradient>
              <linearGradient id="pantsGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#2a4a8a" />
                <stop offset="100%" stopColor="#1a2a5a" />
              </linearGradient>
              <linearGradient id="laptopGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#888" />
                <stop offset="100%" stopColor="#555" />
              </linearGradient>
              <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00e5a0" />
                <stop offset="100%" stopColor="#00a070" />
              </linearGradient>
              <linearGradient id="crystalGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#a78bfa" />
                <stop offset="100%" stopColor="#c4b5fd" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <circle cx="170" cy="200" r="130" fill="url(#glowGrad)" />
            <polygon points="170,30 290,100 290,240 170,310 50,240 50,100" fill="url(#hexGrad)" stroke="#7C3AED" strokeWidth="1.5" strokeOpacity="0.6" filter="url(#glow)" />
            <polygon points="170,42 278,108 278,232 170,298 62,232 62,108" fill="none" stroke="#5b21b6" strokeWidth="0.5" strokeOpacity="0.4" />
            <g transform="translate(68, 52) rotate(-15)">
              <polygon points="14,0 28,12 22,28 6,28 0,12" fill="url(#crystalGrad)" opacity="0.9" />
              <polygon points="14,0 28,12 14,8" fill="#ddd6fe" opacity="0.6" />
              <polygon points="14,0 0,12 14,8" fill="#7c3aed" opacity="0.5" />
            </g>
            <g transform="translate(256, 72)">
              <rect x="0" y="0" width="12" height="12" rx="2" fill="#facc15" opacity="0.9" transform="rotate(45 6 6)" />
            </g>
            <g transform="translate(248, 248)">
              <circle cx="20" cy="20" r="18" fill="none" stroke="url(#ringGrad)" strokeWidth="7" opacity="0.9" />
              <circle cx="20" cy="20" r="10" fill="none" stroke="#00e5a0" strokeWidth="2" opacity="0.4" />
            </g>
            <polygon points="72,268 84,248 96,268" fill="#7C3AED" opacity="0.7" />
            <rect x="148" y="258" width="20" height="38" rx="6" fill="url(#pantsGrad)" />
            <rect x="172" y="258" width="20" height="38" rx="6" fill="url(#pantsGrad)" />
            <ellipse cx="158" cy="296" rx="13" ry="6" fill="#1a1a2e" />
            <ellipse cx="182" cy="296" rx="13" ry="6" fill="#1a1a2e" />
            <rect x="138" y="190" width="64" height="72" rx="10" fill="url(#shirtGrad)" />
            <path d="M138,200 Q110,218 108,240" stroke="url(#bodyGrad)" strokeWidth="18" strokeLinecap="round" fill="none" />
            <path d="M202,200 Q228,215 230,235" stroke="url(#bodyGrad)" strokeWidth="18" strokeLinecap="round" fill="none" />
            <g transform="translate(105, 220)">
              <rect x="0" y="30" width="130" height="8" rx="3" fill="url(#laptopGrad)" />
              <rect x="10" y="0" width="110" height="75" rx="5" fill="url(#laptopGrad)" />
              <rect x="14" y="4" width="102" height="67" rx="3" fill="url(#screenGrad)" />
              <rect x="20" y="14" width="60" height="4" rx="2" fill="#7C3AED" opacity="0.8" />
              <rect x="20" y="24" width="90" height="3" rx="1" fill="#ffffff" opacity="0.2" />
              <rect x="20" y="32" width="75" height="3" rx="1" fill="#ffffff" opacity="0.15" />
              <rect x="20" y="40" width="80" height="3" rx="1" fill="#ffffff" opacity="0.15" />
              <rect x="20" y="52" width="40" height="10" rx="3" fill="#7C3AED" opacity="0.7" />
              <circle cx="65" cy="2" r="1.5" fill="#555" />
            </g>
            <rect x="162" y="176" width="16" height="20" rx="5" fill="url(#bodyGrad)" />
            <ellipse cx="170" cy="160" rx="30" ry="32" fill="url(#bodyGrad)" />
            <path d="M142,148 Q144,118 170,116 Q196,118 198,148 Q190,128 170,126 Q150,128 142,148 Z" fill="#2d1a0e" />
            <path d="M142,148 Q138,138 140,130 Q148,118 170,116" stroke="#2d1a0e" strokeWidth="3" fill="none" />
            <ellipse cx="160" cy="158" rx="4" ry="4.5" fill="white" />
            <ellipse cx="180" cy="158" rx="4" ry="4.5" fill="white" />
            <circle cx="161" cy="159" r="2.5" fill="#3d2000" />
            <circle cx="181" cy="159" r="2.5" fill="#3d2000" />
            <circle cx="162" cy="158" r="0.8" fill="white" />
            <circle cx="182" cy="158" r="0.8" fill="white" />
            <path d="M155,152 Q160,149 165,152" stroke="#2d1a0e" strokeWidth="2" fill="none" strokeLinecap="round" />
            <path d="M175,152 Q180,149 185,152" stroke="#2d1a0e" strokeWidth="2" fill="none" strokeLinecap="round" />
            <path d="M169,162 Q167,169 164,171 Q168,173 176,171 Q173,169 171,162" fill="#c49a7a" opacity="0.6" />
            <path d="M163,176 Q170,181 177,176" stroke="#a0785a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            <circle cx="108" cy="140" r="3" fill="#7C3AED" opacity="0.6" />
            <circle cx="240" cy="160" r="2" fill="#00e5a0" opacity="0.5" />
            <circle cx="90" cy="200" r="2" fill="#facc15" opacity="0.5" />
            <circle cx="260" cy="200" r="3" fill="#7C3AED" opacity="0.4" />
          </svg>

          <div style={{ textAlign: "center", marginTop: 8 }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: "white" }}>
              Chat with anyone, anywhere
            </h2>
            <p style={{ fontSize: 13, marginTop: 8, lineHeight: 1.6, maxWidth: 280, color: "rgba(255,255,255,0.45)" }}>
              Connect with friends and colleagues in real time — simple, fast, and secure.
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 20 }}>
            <div style={{ width: 20, height: 8, borderRadius: 9999, background: "#7C3AED" }} />
            <div style={{ width: 8, height: 8, borderRadius: 9999, background: "rgba(255,255,255,0.2)" }} />
            <div style={{ width: 8, height: 8, borderRadius: 9999, background: "rgba(255,255,255,0.2)" }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
