// import { useState } from "react";
// import { useAuthStore } from "../store/useAuthStore";
// import AuthImagePattern from "../components/AuthImagePattern";
// import { Link } from "react-router-dom";
// import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare } from "lucide-react";

// const LoginPage = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });
//   const { login, isLoggingIn } = useAuthStore();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     login(formData);
//   };

//   return (
//     <div className="h-full grid lg:grid-cols-2 ">
//       {/* Left Side - Form */}
//       <div className="flex flex-col justify-center items-center p-6 sm:p-12">
//         <div className="w-full max-w-md space-y-8">
//           {/* Logo */}
//           <div className="text-center mb-8">
//             <div className="flex flex-col items-center gap-2 group">
//               <div
//                 className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20
//               transition-colors"
//               >
//                 <MessageSquare className="w-6 h-6 text-primary" />
//               </div>
//               <h1 className="text-2xl font-bold mt-2">Welcome Back</h1>
//               <p className="text-base-content/60">Sign in to your account</p>
//             </div>
//           </div>

//           {/* Form */}
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="form-control">
//               <label className="label">
//                 <span className="label-text font-medium">Email</span>
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Mail className="h-5 w-5 text-base-content/40" />
//                 </div>
//                 <input
//                   type="email"
//                   className={`input input-bordered w-full pl-10`}
//                   placeholder="you@example.com"
//                   value={formData.email}
//                   onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                 />
//               </div>
//             </div>

//             <div className="form-control">
//               <label className="label">
//                 <span className="label-text font-medium">Password</span>
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Lock className="h-5 w-5 text-base-content/40" />
//                 </div>
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   className={`input input-bordered w-full pl-10`}
//                   placeholder="••••••••"
//                   value={formData.password}
//                   onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//                 />
//                 <button
//                   type="button"
//                   className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                   onClick={() => setShowPassword(!showPassword)}
//                 >
//                   {showPassword ? (
//                     <EyeOff className="h-5 w-5 text-base-content/40" />
//                   ) : (
//                     <Eye className="h-5 w-5 text-base-content/40" />
//                   )}
//                 </button>
//               </div>
//             </div>

//             <button type="submit" className="btn btn-primary w-full" disabled={isLoggingIn}>
//               {isLoggingIn ? (
//                 <>
//                   <Loader2 className="h-5 w-5 animate-spin" />
//                   Loading...
//                 </>
//               ) : (
//                 "Sign in"
//               )}
//             </button>
//           </form>

//           <div className="text-center">
//             <p className="text-base-content/60">
//               Don&apos;t have an account?{" "}
//               <Link to="/signup" className="link link-primary">
//                 Create account
//               </Link>
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Right Side - Image/Pattern */}
//       <AuthImagePattern
//         title={"Welcome back!"}
//         subtitle={"Sign in to continue your conversations and catch up with your messages."}
//       />
//     </div>
//   );
// };
// export default LoginPage;

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
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* ── Left: Form ── */}
      <div className="flex flex-col justify-center p-8 sm:p-14 bg-base-100">
        <div className="w-full max-w-sm mx-auto space-y-6">
          {/* Brand */}
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-primary-content" />
            </div>
            <span className="text-base font-semibold text-base-content">
              ChatApp
            </span>
          </div>

          {/* Heading */}
          <div>
            <h1 className="text-2xl font-bold text-base-content">
              Welcome back!
            </h1>
            <p className="text-sm text-base-content/50 mt-1">
              Please enter your login details below
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="form-control">
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 -translate-y-1/2 
                  w-4 h-4 text-base-content/30 pointer-events-none"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="input input-bordered w-full pl-9 text-sm 
                    focus:border-primary focus:outline-none"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Password */}
            <div className="form-control">
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 -translate-y-1/2 
                  w-4 h-4 text-base-content/30 pointer-events-none"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="input input-bordered w-full pl-9 pr-10 text-sm 
                    focus:border-primary focus:outline-none"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 
                    text-base-content/30 hover:text-base-content/60 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Forgot */}
            <div className="text-right -mt-2">
              <a href="#" className="text-xs text-primary hover:underline">
                Forgot password?
              </a>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoggingIn}
              className="btn w-full text-white border-none
                bg-gradient-to-r from-primary to-blue-500 
                hover:opacity-90 transition-opacity"
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          {/* Sign up */}
          <p className="text-center text-sm text-base-content/40">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-primary font-semibold hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>

      {/* ── Right: Illustration Panel ── */}
      <div
        className="hidden lg:flex flex-col items-center justify-center relative overflow-hidden"
        style={{ background: "#0d0d1a" }}
      >
        {/* Hex grid background */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ opacity: 0.07 }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="hex"
              x="0"
              y="0"
              width="50"
              height="44"
              patternUnits="userSpaceOnUse"
            >
              <polygon
                points="25,2 48,14 48,38 25,50 2,38 2,14"
                fill="none"
                stroke="white"
                strokeWidth="0.8"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hex)" />
        </svg>

        {/* Main SVG Illustration */}
        <div className="relative z-10 flex flex-col items-center px-8">
          <svg
            viewBox="0 0 340 380"
            className="w-72 h-72"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <radialGradient id="glowGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="hexGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1e1060" />
                <stop offset="100%" stopColor="#0d0820" />
              </linearGradient>
              <linearGradient
                id="screenGrad"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
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
              <linearGradient
                id="laptopGrad"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#888" />
                <stop offset="100%" stopColor="#555" />
              </linearGradient>
              <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00e5a0" />
                <stop offset="100%" stopColor="#00a070" />
              </linearGradient>
              <linearGradient
                id="crystalGrad"
                x1="0%"
                y1="100%"
                x2="100%"
                y2="0%"
              >
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

            {/* Glow circle behind everything */}
            <circle cx="170" cy="200" r="130" fill="url(#glowGrad)" />

            {/* Hexagon frame */}
            <polygon
              points="170,30 290,100 290,240 170,310 50,240 50,100"
              fill="url(#hexGrad)"
              stroke="#7C3AED"
              strokeWidth="1.5"
              strokeOpacity="0.6"
              filter="url(#glow)"
            />
            <polygon
              points="170,42 278,108 278,232 170,298 62,232 62,108"
              fill="none"
              stroke="#5b21b6"
              strokeWidth="0.5"
              strokeOpacity="0.4"
            />

            {/* Floating crystal top-left */}
            <g transform="translate(68, 52) rotate(-15)">
              <polygon
                points="14,0 28,12 22,28 6,28 0,12"
                fill="url(#crystalGrad)"
                opacity="0.9"
              />
              <polygon points="14,0 28,12 14,8" fill="#ddd6fe" opacity="0.6" />
              <polygon points="14,0 0,12 14,8" fill="#7c3aed" opacity="0.5" />
            </g>

            {/* Small diamond top-right */}
            <g transform="translate(256, 72)">
              <rect
                x="0"
                y="0"
                width="12"
                height="12"
                rx="2"
                fill="#facc15"
                opacity="0.9"
                transform="rotate(45 6 6)"
              />
            </g>

            {/* Green ring bottom-right */}
            <g transform="translate(248, 248)">
              <circle
                cx="20"
                cy="20"
                r="18"
                fill="none"
                stroke="url(#ringGrad)"
                strokeWidth="7"
                opacity="0.9"
              />
              <circle
                cx="20"
                cy="20"
                r="10"
                fill="none"
                stroke="#00e5a0"
                strokeWidth="2"
                opacity="0.4"
              />
            </g>

            {/* Triangle bottom-left */}
            <polygon
              points="72,268 84,248 96,268"
              fill="#7C3AED"
              opacity="0.7"
            />

            {/* === Person === */}
            {/* Legs */}
            <rect
              x="148"
              y="258"
              width="20"
              height="38"
              rx="6"
              fill="url(#pantsGrad)"
            />
            <rect
              x="172"
              y="258"
              width="20"
              height="38"
              rx="6"
              fill="url(#pantsGrad)"
            />
            {/* Shoes */}
            <ellipse cx="158" cy="296" rx="13" ry="6" fill="#1a1a2e" />
            <ellipse cx="182" cy="296" rx="13" ry="6" fill="#1a1a2e" />

            {/* Torso / shirt */}
            <rect
              x="138"
              y="190"
              width="64"
              height="72"
              rx="10"
              fill="url(#shirtGrad)"
            />

            {/* Left arm (holding laptop bottom) */}
            <path
              d="M138,200 Q110,218 108,240"
              stroke="url(#bodyGrad)"
              strokeWidth="18"
              strokeLinecap="round"
              fill="none"
            />
            {/* Right arm */}
            <path
              d="M202,200 Q228,215 230,235"
              stroke="url(#bodyGrad)"
              strokeWidth="18"
              strokeLinecap="round"
              fill="none"
            />

            {/* Laptop */}
            <g transform="translate(105, 220)">
              {/* Base */}
              <rect
                x="0"
                y="30"
                width="130"
                height="8"
                rx="3"
                fill="url(#laptopGrad)"
              />
              {/* Screen */}
              <rect
                x="10"
                y="0"
                width="110"
                height="75"
                rx="5"
                fill="url(#laptopGrad)"
              />
              <rect
                x="14"
                y="4"
                width="102"
                height="67"
                rx="3"
                fill="url(#screenGrad)"
              />
              {/* Screen content lines */}
              <rect
                x="20"
                y="14"
                width="60"
                height="4"
                rx="2"
                fill="#7C3AED"
                opacity="0.8"
              />
              <rect
                x="20"
                y="24"
                width="90"
                height="3"
                rx="1"
                fill="#ffffff"
                opacity="0.2"
              />
              <rect
                x="20"
                y="32"
                width="75"
                height="3"
                rx="1"
                fill="#ffffff"
                opacity="0.15"
              />
              <rect
                x="20"
                y="40"
                width="80"
                height="3"
                rx="1"
                fill="#ffffff"
                opacity="0.15"
              />
              <rect
                x="20"
                y="52"
                width="40"
                height="10"
                rx="3"
                fill="#7C3AED"
                opacity="0.7"
              />
              {/* Camera dot */}
              <circle cx="65" cy="2" r="1.5" fill="#555" />
            </g>

            {/* Neck */}
            <rect
              x="162"
              y="176"
              width="16"
              height="20"
              rx="5"
              fill="url(#bodyGrad)"
            />

            {/* Head */}
            <ellipse cx="170" cy="160" rx="30" ry="32" fill="url(#bodyGrad)" />

            {/* Hair */}
            <path
              d="M142,148 Q144,118 170,116 Q196,118 198,148 Q190,128 170,126 Q150,128 142,148 Z"
              fill="#2d1a0e"
            />
            <path
              d="M142,148 Q138,138 140,130 Q148,118 170,116"
              stroke="#2d1a0e"
              strokeWidth="3"
              fill="none"
            />

            {/* Eyes */}
            <ellipse cx="160" cy="158" rx="4" ry="4.5" fill="white" />
            <ellipse cx="180" cy="158" rx="4" ry="4.5" fill="white" />
            <circle cx="161" cy="159" r="2.5" fill="#3d2000" />
            <circle cx="181" cy="159" r="2.5" fill="#3d2000" />
            <circle cx="162" cy="158" r="0.8" fill="white" />
            <circle cx="182" cy="158" r="0.8" fill="white" />

            {/* Eyebrows */}
            <path
              d="M155,152 Q160,149 165,152"
              stroke="#2d1a0e"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M175,152 Q180,149 185,152"
              stroke="#2d1a0e"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />

            {/* Nose */}
            <path
              d="M169,162 Q167,169 164,171 Q168,173 176,171 Q173,169 171,162"
              fill="#c49a7a"
              opacity="0.6"
            />

            {/* Mouth - slight smile */}
            <path
              d="M163,176 Q170,181 177,176"
              stroke="#a0785a"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
            />

            {/* Floating particles */}
            <circle cx="108" cy="140" r="3" fill="#7C3AED" opacity="0.6" />
            <circle cx="240" cy="160" r="2" fill="#00e5a0" opacity="0.5" />
            <circle cx="90" cy="200" r="2" fill="#facc15" opacity="0.5" />
            <circle cx="260" cy="200" r="3" fill="#7C3AED" opacity="0.4" />
          </svg>

          {/* Caption */}
          <div className="text-center mt-2">
            <h2 className="text-xl font-semibold text-white">
              Chat with anyone, anywhere
            </h2>
            <p
              className="text-sm mt-2 leading-relaxed max-w-xs"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              Connect with friends and colleagues in real time — simple, fast,
              and secure.
            </p>
          </div>

          {/* Dots */}
          <div className="flex items-center gap-2 mt-5">
            <div className="w-5 h-2 rounded-full bg-primary" />
            <div
              className="w-2 h-2 rounded-full"
              style={{ background: "rgba(255,255,255,0.2)" }}
            />
            <div
              className="w-2 h-2 rounded-full"
              style={{ background: "rgba(255,255,255,0.2)" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
