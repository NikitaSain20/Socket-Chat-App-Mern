import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const nav = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ fullName: "", email: "", password: "" });
  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) signup(formData, nav);
  };

  const pwStrength =
    formData.password.length === 0 ? 0 :
    formData.password.length < 6  ? 1 :
    formData.password.length < 10 ? 2 : 3;
  const strengthColors = ["transparent", "#F87171", "#FBBF24", "#10B981"];
  const strengthLabels = ["", "Weak", "Good", "Strong"];

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
            <span className="mc-auth-app-name">My<span>Chat</span></span>
          </div>

          <h1 className="mc-auth-heading">Create account</h1>
          <p className="mc-auth-subheading">Get started with your free account today</p>

          <form onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="mc-form-group">
              <label className="mc-form-label">Full Name</label>
              <div className="mc-input-wrap">
                <User className="mc-input-icon" size={15} />
                <input
                  type="text"
                  placeholder="John Doe"
                  className="mc-input"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>
            </div>

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
                  placeholder="Min. 6 characters"
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

            {/* Strength bar */}
            {formData.password.length > 0 && (
              <div style={{ display:"flex", alignItems:"center", gap:6, marginTop:-8, marginBottom:16 }}>
                {[1,2,3].map(i => (
                  <div
                    key={i}
                    style={{
                      flex:1, height:3, borderRadius:999, transition:"all 0.3s",
                      background: i <= pwStrength ? strengthColors[pwStrength] : "rgba(255,255,255,0.08)"
                    }}
                  />
                ))}
                <span style={{ fontSize:11, color: strengthColors[pwStrength], fontWeight:600, minWidth:36 }}>
                  {strengthLabels[pwStrength]}
                </span>
              </div>
            )}

            {/* Submit */}
            <button type="submit" disabled={isSigningUp} className="mc-btn-primary">
              {isSigningUp ? (
                <><Loader2 size={16} className="mc-spinner" /> Creating account…</>
              ) : "Create account"}
            </button>
          </form>

          <p className="mc-auth-footer">
            Already have an account?{" "}
            <Link to="/login">Sign in</Link>
          </p>
        </div>
      </div>

      {/* ── Right: Illustration ── */}
      <div
        className="mc-auth-visual"
        style={{ background: "#050C1A" }}
      >
        {/* Animated background mesh */}
        <div style={{
          position:"absolute", inset:0, overflow:"hidden", pointerEvents:"none"
        }}>
          <div style={{
            position:"absolute", width:500, height:500, borderRadius:"50%",
            background:"radial-gradient(circle, rgba(37,99,235,0.14) 0%, transparent 70%)",
            top:"10%", left:"10%", animation:"pulse-glow 6s ease-in-out infinite"
          }} />
          <div style={{
            position:"absolute", width:350, height:350, borderRadius:"50%",
            background:"radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 70%)",
            bottom:"10%", right:"10%", animation:"pulse-glow 8s ease-in-out infinite 2s"
          }} />
        </div>

        {/* Hex grid */}
        <svg style={{ position:"absolute", inset:0, width:"100%", height:"100%", opacity:0.05, pointerEvents:"none" }} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hex-su" x="0" y="0" width="50" height="44" patternUnits="userSpaceOnUse">
              <polygon points="25,2 48,14 48,38 25,50 2,38 2,14" fill="none" stroke="#3B82F6" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hex-su)" />
        </svg>

        {/* Illustration */}
        <div style={{ position:"relative", zIndex:10, display:"flex", flexDirection:"column", alignItems:"center", padding:"0 32px" }}>
          <svg viewBox="0 0 340 360" style={{ width:280, height:280 }} xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="su-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#2563EB" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="su-hex" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1E3A8A" />
                <stop offset="100%" stopColor="#0D1A30" />
              </linearGradient>
              <linearGradient id="su-skin" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#e8d5c4" />
                <stop offset="100%" stopColor="#c9a98a" />
              </linearGradient>
              <linearGradient id="su-shirt" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#1D4ED8" />
              </linearGradient>
              <linearGradient id="su-pants" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1E3A8A" />
                <stop offset="100%" stopColor="#1E2D5A" />
              </linearGradient>
              <linearGradient id="su-crystal" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#60A5FA" />
                <stop offset="100%" stopColor="#93C5FD" />
              </linearGradient>
              <linearGradient id="su-ring" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00e5a0" />
                <stop offset="100%" stopColor="#00a070" />
              </linearGradient>
              <filter id="su-glow-f">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>
            <circle cx="170" cy="190" r="130" fill="url(#su-glow)" />
            <polygon points="170,28 288,98 288,238 170,308 52,238 52,98" fill="url(#su-hex)" stroke="#3B82F6" strokeWidth="1.5" strokeOpacity="0.7" filter="url(#su-glow-f)" />
            <polygon points="170,40 276,106 276,232 170,296 64,232 64,106" fill="none" stroke="#60A5FA" strokeWidth="0.5" strokeOpacity="0.3" />
            {/* Crystal top-left */}
            <g transform="translate(66,50) rotate(-15)">
              <polygon points="14,0 28,12 22,28 6,28 0,12" fill="url(#su-crystal)" opacity="0.9" />
              <polygon points="14,0 28,12 14,8" fill="#BFDBFE" opacity="0.6" />
              <polygon points="14,0 0,12 14,8" fill="#3B82F6" opacity="0.5" />
            </g>
            {/* Yellow diamond */}
            <g transform="translate(256,70)">
              <rect x="0" y="0" width="12" height="12" rx="2" fill="#FBBF24" opacity="0.9" transform="rotate(45 6 6)" />
            </g>
            {/* Green ring */}
            <g transform="translate(246,240)">
              <circle cx="20" cy="20" r="18" fill="none" stroke="url(#su-ring)" strokeWidth="7" opacity="0.9" />
              <circle cx="20" cy="20" r="10" fill="none" stroke="#00e5a0" strokeWidth="2" opacity="0.4" />
            </g>
            <polygon points="70,262 82,242 94,262" fill="#3B82F6" opacity="0.7" />
            {/* Legs */}
            <rect x="148" y="252" width="20" height="38" rx="6" fill="url(#su-pants)" />
            <rect x="172" y="252" width="20" height="38" rx="6" fill="url(#su-pants)" />
            <ellipse cx="158" cy="290" rx="13" ry="6" fill="#0D1A30" />
            <ellipse cx="182" cy="290" rx="13" ry="6" fill="#0D1A30" />
            {/* Torso */}
            <rect x="138" y="185" width="64" height="70" rx="10" fill="url(#su-shirt)" />
            {/* Shirt shine */}
            <rect x="142" y="190" width="20" height="4" rx="2" fill="white" opacity="0.1" />
            {/* Arms raised */}
            <path d="M138,196 Q112,175 104,155" stroke="url(#su-skin)" strokeWidth="16" strokeLinecap="round" fill="none" />
            <path d="M202,196 Q228,175 236,155" stroke="url(#su-skin)" strokeWidth="16" strokeLinecap="round" fill="none" />
            {/* Hands */}
            <circle cx="104" cy="150" r="10" fill="url(#su-skin)" />
            <circle cx="236" cy="150" r="10" fill="url(#su-skin)" />
            {/* Phone (blue this time) */}
            <rect x="230" y="128" width="18" height="28" rx="3" fill="#1E3A8A" />
            <rect x="232" y="131" width="14" height="22" rx="2" fill="#3B82F6" opacity="0.9" />
            <rect x="234" y="133" width="10" height="3" rx="1" fill="white" opacity="0.4" />
            <rect x="234" y="138" width="10" height="2" rx="1" fill="white" opacity="0.3" />
            <rect x="234" y="142" width="7" height="2" rx="1" fill="white" opacity="0.3" />
            {/* Chat bubble */}
            <rect x="68" y="128" width="48" height="28" rx="8" fill="#2563EB" opacity="0.95" />
            <polygon points="90,156 82,164 98,156" fill="#2563EB" opacity="0.95" />
            <rect x="74" y="135" width="36" height="3" rx="1" fill="white" opacity="0.7" />
            <rect x="74" y="142" width="26" height="3" rx="1" fill="white" opacity="0.5" />
            {/* Neck */}
            <rect x="162" y="170" width="16" height="20" rx="5" fill="url(#su-skin)" />
            {/* Head */}
            <ellipse cx="170" cy="154" rx="30" ry="32" fill="url(#su-skin)" />
            <path d="M142,142 Q144,112 170,110 Q196,112 198,142 Q190,122 170,120 Q150,122 142,142 Z" fill="#2d1a0e" />
            {/* Happy eyes */}
            <path d="M156,152 Q160,148 164,152" stroke="#2d1a0e" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d="M176,152 Q180,148 184,152" stroke="#2d1a0e" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d="M155,146 Q160,143 165,146" stroke="#2d1a0e" strokeWidth="1.8" fill="none" strokeLinecap="round" />
            <path d="M175,146 Q180,143 185,146" stroke="#2d1a0e" strokeWidth="1.8" fill="none" strokeLinecap="round" />
            <path d="M158,164 Q170,174 182,164" stroke="#a0785a" strokeWidth="2" fill="none" strokeLinecap="round" />
            <ellipse cx="155" cy="162" rx="7" ry="4" fill="#f9a8a8" opacity="0.35" />
            <ellipse cx="185" cy="162" rx="7" ry="4" fill="#f9a8a8" opacity="0.35" />
            {/* Particles */}
            <circle cx="108" cy="88" r="3" fill="#60A5FA" opacity="0.6" />
            <circle cx="240" cy="100" r="2" fill="#00e5a0" opacity="0.55" />
            <circle cx="130" cy="72" r="1.5" fill="#FBBF24" opacity="0.6" />
            <circle cx="220" cy="78" r="2" fill="#60A5FA" opacity="0.45" />
            <circle cx="90" cy="180" r="2" fill="#FBBF24" opacity="0.4" />
            <circle cx="258" cy="190" r="2.5" fill="#60A5FA" opacity="0.45" />
          </svg>

          <div style={{ textAlign:"center", marginTop:8 }}>
            <h2 style={{ fontSize:20, fontWeight:800, color:"white" }}>Join our community</h2>
            <p style={{ fontSize:13, marginTop:8, lineHeight:1.6, maxWidth:270, color:"rgba(255,255,255,0.4)" }}>
              Connect with friends, share moments, and stay in touch with your loved ones.
            </p>
          </div>

          <div style={{ display:"flex", alignItems:"center", gap:8, marginTop:20 }}>
            <div style={{ width:8, height:8, borderRadius:9999, background:"rgba(255,255,255,0.15)" }} />
            <div style={{ width:20, height:8, borderRadius:9999, background:"#3B82F6", boxShadow:"0 0 8px rgba(59,130,246,0.6)" }} />
            <div style={{ width:8, height:8, borderRadius:9999, background:"rgba(255,255,255,0.15)" }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
