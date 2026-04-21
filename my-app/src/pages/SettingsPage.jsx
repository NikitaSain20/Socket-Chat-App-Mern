import { useNavigate } from "react-router-dom";
import { THEMES } from "../constants";
import { useThemeStore } from "../store/useThemeStore";
import { X } from "lucide-react";

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();
  const nav = useNavigate();

  return (
    <div className="mc-settings-page">
      <div className="mc-settings-container">
        {/* Header */}
        <div className="mc-settings-header">
          <div>
            <div className="mc-settings-title">Appearance</div>
            <div className="mc-settings-subtitle">
              Choose a theme for your chat interface
            </div>
          </div>
          <button
            onClick={() => nav("/")}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 36,
              height: 36,
              borderRadius: "var(--mc-radius-sm)",
              border: "1px solid var(--mc-border)",
              background: "white",
              cursor: "pointer",
              color: "var(--mc-text-muted)",
              transition: "var(--mc-transition)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#FEF2F2";
              e.currentTarget.style.color = "var(--mc-danger)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "white";
              e.currentTarget.style.color = "var(--mc-text-muted)";
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Theme grid */}
        <div className="mc-theme-grid">
          {THEMES.map((t) => (
            <button
              key={t}
              className={`mc-theme-btn${theme === t ? " active" : ""}`}
              onClick={() => setTheme(t)}
            >
              <div className="mc-theme-swatch" data-theme={t}>
                <div style={{ background: "oklch(var(--p))" }} />
                <div style={{ background: "oklch(var(--s))" }} />
                <div style={{ background: "oklch(var(--a))" }} />
                <div style={{ background: "oklch(var(--n))" }} />
              </div>
              <span className="mc-theme-label">
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;