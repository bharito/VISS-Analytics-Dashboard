import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { severityMapColors } from "../data/mockData";

const SEVERITY_OPTIONS = ["Critical", "High", "Medium", "Low"];
const ALERT_TYPE_OPTIONS = ["Offline", "Security Event", "Anomaly", "Threshold Breach"];
const CITY_OPTIONS = ["Berlin", "Frankfurt", "Munich", "Hamburg", "Cologne"];

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
        background: "rgba(5,20,24,0.72)",
        color: "#ffffff",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        padding: 0,
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

// Frosted pill checkbox row
function CheckGroup({ label, options, checked, onChange }) {
  const [open, setOpen] = useState(false);
  const activeCount = checked.length < options.length ? checked.length : 0;

  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          background: open
            ? "rgba(103,197,214,0.18)"
            : "rgba(5, 20, 24, 0.70)",
          border: `1px solid ${open ? "rgba(103,197,214,0.5)" : "rgba(103,197,214,0.28)"}`,
          borderRadius: "999px",
          color: "#fff",
          fontSize: "11px",
          padding: "5px 11px",
          cursor: "pointer",
          fontFamily: "Eurostile Regular, Arial, sans-serif",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          display: "flex",
          alignItems: "center",
          gap: "6px",
          whiteSpace: "nowrap",
          letterSpacing: "0.04em",
        }}
      >
        {label}
        {activeCount > 0 && (
          <span
            style={{
              background: "#67c5d6",
              color: "#050505",
              borderRadius: "999px",
              fontSize: "10px",
              padding: "1px 6px",
              fontWeight: 700,
            }}
          >
            {activeCount}
          </span>
        )}
        <span style={{ fontSize: "9px", opacity: 0.7 }}>{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 6px)",
            left: 0,
            background: "rgba(10, 28, 34, 0.95)",
            border: "1px solid rgba(103,197,214,0.28)",
            borderRadius: "14px",
            padding: "10px 12px",
            zIndex: 900,
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            minWidth: "140px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
            maxHeight: "220px",
            overflowY: "auto",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
          className="viss-scroll"
        >
          {options.map((opt) => {
            const isChecked = checked.includes(opt);
            return (
              <label
                key={opt}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "9px",
                  cursor: "pointer",
                  fontSize: "12px",
                  color: "#fff",
                  fontFamily: "Eurostile Regular, Arial, sans-serif",
                  userSelect: "none",
                }}
              >
                <span
                  style={{
                    width: "14px",
                    height: "14px",
                    borderRadius: "4px",
                    flexShrink: 0,
                    border: `1.5px solid ${isChecked ? "#67c5d6" : "rgba(103,197,214,0.35)"}`,
                    background: isChecked ? "rgba(103,197,214,0.25)" : "transparent",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 140ms ease",
                  }}
                >
                  {isChecked && (
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                      <polyline
                        points="1,4 3,6.5 7,1.5"
                        stroke="#67c5d6"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </span>
                {opt}
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
}

function MapCard({
  isMain,
  setActiveCard,
  cities,
  setSelectedCity,
  setIsAlertModalOpen,
  totalAlerts,
  totalOnline,
  totalDevices,
}) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);

  const [severityFilter, setSeverityFilter] = useState([...SEVERITY_OPTIONS]);
  const [alertTypeFilter, setAlertTypeFilter] = useState([...ALERT_TYPE_OPTIONS]);
  const [cityFilter, setCityFilter] = useState([...CITY_OPTIONS]);

  const toggle = (setter) => (opt) =>
    setter((prev) =>
      prev.includes(opt) ? prev.filter((x) => x !== opt) : [...prev, opt]
    );

  const filteredCities = cities.filter((c) => {
    const sevMatch = severityFilter.includes(
      c.severity.charAt(0).toUpperCase() + c.severity.slice(1)
    );
    const cityMatch = cityFilter.includes(c.name);
    return sevMatch && cityMatch;
  });

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current, {
      center: [51.2, 10.45],
      zoom: isMain ? 6 : 5,
      zoomControl: false,
      scrollWheelZoom: true,
      dragging: true,
      attributionControl: false,
    });

    L.tileLayer(
      "https://tiles.stadiamaps.com/tiles/stamen_toner_lite/{z}/{x}/{y}{r}.png",
      {
        maxZoom: 16,
        attribution: "",
        className: "viss-map-tiles",
      }
    ).addTo(map);

    L.control.zoom({ position: "bottomright" }).addTo(map);

    mapInstanceRef.current = map;
    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [isMain]);

  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    filteredCities.forEach((city) => {
      const color = severityMapColors[city.severity];
      const icon = L.divIcon({
        className: "",
        html: `<div style="
          width:14px;height:14px;border-radius:50%;
          background:${color};
          box-shadow:0 0 0 3px ${color}33, 0 0 14px ${color}99;
        "></div>`,
        iconSize: [14, 14],
        iconAnchor: [7, 7],
      });

      const marker = L.marker([city.lat, city.lng], { icon })
        .addTo(map)
        .on("click", () => setSelectedCity(city));

      markersRef.current.push(marker);
    });
  }, [filteredCities, setSelectedCity]);

  return (
    <section
      className="viss-card viss-card-motion rounded-[28px] overflow-hidden"
      style={{
        height: "100%",
        minHeight: 0,
        boxSizing: "border-box",
        position: "relative",
      }}
    >
      <div ref={mapRef} style={{ width: "100%", height: "100%" }} />

      <div
        style={{
          position: "absolute",
          bottom: "14px",
          left: "14px",
          zIndex: 800,
          pointerEvents: "none",
          background: "rgba(5,20,24,0.62)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          borderRadius: "8px",
          padding: "5px 11px",
          border: "1px solid rgba(103,197,214,0.18)",
        }}
      >
        <span className="viss-map-title">Alert Map</span>
      </div>

      {isMain && (
        <div
          style={{
            position: "absolute",
            top: "12px",
            left: "12px",
            zIndex: 800,
            display: "flex",
            gap: "8px",
            flexWrap: "wrap",
            maxWidth: "60%",
          }}
        >
          <CheckGroup
            label="Severity"
            options={SEVERITY_OPTIONS}
            checked={severityFilter}
            onChange={toggle(setSeverityFilter)}
          />
          <CheckGroup
            label="Alert Type"
            options={ALERT_TYPE_OPTIONS}
            checked={alertTypeFilter}
            onChange={toggle(setAlertTypeFilter)}
          />
          <CheckGroup
            label="City"
            options={CITY_OPTIONS}
            checked={cityFilter}
            onChange={toggle(setCityFilter)}
          />
        </div>
      )}

      {isMain && (
        <div
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            zIndex: 800,
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <span
            style={{
              fontSize: "12px",
              color: "rgba(255,255,255,0.82)",
              background: "rgba(5,20,24,0.70)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              borderRadius: "999px",
              padding: "5px 13px",
              border: "1px solid rgba(103,197,214,0.22)",
              whiteSpace: "nowrap",
              fontFamily: "Eurostile Regular, Arial, sans-serif",
            }}
          >
            {totalOnline}/{totalDevices} Online
          </span>
          <button
            onClick={() => setIsAlertModalOpen(true)}
            style={{
              background: "#b83232",
              color: "white",
              border: "none",
              borderRadius: "999px",
              padding: "5px 14px",
              fontSize: "12px",
              fontFamily: "Eurostile Regular, Arial, sans-serif",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "7px",
              boxShadow: "0 0 14px rgba(184,50,50,0.55)",
              whiteSpace: "nowrap",
            }}
          >
            <span
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                background: "#ff9a9a",
                display: "inline-block",
                flexShrink: 0,
              }}
            />
            {totalAlerts} Active Alerts
          </button>
        </div>
      )}

      {!isMain && (
        <div
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            zIndex: 800,
          }}
        >
          <ExpandIconButton onClick={() => setActiveCard("map")} />
        </div>
      )}
    </section>
  );
}

export default MapCard;