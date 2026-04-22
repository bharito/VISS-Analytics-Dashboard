import { SEVERITY_ORDER, SEVERITY_META, severityClass, CloseIcon } from "./shared";

function SiteModal({ selectedCity, setSelectedCity, devices, setSelectedDevice }) {
  if (!selectedCity) return null;

  const cityDevices = [...devices]
    .filter((d) => d.city === selectedCity.name)
    .sort((a, b) => SEVERITY_ORDER[a.severity] - SEVERITY_ORDER[b.severity]);

  const onlineCount = cityDevices.filter((d) => d.status === "Online").length;

  const severityCounts = SEVERITY_META.map(({ level }) => ({
    level,
    totalAlerts: cityDevices
      .filter((d) => d.severity === level)
      .reduce((s, d) => s + d.alerts, 0),
  })).filter((s) => s.totalAlerts > 0);

  return (
    <div className="viss-modal-overlay" onClick={() => setSelectedCity(null)}>
      <div
        className="viss-card"
        style={{ width: "100%", maxWidth: "420px", borderRadius: "24px", padding: "18px 22px 22px", display: "flex", flexDirection: "column" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Header ── */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
          <div style={{ width: "28px" }} />
          <h3 style={{
            fontFamily: "Eurostile Bold, Eurostile Regular, Arial, sans-serif",
            fontSize: "1.35rem",
            lineHeight: 1.15,
            textAlign: "center",
            flex: 1,
            color: "var(--viss-text)",
          }}>
            {selectedCity.name}
          </h3>
          <button className="viss-icon-close" onClick={() => setSelectedCity(null)} aria-label="Close">
            <CloseIcon />
          </button>
        </div>

        {/* ── Stats row ── */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "16px", marginBottom: "12px", flexWrap: "wrap" }}>
          <span style={{ fontSize: "12px", color: "var(--viss-muted)", display: "flex", alignItems: "center", gap: "6px" }}>
            <span className="viss-status-dot viss-status-online" />
            {onlineCount}/{cityDevices.length} Online
          </span>

          <span style={{ width: "1px", height: "12px", background: "var(--viss-border)", flexShrink: 0 }} />

          <div style={{ display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap" }}>
            {severityCounts.map(({ level, totalAlerts }) => {
              const meta = SEVERITY_META.find((m) => m.level === level);
              return (
                <span key={level} style={{
                  display: "inline-flex", alignItems: "center", gap: "4px",
                  background: meta.bg, border: `1px solid ${meta.border}`,
                  borderRadius: "999px", padding: "2px 8px",
                  fontSize: "11px", color: meta.color, fontWeight: 600,
                  whiteSpace: "nowrap",
                }}>
                  {level[0]}
                  <span style={{ opacity: 0.7, fontWeight: 400 }}>·</span>
                  {totalAlerts}
                </span>
              );
            })}
          </div>
        </div>

        <hr className="viss-divider" style={{ marginBottom: "12px" }} />

        {/* ── Device list ── */}
        <div className="viss-scroll" style={{ maxHeight: "50vh", overflowY: "auto", display: "flex", flexDirection: "column", gap: "7px" }}>
          {cityDevices.map((device) => (
            <button
              key={device.id}
              onClick={() => setSelectedDevice(device)}
              className="viss-row"
              style={{ padding: "11px 14px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px", minWidth: 0 }}>
                <span className={`viss-status-dot ${device.status === "Online" ? "viss-status-online" : "viss-status-offline"}`} />
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: "13px", fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {device.name}
                  </div>
                  <div className="viss-muted" style={{ fontSize: "11px", marginTop: "2px" }}>
                    {device.id} · {device.lastSeen}
                  </div>
                </div>
              </div>
              <span className={severityClass(device.severity)}>{device.severity}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SiteModal;