import Navbar from "./components/Navbar";

import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";

import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import { useThemeStore } from "./store/useThemeStore";
import { useEffect } from "react";

import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import VideoCallPage from "./pages/VideoCallPage";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();
  const { theme } = useThemeStore();

  console.log({ onlineUsers });

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log({ authUser });

  if (isCheckingAuth && !authUser)
    return (
      <div style={{
        display:"flex", alignItems:"center", justifyContent:"center",
        height:"100vh", background:"#050C1A", color:"#60A5FA"
      }}>
        <Loader style={{ width:36, height:36, animation:"spin 1s linear infinite" }} />
      </div>
    );

  return (
    /* data-theme removed — our custom dark CSS tokens take full control */
    <div style={{ minHeight:"100vh", background:"transparent" }}>
      <Navbar />
      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
        <Route path="/videoCall" element={authUser ? <VideoCallPage /> : <Navigate to="/login" />} />
      </Routes>

      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "rgba(13,26,48,0.95)",
            color: "#F0F6FF",
            border: "1px solid rgba(59,130,246,0.25)",
            backdropFilter: "blur(12px)",
            fontSize: "13.5px",
          },
        }}
      />
    </div>
  );
};
export default App;
