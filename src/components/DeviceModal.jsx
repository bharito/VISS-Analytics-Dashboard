import { severityClass, CloseIcon } from "./shared";

// Simple dot — tertiary for normal events, red for alert, green for rectified
function TimelineDot({ type }) {
  const color =
    type === "alert"     ? "#ef4444" :
    type === "rectified" ? "#22c55e" :
    "var(--viss-muted)";

  return (
    <span style={{
      width: "10px", height: "10px", borderRadius: "50%", flexShrink: 0,
      background: color,
      marginTop: "3px",
      boxShadow: type === "alert" ? "0 0 5px rgba(239,68,68,0.5)" :
                 type === "rectified" ? "0 0 5px rgba(34,197,94,0.4)" : "none",
    }} />
  );
}

function DeviceModal({ selectedDevice, setSelectedDevice }) {
  if (!selectedDevice) return null;

  const hasAlerts = selectedDevice.alerts > 0;

  const fields = [
    ["Status",     selectedDevice.status],
    ["City",       selectedDevice.city],
    ["Department", selectedDevice.department],
    ["Model",      selectedDevice.model],
    ["HW Version", selectedDevice.hwVersion],
    ["SW Version", selectedDevice.swVersion],
  ];

  const timeline = selectedDevice.timeline || [];

  return (
    <div className="viss-modal-overlay" onClick={() => setSelectedDevice(null)}>
      <div
        className="viss-card"
        style={{
          width: "100%", maxWidth: "420px", borderRadius: "24px",
          padding: "18px 22px 22px", display: "flex", flexDirection: "column",
          maxHeight: "90vh",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Header ── */}
        <div style={{
          display: "flex", alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "14px", flexShrink: 0, gap: "8px",
        }}>
          {/* Left: severity pill or spacer */}
          <div style={{ width: "28px", display: "flex", justifyContent: "flex-start" }}>
            {hasAlerts && (
              <span className={severityClass(selectedDevice.severity)}
                style={{ fontSize: "10px", padding: "2px 7px" }}>
                {selectedDevice.severity}
              </span>
            )}
          </div>

          {/* Centre: device ID as title */}
          <h3 style={{
            fontFamily: "Eurostile Bold, Eurostile Regular, Arial, sans-serif",
            fontSize: "1.25rem", lineHeight: 1.15,
            textAlign: "center", flex: 1,
            color: "var(--viss-text)",
          }}>
            {selectedDevice.id}
          </h3>

          {/* Right: close */}
          <button className="viss-icon-close" onClick={() => setSelectedDevice(null)} aria-label="Close">
            <CloseIcon />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="viss-scroll" style={{ overflowY: "auto", display: "flex", flexDirection: "column" }}>

          {/* ── Info grid ── */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "7px", marginBottom: "16px" }}>
            {fields.map(([label, value]) => (
              <div key={label} className="viss-soft" style={{ borderRadius: "12px", padding: "9px 12px" }}>
                <div className="viss-muted" style={{ fontSize: "10px", marginBottom: "3px", textTransform: "uppercase", letterSpacing: "0.09em" }}>
                  {label}
                </div>
                <div style={{ fontSize: "13px", fontWeight: 600 }}>{value}</div>
              </div>
            ))}
          </div>

          <hr className="viss-divider" style={{ marginBottom: "14px" }} />

          {/* ── Timeline ── */}
          <div className="viss-muted" style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: "12px" }}>
            Device History
          </div>

          <div style={{ position: "relative", paddingLeft: "5px" }}>
            {/* Vertical connector line */}
            <div style={{
              position: "absolute", left: "4px", top: "8px",
              bottom: "8px", width: "1px",
              background: "var(--viss-border)",
            }} />

            <div style={{ display: "flex", flexDirection: "column" }}>
              {timeline.map((event, idx) => (
                <div key={idx} style={{
                  display: "flex", alignItems: "flex-start", gap: "12px",
                  paddingBottom: idx < timeline.length - 1 ? "14px" : "0",
                }}>
                  <TimelineDot type={event.type} />
                  <div style={{ paddingTop: "0px", minWidth: 0 }}>
                    <div style={{ fontSize: "12px", fontWeight: 600, color: "var(--viss-text)", lineHeight: 1.3 }}>
                      {event.label}
                    </div>
                    <div className="viss-muted" style={{ fontSize: "10px", marginTop: "2px", letterSpacing: "0.03em" }}>
                      {event.ts}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default DeviceModal;