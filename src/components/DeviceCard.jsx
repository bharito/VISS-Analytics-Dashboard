import { useState, useMemo } from "react";
import { severityClass } from "./shared";

const SEVERITY_ORDER = { Critical: 0, High: 1, Medium: 2, Low: 3 };
const ALL_CITIES = ["Berlin", "Frankfurt", "Munich", "Hamburg", "Cologne"];
const ALL_SEVERITIES = ["Critical", "High", "Medium", "Low"];
const ALL_DEPTS = [
  "Cybersecurity","Risk & Compliance","Core Banking",
  "Trading Floor","Investment Banking","Fraud Detection","IT Infrastructure",
  "Private Banking","Retail Banking","HR & Payroll","Legal",
  "Finance & Accounts","Facilities","Marketing",
];

function ExpandIconButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      aria-label="Expand card"
      style={{
        width: "34px",
        height: "34px",
        borderRadius: "999px",
        border: "1px solid rgba(103,197,214,0.24)",
        background: "var(--viss-surface-soft)",
        color: "var(--viss-text)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        padding: 0,
        flexShrink: 0,
      }}
    >
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
        <path d="M9 5H5V9" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M15 5H19V9" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M19 15V19H15" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M5 15V19H9" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}

function toggle(arr, val) {
  return arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val];
}

function SearchIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, color: "var(--viss-muted)" }}>
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.75" />
      <path d="M16.5 16.5L21 21" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

function FilterIcon({ active }) {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      style={{ color: active ? "var(--viss-accent)" : "var(--viss-muted)", flexShrink: 0 }}
    >
      <path d="M4 6h16M7 12h10M10 18h4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

function CheckGroup({ label, options, checked, onChange }) {
  const [open, setOpen] = useState(false);
  const activeCount = checked.length < options.length ? checked.length : 0;

  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "5px",
          padding: "3px 9px",
          borderRadius: "999px",
          background: open ? "rgba(103,197,214,0.14)" : "var(--viss-surface-soft)",
          border: `1px solid ${open ? "rgba(103,197,214,0.4)" : "var(--viss-border)"}`,
          color: open ? "var(--viss-accent)" : "var(--viss-muted)",
          fontSize: "10px",
          fontFamily: "Eurostile Regular, Arial, sans-serif",
          cursor: "pointer",
          whiteSpace: "nowrap",
          transition: "all 160ms ease",
        }}
      >
        {label}
        {activeCount > 0 && (
          <span
            style={{
              background: "var(--viss-accent)",
              color: "#050505",
              borderRadius: "999px",
              fontSize: "9px",
              fontWeight: 700,
              padding: "1px 4px",
              lineHeight: 1.4,
            }}
          >
            {activeCount}
          </span>
        )}
        <svg
          width="7"
          height="7"
          viewBox="0 0 8 8"
          fill="none"
          style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 160ms ease" }}
        >
          <path d="M1 2.5L4 5.5L7 2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 5px)",
            left: 0,
            zIndex: 50,
            background: "var(--viss-surface)",
            border: "1px solid var(--viss-border)",
            borderRadius: "12px",
            padding: "6px 4px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.28)",
            minWidth: "148px",
            maxHeight: "200px",
            overflowY: "auto",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
          className="viss-scroll"
        >
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: "7px",
              padding: "4px 10px",
              cursor: "pointer",
              borderRadius: "7px",
              fontSize: "10px",
              color: "var(--viss-muted)",
              fontFamily: "Eurostile Regular, Arial, sans-serif",
            }}
          >
            <input
              type="checkbox"
              checked={checked.length === options.length}
              onChange={() => onChange(checked.length === options.length ? [] : [...options])}
              style={{ accentColor: "var(--viss-accent)", width: "11px", height: "11px" }}
            />
            All
          </label>

          <div style={{ height: "1px", background: "var(--viss-border)", margin: "3px 10px" }} />

          {options.map(opt => (
            <label
              key={opt}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "7px",
                padding: "4px 10px",
                cursor: "pointer",
                borderRadius: "7px",
                fontSize: "10px",
                color: "var(--viss-text)",
                fontFamily: "Eurostile Regular, Arial, sans-serif",
                transition: "background 120ms ease",
              }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(103,197,214,0.07)")}
              onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
            >
              <input
                type="checkbox"
                checked={checked.includes(opt)}
                onChange={() => onChange(toggle(checked, opt))}
                style={{ accentColor: "var(--viss-accent)", width: "11px", height: "11px" }}
              />
              {opt}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

function DeviceRow({ device, setSelectedDevice }) {
  return (
    <button
      onClick={() => setSelectedDevice(device)}
      className="viss-row"
      style={{
        padding: "8px 12px",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        width: "100%",
        textAlign: "left",
      }}
    >
      <span
        className={`viss-status-dot ${device.status === "Online" ? "viss-status-online" : "viss-status-offline"}`}
        style={{ flexShrink: 0 }}
      />

      <div
        style={{
          flex: 1,
          minWidth: 0,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "0px 8px",
        }}
      >
        <div
          style={{
            fontSize: "11px",
            fontWeight: 600,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            color: "var(--viss-text)",
          }}
        >
          {device.model}
        </div>
        <div
          className="viss-muted"
          style={{
            fontSize: "10px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            textAlign: "right",
          }}
        >
          {device.id}
        </div>
        <div
          className="viss-muted"
          style={{
            fontSize: "10px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {device.city} · {device.department}
        </div>
        <div
          className="viss-muted"
          style={{
            fontSize: "10px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            textAlign: "right",
          }}
        >
          {device.hwVersion} · {device.swVersion}
        </div>
      </div>

      <div style={{ flexShrink: 0, minWidth: "56px", textAlign: "right" }}>
        {device.alerts > 0
          ? <span className={severityClass(device.severity)} style={{ fontSize: "10px", padding: "2px 7px" }}>{device.severity}</span>
          : <span className="viss-muted" style={{ fontSize: "10px" }}>{device.lastSeen}</span>
        }
      </div>
    </button>
  );
}

function DeviceCard({ isMain, setActiveCard, devices, setSelectedDevice }) {
  const [query, setQuery] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [selSeverity, setSelSeverity] = useState([...ALL_SEVERITIES]);
  const [selCities, setSelCities] = useState([...ALL_CITIES]);
  const [selDepts, setSelDepts] = useState([...ALL_DEPTS]);
  const [selHW, setSelHW] = useState(null);
  const [selSW, setSelSW] = useState(null);

  const hwOptions = useMemo(() => [...new Set(devices.map(d => d.hwVersion).filter(Boolean))].sort(), [devices]);
  const swOptions = useMemo(() => [...new Set(devices.map(d => d.swVersion).filter(Boolean))].sort(), [devices]);
  const resolvedHW = selHW ?? hwOptions;
  const resolvedSW = selSW ?? swOptions;

  const anyFilterActive =
    selSeverity.length < ALL_SEVERITIES.length ||
    selCities.length < ALL_CITIES.length ||
    selDepts.length < ALL_DEPTS.length ||
    resolvedHW.length < hwOptions.length ||
    resolvedSW.length < swOptions.length;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return devices.filter(d => {
      if (!selSeverity.includes(d.severity)) return false;
      if (!selCities.includes(d.city)) return false;
      if (!selDepts.includes(d.department)) return false;
      if (d.hwVersion && !resolvedHW.includes(d.hwVersion)) return false;
      if (d.swVersion && !resolvedSW.includes(d.swVersion)) return false;
      if (!q) return true;
      return (
        d.id.toLowerCase().includes(q) ||
        d.model.toLowerCase().includes(q) ||
        d.city.toLowerCase().includes(q) ||
        d.department.toLowerCase().includes(q)
      );
    });
  }, [devices, query, selSeverity, selCities, selDepts, resolvedHW, resolvedSW]);

  const alertedDevices = useMemo(
    () =>
      filtered
        .filter(d => d.alerts > 0)
        .sort((a, b) => SEVERITY_ORDER[a.severity] - SEVERITY_ORDER[b.severity]),
    [filtered]
  );

  const normalDevices = useMemo(
    () =>
      filtered
        .filter(d => d.alerts === 0)
        .sort((a, b) => SEVERITY_ORDER[a.severity] - SEVERITY_ORDER[b.severity]),
    [filtered]
  );

  const normalByCity = useMemo(() => {
    const map = {};
    for (const d of normalDevices) {
      if (!map[d.city]) map[d.city] = [];
      map[d.city].push(d);
    }
    return map;
  }, [normalDevices]);

  const cityOrder = ALL_CITIES.filter(c => normalByCity[c]?.length > 0);
  const compactAlerted = alertedDevices.slice(0, 3);
  const compactNormal = normalDevices.slice(0, Math.max(0, 5 - compactAlerted.length));

  const gridTemplateRows = isMain
    ? (filterOpen ? "auto auto auto minmax(0, 1fr)" : "auto auto minmax(0, 1fr)")
    : "auto minmax(0, 1fr)";

  return (
    <div
      className="viss-card viss-card-motion"
      style={{
        borderRadius: "24px",
        padding: "14px 16px 12px",
        display: "grid",
        gridTemplateRows,
        height: "100%",
        minHeight: 0,
        overflow: "hidden",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "10px",
          minHeight: 0,
        }}
      >
        <span className="viss-map-title">DEVICE INVENTORY</span>
        {!isMain && <ExpandIconButton onClick={() => setActiveCard("devices")} />}
      </div>

      {isMain && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) auto",
            alignItems: "center",
            gap: "6px",
            marginBottom: "8px",
            minWidth: 0,
            overflow: "hidden",
          }}
        >
          <div style={{ position: "relative", minWidth: 0, width: "100%" }}>
            <input
              className="viss-field"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search by ID, City or Dept..."
              style={{
                width: "100%",
                minWidth: 0,
                paddingRight: "30px",
                fontSize: "11px",
                borderRadius: "999px",
                paddingTop: "5px",
                paddingBottom: "5px",
                boxSizing: "border-box",
              }}
            />
            <span
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                pointerEvents: "none",
              }}
            >
              <SearchIcon />
            </span>
          </div>

          <button
            onClick={() => setFilterOpen(o => !o)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              padding: "5px 11px",
              borderRadius: "999px",
              flexShrink: 0,
              background: filterOpen || anyFilterActive ? "rgba(103,197,214,0.14)" : "var(--viss-surface-soft)",
              border: `1px solid ${filterOpen || anyFilterActive ? "rgba(103,197,214,0.4)" : "var(--viss-border)"}`,
              color: filterOpen || anyFilterActive ? "var(--viss-accent)" : "var(--viss-muted)",
              fontSize: "11px",
              fontFamily: "Eurostile Regular, Arial, sans-serif",
              cursor: "pointer",
              whiteSpace: "nowrap",
              transition: "all 160ms ease",
              minWidth: "78px",
              justifyContent: "center",
            }}
          >
            <FilterIcon active={anyFilterActive} />
            Filters
          </button>
        </div>
      )}

      {isMain && filterOpen && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "5px",
            padding: "8px 10px",
            marginBottom: "8px",
            background: "var(--viss-surface-soft)",
            border: "1px solid var(--viss-border)",
            borderRadius: "14px",
            minHeight: 0,
          }}
        >
          <CheckGroup label="Severity" options={ALL_SEVERITIES} checked={selSeverity} onChange={setSelSeverity} />
          <CheckGroup label="City" options={ALL_CITIES} checked={selCities} onChange={setSelCities} />
          <CheckGroup label="Dept" options={ALL_DEPTS} checked={selDepts} onChange={setSelDepts} />
          <CheckGroup label="HW Ver" options={hwOptions} checked={resolvedHW} onChange={v => setSelHW(v)} />
          <CheckGroup label="SW Ver" options={swOptions} checked={resolvedSW} onChange={v => setSelSW(v)} />
        </div>
      )}

      <div
        className="viss-scroll"
        style={{
          minHeight: 0,
          overflowY: "auto",
          overflowX: "hidden",
          display: "flex",
          flexDirection: "column",
          gap: "5px",
          paddingBottom: "6px",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {(isMain ? alertedDevices : compactAlerted).length > 0 && (
          <>
            <div
              className="viss-muted"
              style={{
                fontSize: "9px",
                textTransform: "uppercase",
                letterSpacing: "0.09em",
                padding: "2px 2px 3px",
                flexShrink: 0,
              }}
            >
              Active Alerts — {alertedDevices.length}
            </div>

            {(isMain ? alertedDevices : compactAlerted).map(d => (
              <DeviceRow key={d.id} device={d} setSelectedDevice={setSelectedDevice} />
            ))}
          </>
        )}

        {isMain
          ? cityOrder.map(city => (
              <div key={city}>
                <div
                  className="viss-muted"
                  style={{
                    fontSize: "9px",
                    textTransform: "uppercase",
                    letterSpacing: "0.09em",
                    padding: "8px 2px 3px",
                  }}
                >
                  {city} — {normalByCity[city].length}
                </div>
                {normalByCity[city].map(d => (
                  <DeviceRow key={d.id} device={d} setSelectedDevice={setSelectedDevice} />
                ))}
              </div>
            ))
          : compactNormal.map(d => (
              <DeviceRow key={d.id} device={d} setSelectedDevice={setSelectedDevice} />
            ))}

        {!isMain && (
          <button
            onClick={() => setActiveCard("devices")}
            className="viss-button-secondary"
            style={{
              marginTop: "2px",
              fontSize: "10px",
              padding: "5px",
              borderRadius: "10px",
              width: "100%",
              flexShrink: 0,
            }}
          >
            Show all {devices.length} devices
          </button>
        )}

        {filtered.length === 0 && (
          <div style={{ padding: "24px 0", textAlign: "center" }}>
            <div className="viss-muted" style={{ fontSize: "11px" }}>
              No devices match your search
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DeviceCard;