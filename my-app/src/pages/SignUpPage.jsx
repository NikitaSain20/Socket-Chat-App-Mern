// import { useState } from "react";
// import { useAuthStore } from "../store/useAuthStore";
// import {
//   Eye,
//   EyeOff,
//   Loader2,
//   Lock,
//   Mail,
//   MessageSquare,
//   User,
// } from "lucide-react";
// import { Link, useNavigate } from "react-router-dom";

// import AuthImagePattern from "../components/AuthImagePattern";
// import toast from "react-hot-toast";

// const SignUpPage = () => {
//   const nav = useNavigate();
//   const [showPassword, setShowPassword] = useState(false);
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     password: "",
//   });

//   const { signup, isSigningUp } = useAuthStore();

//   const validateForm = () => {
//     if (!formData.fullName.trim()) return toast.error("Full name is required");
//     if (!formData.email.trim()) return toast.error("Email is required");
//     if (!/\S+@\S+\.\S+/.test(formData.email))
//       return toast.error("Invalid email format");
//     if (!formData.password) return toast.error("Password is required");
//     if (formData.password.length < 6)
//       return toast.error("Password must be at least 6 characters");

//     return true;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const success = validateForm();

//     if (success === true) signup(formData, nav);
//   };

//   return (
//     <div className="min-h-screen grid lg:grid-cols-2">
//       {/* left side */}
//       <div className="flex flex-col justify-center items-center p-6 sm:p-12">
//         <div className="w-full max-w-md space-y-8">
//           {/* LOGO */}
//           <div className="text-center mb-8">
//             <div className="flex flex-col items-center gap-2 group">
//               <div
//                 className="size-12 rounded-xl bg-primary/10 flex items-center justify-center
//               group-hover:bg-primary/20 transition-colors"
//               >
//                 <MessageSquare className="size-6 text-primary" />
//               </div>
//               <h1 className="text-2xl font-bold mt-2">Create Account</h1>
//               <p className="text-base-content/60">
//                 Get started with your free account
//               </p>
//             </div>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="form-control">
//               <label className="label">
//                 <span className="label-text font-medium">Full Name</span>
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <User className="size-5 text-base-content/40" />
//                 </div>
//                 <input
//                   type="text"
//                   className={`input input-bordered w-full pl-10`}
//                   placeholder="John Doe"
//                   value={formData.fullName}
//                   onChange={(e) =>
//                     setFormData({ ...formData, fullName: e.target.value })
//                   }
//                 />
//               </div>
//             </div>

//             <div className="form-control">
//               <label className="label">
//                 <span className="label-text font-medium">Email</span>
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Mail className="size-5 text-base-content/40" />
//                 </div>
//                 <input
//                   type="email"
//                   className={`input input-bordered w-full pl-10`}
//                   placeholder="you@example.com"
//                   value={formData.email}
//                   onChange={(e) =>
//                     setFormData({ ...formData, email: e.target.value })
//                   }
//                 />
//               </div>
//             </div>

//             <div className="form-control">
//               <label className="label">
//                 <span className="label-text font-medium">Password</span>
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Lock className="size-5 text-base-content/40" />
//                 </div>
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   className={`input input-bordered w-full pl-10`}
//                   placeholder="••••••••"
//                   value={formData.password}
//                   onChange={(e) =>
//                     setFormData({ ...formData, password: e.target.value })
//                   }
//                 />
//                 <button
//                   type="button"
//                   className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                   onClick={() => setShowPassword(!showPassword)}
//                 >
//                   {showPassword ? (
//                     <EyeOff className="size-5 text-base-content/40" />
//                   ) : (
//                     <Eye className="size-5 text-base-content/40" />
//                   )}
//                 </button>
//               </div>
//             </div>

//             <button
//               type="submit"
//               className="btn btn-primary w-full"
//               disabled={isSigningUp}
//             >
//               {isSigningUp ? (
//                 <>
//                   <Loader2 className="size-5 animate-spin" />
//                   Loading...
//                 </>
//               ) : (
//                 "Create Account"
//               )}
//             </button>
//           </form>

//           <div className="text-center">
//             <p className="text-base-content/60">
//               Already have an account?{" "}
//               <Link to="/login" className="link link-primary">
//                 Sign in
//               </Link>
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* right side */}

//       <AuthImagePattern
//         title="Join our community"
//         subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
//       />
//     </div>
//   );
// };
// export default SignUpPage;

import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  MessageSquare,
  User,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const nav = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6)
      return toast.error("Password must be at least 6 characters");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) signup(formData, nav);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* ── Left: Form ── */}
      <div className="flex flex-col justify-center p-8 sm:p-14 bg-base-100">
        <div className="w-full max-w-sm mx-auto space-y-5">
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
              Create account
            </h1>
            <p className="text-sm text-base-content/50 mt-1">
              Get started with your free account today
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div className="form-control">
              <div className="relative">
                <User
                  className="absolute left-3 top-1/2 -translate-y-1/2 
                  w-4 h-4 text-base-content/30 pointer-events-none"
                />
                <input
                  type="text"
                  placeholder="Full name"
                  className="input input-bordered w-full pl-9 text-sm 
                    focus:border-primary focus:outline-none"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Email */}
            <div className="form-control">
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 -translate-y-1/2 
                  w-4 h-4 text-base-content/30 pointer-events-none"
                />
                <input
                  type="email"
                  placeholder="Email address"
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
                  placeholder="Password (min. 6 characters)"
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

            {/* Password strength indicator */}
            <div className="flex gap-1.5 px-0.5">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                    formData.password.length === 0
                      ? "bg-base-300"
                      : formData.password.length < 6
                        ? i === 1
                          ? "bg-red-400"
                          : "bg-base-300"
                        : formData.password.length < 10
                          ? i <= 2
                            ? "bg-yellow-400"
                            : "bg-base-300"
                          : "bg-green-400"
                  }`}
                />
              ))}
              <span className="text-xs text-base-content/30 ml-1 w-12">
                {formData.password.length === 0
                  ? ""
                  : formData.password.length < 6
                    ? "Weak"
                    : formData.password.length < 10
                      ? "Good"
                      : "Strong"}
              </span>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSigningUp}
              className="btn w-full text-white border-none mt-2
                bg-gradient-to-r from-primary to-blue-500 
                hover:opacity-90 transition-opacity"
            >
              {isSigningUp ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                "Create account"
              )}
            </button>
          </form>

          {/* Sign in link */}
          <p className="text-center text-sm text-base-content/40">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary font-semibold hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {/* ── Right: Illustration Panel ── */}
      <div
        className="hidden lg:flex flex-col items-center justify-center relative overflow-hidden"
        style={{ background: "#0d0d1a" }}
      >
        {/* Hex grid */}
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

        {/* Purple glow */}
        <div
          className="absolute w-64 h-64 rounded-full pointer-events-none"
          style={{
            background: "#7C3AED",
            opacity: 0.08,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            filter: "blur(60px)",
          }}
        />

        {/* SVG Illustration */}
        <div className="relative z-10 flex flex-col items-center px-8">
          <svg
            viewBox="0 0 340 360"
            className="w-72 h-72"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <radialGradient id="sg-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="sg-hex" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1e1060" />
                <stop offset="100%" stopColor="#0d0820" />
              </linearGradient>
              <linearGradient id="sg-skin" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#e8d5c4" />
                <stop offset="100%" stopColor="#c9a98a" />
              </linearGradient>
              <linearGradient id="sg-shirt" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#f0f0f0" />
                <stop offset="100%" stopColor="#d0d0d0" />
              </linearGradient>
              <linearGradient id="sg-pants" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#2a4a8a" />
                <stop offset="100%" stopColor="#1a2a5a" />
              </linearGradient>
              <linearGradient
                id="sg-crystal"
                x1="0%"
                y1="100%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#a78bfa" />
                <stop offset="100%" stopColor="#c4b5fd" />
              </linearGradient>
              <linearGradient id="sg-ring" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00e5a0" />
                <stop offset="100%" stopColor="#00a070" />
              </linearGradient>
            </defs>

            {/* Glow */}
            <circle cx="170" cy="190" r="130" fill="url(#sg-glow)" />

            {/* Hexagon frame */}
            <polygon
              points="170,28 288,98 288,238 170,308 52,238 52,98"
              fill="url(#sg-hex)"
              stroke="#7C3AED"
              strokeWidth="1.5"
              strokeOpacity="0.6"
            />
            <polygon
              points="170,40 276,106 276,232 170,296 64,232 64,106"
              fill="none"
              stroke="#5b21b6"
              strokeWidth="0.5"
              strokeOpacity="0.4"
            />

            {/* Crystal top-left */}
            <g transform="translate(66,50) rotate(-15)">
              <polygon
                points="14,0 28,12 22,28 6,28 0,12"
                fill="url(#sg-crystal)"
                opacity="0.9"
              />
              <polygon points="14,0 28,12 14,8" fill="#ddd6fe" opacity="0.6" />
              <polygon points="14,0 0,12 14,8" fill="#7c3aed" opacity="0.5" />
            </g>

            {/* Yellow diamond top-right */}
            <g transform="translate(256,70)">
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
            <g transform="translate(246,240)">
              <circle
                cx="20"
                cy="20"
                r="18"
                fill="none"
                stroke="url(#sg-ring)"
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
              points="70,262 82,242 94,262"
              fill="#7C3AED"
              opacity="0.7"
            />

            {/* Legs */}
            <rect
              x="148"
              y="252"
              width="20"
              height="38"
              rx="6"
              fill="url(#sg-pants)"
            />
            <rect
              x="172"
              y="252"
              width="20"
              height="38"
              rx="6"
              fill="url(#sg-pants)"
            />
            <ellipse cx="158" cy="290" rx="13" ry="6" fill="#1a1a2e" />
            <ellipse cx="182" cy="290" rx="13" ry="6" fill="#1a1a2e" />

            {/* Torso */}
            <rect
              x="138"
              y="185"
              width="64"
              height="70"
              rx="10"
              fill="url(#sg-shirt)"
            />

            {/* Arms raised (welcoming pose) */}
            <path
              d="M138,196 Q112,175 104,155"
              stroke="url(#sg-skin)"
              strokeWidth="16"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M202,196 Q228,175 236,155"
              stroke="url(#sg-skin)"
              strokeWidth="16"
              strokeLinecap="round"
              fill="none"
            />

            {/* Hands */}
            <circle cx="104" cy="150" r="10" fill="url(#sg-skin)" />
            <circle cx="236" cy="150" r="10" fill="url(#sg-skin)" />

            {/* Phone in right hand */}
            <rect x="230" y="128" width="18" height="28" rx="3" fill="#333" />
            <rect
              x="232"
              y="131"
              width="14"
              height="22"
              rx="2"
              fill="#7C3AED"
              opacity="0.8"
            />
            <rect
              x="234"
              y="133"
              width="10"
              height="3"
              rx="1"
              fill="white"
              opacity="0.4"
            />
            <rect
              x="234"
              y="138"
              width="10"
              height="2"
              rx="1"
              fill="white"
              opacity="0.3"
            />
            <rect
              x="234"
              y="142"
              width="7"
              height="2"
              rx="1"
              fill="white"
              opacity="0.3"
            />

            {/* Chat bubble from left hand */}
            <rect
              x="68"
              y="128"
              width="48"
              height="28"
              rx="8"
              fill="#7C3AED"
              opacity="0.9"
            />
            <polygon
              points="90,156 82,164 98,156"
              fill="#7C3AED"
              opacity="0.9"
            />
            <rect
              x="74"
              y="135"
              width="36"
              height="3"
              rx="1"
              fill="white"
              opacity="0.7"
            />
            <rect
              x="74"
              y="142"
              width="26"
              height="3"
              rx="1"
              fill="white"
              opacity="0.5"
            />

            {/* Neck */}
            <rect
              x="162"
              y="170"
              width="16"
              height="20"
              rx="5"
              fill="url(#sg-skin)"
            />

            {/* Head */}
            <ellipse cx="170" cy="154" rx="30" ry="32" fill="url(#sg-skin)" />

            {/* Hair */}
            <path
              d="M142,142 Q144,112 170,110 Q196,112 198,142 Q190,122 170,120 Q150,122 142,142 Z"
              fill="#2d1a0e"
            />

            {/* Eyes — happy/squinting */}
            <path
              d="M156,152 Q160,148 164,152"
              stroke="#2d1a0e"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M176,152 Q180,148 184,152"
              stroke="#2d1a0e"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
            />

            {/* Eyebrows */}
            <path
              d="M155,146 Q160,143 165,146"
              stroke="#2d1a0e"
              strokeWidth="1.8"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M175,146 Q180,143 185,146"
              stroke="#2d1a0e"
              strokeWidth="1.8"
              fill="none"
              strokeLinecap="round"
            />

            {/* Big smile */}
            <path
              d="M158,164 Q170,174 182,164"
              stroke="#a0785a"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />

            {/* Cheeks */}
            <ellipse
              cx="155"
              cy="162"
              rx="7"
              ry="4"
              fill="#f9a8a8"
              opacity="0.35"
            />
            <ellipse
              cx="185"
              cy="162"
              rx="7"
              ry="4"
              fill="#f9a8a8"
              opacity="0.35"
            />

            {/* Floating particles */}
            <circle cx="108" cy="88" r="3" fill="#7C3AED" opacity="0.5" />
            <circle cx="240" cy="100" r="2" fill="#00e5a0" opacity="0.5" />
            <circle cx="130" cy="72" r="1.5" fill="#facc15" opacity="0.6" />
            <circle cx="220" cy="78" r="2" fill="#7C3AED" opacity="0.4" />
            <circle cx="90" cy="180" r="2" fill="#facc15" opacity="0.4" />
            <circle cx="258" cy="190" r="2.5" fill="#7C3AED" opacity="0.4" />
          </svg>

          {/* Caption */}
          <div className="text-center mt-1">
            <h2 className="text-xl font-semibold text-white">
              Join our community
            </h2>
            <p
              className="text-sm mt-2 leading-relaxed max-w-xs"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              Connect with friends, share moments, and stay in touch with your
              loved ones.
            </p>
          </div>

          {/* Dots */}
          <div className="flex items-center gap-2 mt-5">
            <div
              className="w-2 h-2 rounded-full"
              style={{ background: "rgba(255,255,255,0.2)" }}
            />
            <div className="w-5 h-2 rounded-full bg-primary" />
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

export default SignUpPage;
