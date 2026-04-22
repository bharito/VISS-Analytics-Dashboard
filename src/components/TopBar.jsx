import { useEffect, useState } from "react";

function TopBar({ isDark, setTheme }) {
  const [time, setTime] = useState(() => new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));

  useEffect(() => {
    const id = setInterval(() => {
      setTime(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    }, 30000);
    return () => clearInterval(id);
  }, []);

  return (
    <header className="viss-topbar" style={{ padding: "0 32px" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", height: "60px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>

        {/* Left — brand */}
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <div className="viss-logo-shell">
            <div className="viss-logo-core" />
          </div>
          <div>
            <div className="viss-brand-title" style={{ fontSize: "15px", letterSpacing: "0.04em" }}>
              VISS Analytics
            </div>
            <div style={{ fontSize: "11px", color: "var(--viss-muted)", letterSpacing: "0.1em", marginTop: "1px" }}>
              Intelligence Platform
            </div>
          </div>
        </div>

        {/* Right — live indicator, time, theme */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
            <span style={{
              display: "inline-block", width: "7px", height: "7px",
              borderRadius: "50%", background: "#22c55e",
              boxShadow: "0 0 6px #22c55e"
            }} />
            <span style={{ fontSize: "12px", color: "var(--viss-muted)", letterSpacing: "0.08em" }}>
              LIVE
            </span>
          </div>

          <span style={{ fontSize: "13px", color: "var(--viss-muted)", fontVariantNumeric: "tabular-nums" }}>
            {time}
          </span>
        </div>

      </div>
    </header>
  );
}

export default TopBar;