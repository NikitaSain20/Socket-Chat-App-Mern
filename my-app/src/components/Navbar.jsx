import { Link, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  const location = useLocation();

  return (
    <header className="mc-navbar">
      {/* Brand */}
      <Link to="/" className="mc-navbar-brand">
        <div className="mc-navbar-logo">
          <MessageSquare size={16} color="white" />
        </div>
        <span className="mc-navbar-title">
          My<span>Chat</span>
        </span>
      </Link>

      {/* Right side */}
      {authUser && (
        <div className="mc-nav-actions">
          {/* Settings */}
          <Link
            to="/settings"
            className={`mc-icon-btn${location.pathname === "/settings" ? " active" : ""}`}
            title="Settings"
          >
            <Settings size={17} />
          </Link>

          {/* Profile */}
          <Link
            to="/profile"
            className={`mc-avatar-btn${location.pathname === "/profile" ? " active" : ""}`}
            title="Profile"
          >
            <div className="mc-nav-avatar">
              {authUser.profilePic ? (
                <img src={authUser.profilePic} alt={authUser.fullName} />
              ) : (
                <div className="mc-nav-avatar-fallback">
                  {authUser.fullName?.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <span
              style={{
                display: "none",
                fontSize: 13,
                fontWeight: 500,
                maxWidth: 110,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
              className="sm-show"
            >
              {authUser.fullName}
            </span>
          </Link>

          <div className="mc-nav-divider" />

          {/* Logout */}
          <button onClick={logout} title="Logout" className="mc-logout-btn">
            <LogOut size={15} />
            <span style={{ fontSize: 12, fontWeight: 500 }}>Logout</span>
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
