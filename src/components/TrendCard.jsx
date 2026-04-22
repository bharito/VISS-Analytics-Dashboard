import { useMemo, useState } from "react";

const CITY_OPTIONS = ["All Cities", "Berlin", "Frankfurt", "Munich", "Hamburg", "Cologne"];
const GROUP_OPTIONS = ["City", "Department", "Severity", "Model", "HW Version", "SW Version"];
const TIMEFRAME_OPTIONS = ["Weekly", "Monthly", "Yearly"];

const TIMEFRAME_LABELS = {
  Weekly: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  Monthly: ["W1", "W2", "W3", "W4"],
  Yearly: ["Jan", "Mar", "May", "Jul", "Sep", "Nov"],
};

const TIMEFRAME_FACTORS = {
  Weekly: [0.76, 0.92, 1.06, 1.24, 1.12, 0.88, 0.8],
  Monthly: [0.84, 1.05, 1.22, 0.94],
  Yearly: [0.72, 0.82, 0.96, 1.08, 1.16, 1.24],
};

const CITY_COLORS = {
  Berlin: "#ef4444",
  Frankfurt: "#f97316",
  Munich: "#eab308",
  Hamburg: "#22c55e",
  Cologne: "#67c5d6",
};

const EXTRA_COLORS = ["#a78bfa", "#f472b6", "#38bdf8", "#fb7185", "#facc15", "#34d399"];

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

function SelectPill({ label, value, options, onChange }) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          background: open ? "rgba(103,197,214,0.18)" : "rgba(5,20,24,0.70)",
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
        <span style={{ opacity: 0.72 }}>{label}</span>
        <span>{value}</span>
        <span style={{ fontSize: "9px", opacity: 0.7 }}>{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <div
          className="viss-scroll"
          style={{
            position: "absolute",
            top: "calc(100% + 6px)",
            left: 0,
            minWidth: "160px",
            maxHeight: "220px",
            overflowY: "auto",
            background: "rgba(10, 28, 34, 0.96)",
            border: "1px solid rgba(103,197,214,0.28)",
            borderRadius: "14px",
            padding: "8px",
            zIndex: 900,
            boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
          }}
        >
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              style={{
                width: "100%",
                border: "none",
                background: opt === value ? "rgba(103,197,214,0.14)" : "transparent",
                color: "#fff",
                borderRadius: "10px",
                padding: "8px 10px",
                textAlign: "left",
                fontSize: "11px",
                fontFamily: "Eurostile Regular, Arial, sans-serif",
                cursor: "pointer",
              }}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function SegmentedTimeframe({ value, onChange, compact = false }) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "4px",
        background: "rgba(5,20,24,0.70)",
        border: "1px solid rgba(103,197,214,0.22)",
        borderRadius: "999px",
        padding: compact ? "3px" : "4px",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
      }}
    >
      {TIMEFRAME_OPTIONS.map((option) => {
        const active = option === value;
        return (
          <button
            key={option}
            onClick={() => onChange(option)}
            style={{
              border: "none",
              borderRadius: "999px",
              padding: compact ? "4px 8px" : "5px 10px",
              fontSize: compact ? "10px" : "11px",
              fontFamily: "Eurostile Regular, Arial, sans-serif",
              background: active ? "rgba(103,197,214,0.18)" : "transparent",
              color: active ? "#ffffff" : "rgba(255,255,255,0.7)",
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}

function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i += 1) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function getGroupKey(device, groupBy) {
  if (groupBy === "City") return device.city;
  if (groupBy === "Department") return device.department;
  if (groupBy === "Severity") return device.severity;
  if (groupBy === "Model") return device.model;
  if (groupBy === "HW Version") return device.hwVersion;
  if (groupBy === "SW Version") return device.swVersion;
  return device.city;
}

function resolveSeriesColor(key, index) {
  return CITY_COLORS[key] || EXTRA_COLORS[index % EXTRA_COLORS.length];
}

function buildSeriesFromGroup(label, stats, index, timeframe) {
  const hash = hashString(`${label}-${timeframe}`);
  const factors = TIMEFRAME_FACTORS[timeframe];
  const scale =
    timeframe === "Weekly" ? 1 :
    timeframe === "Monthly" ? 3.4 :
    10.5;

  const base = Math.max(2, stats.alerts + Math.ceil(stats.total * 0.35));

  const values = factors.map((factor, i) => {
    const pulse = ((hash >> (i % 8)) & 3) - 1;
    return Math.max(0, Math.round(base * factor * scale + pulse));
  });

  return {
    label,
    color: resolveSeriesColor(label, index),
    values,
    total: values.reduce((sum, value) => sum + value, 0),
  };
}

function linePath(values, maxValue) {
  if (!values.length) return "";
  return values
    .map((value, index) => {
      const x = values.length === 1 ? 50 : (index / (values.length - 1)) * 100;
      const y = 82 - (value / maxValue) * 56;
      return `${index === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");
}

function areaPath(values, maxValue) {
  if (!values.length) return "";
  const line = values
    .map((value, index) => {
      const x = values.length === 1 ? 50 : (index / (values.length - 1)) * 100;
      const y = 82 - (value / maxValue) * 56;
      return `${index === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");
  return `${line} L 100 82 L 0 82 Z`;
}

function getCollapsedSubtitle(groupBy) {
  if (groupBy === "City") return "City-wise Alerts";
  if (groupBy === "Department") return "Department Alerts";
  if (groupBy === "Severity") return "Severity Alerts";
  if (groupBy === "Model") return "Model Alerts";
  if (groupBy === "HW Version") return "HW Version Alerts";
  if (groupBy === "SW Version") return "SW Version Alerts";
  return "City-wise Alerts";
}

function TrendCard({ isMain, setActiveCard, devices }) {
  const [selectedCity, setSelectedCity] = useState("All Cities");
  const [groupBy, setGroupBy] = useState("City");
  const [timeframe, setTimeframe] = useState("Monthly");
  const [hoveredPoint, setHoveredPoint] = useState(null);

  const timeLabels = TIMEFRAME_LABELS[timeframe];

  const scopedDevices = useMemo(() => {
    return selectedCity === "All Cities"
      ? devices
      : devices.filter((device) => device.city === selectedCity);
  }, [devices, selectedCity]);

  const series = useMemo(() => {
    const grouped = new Map();

    scopedDevices.forEach((device) => {
      const key = getGroupKey(device, groupBy);
      if (!key) return;

      if (!grouped.has(key)) {
        grouped.set(key, { total: 0, alerts: 0, online: 0 });
      }

      const bucket = grouped.get(key);
      bucket.total += 1;
      bucket.alerts += device.alerts;
      bucket.online += device.status === "Online" ? 1 : 0;
    });

    let items = Array.from(grouped.entries()).map(([label, stats], index) =>
      buildSeriesFromGroup(label, stats, index, timeframe)
    );

    if (groupBy === "City" && selectedCity === "All Cities") {
      items.sort((a, b) => CITY_OPTIONS.indexOf(a.label) - CITY_OPTIONS.indexOf(b.label));
    } else {
      items.sort((a, b) => b.total - a.total);
    }

    return items.slice(0, 4);
  }, [scopedDevices, groupBy, selectedCity, timeframe]);

  const maxValue = Math.max(8, ...series.flatMap((item) => item.values));
  const headerLabel = selectedCity === "All Cities" ? "All Cities" : selectedCity;
  const collapsedSubtitle = getCollapsedSubtitle(groupBy);

  return (
    <section
      className="viss-card viss-card-motion rounded-[28px]"
      style={{
        height: "100%",
        minHeight: 0,
        overflow: "hidden",
        boxSizing: "border-box",
        position: "relative",
        background:
          "radial-gradient(circle at 22% 22%, rgba(103,197,214,0.14), transparent 34%), linear-gradient(180deg, rgba(255,255,255,0.03), rgba(0,0,0,0.14))",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(3,10,12,0.18) 0%, rgba(3,10,12,0.08) 24%, rgba(3,10,12,0.28) 100%)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          display: "block",
          zIndex: 0,
        }}
      >
        {[26, 40, 54, 68, 82].map((y) => (
          <line
            key={y}
            x1="0"
            y1={y}
            x2="100"
            y2={y}
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="0.35"
          />
        ))}

        {timeLabels.map((label, index) => {
          const x = timeLabels.length === 1 ? 50 : (index / (timeLabels.length - 1)) * 100;
          return (
            <g key={label}>
              <line
                x1={x}
                y1="18"
                x2={x}
                y2="82"
                stroke="rgba(255,255,255,0.04)"
                strokeWidth="0.28"
              />
            </g>
          );
        })}

        {series.map((item) => (
          <path
            key={`${item.label}-area`}
            d={areaPath(item.values, maxValue)}
            fill={item.color}
            opacity="0.08"
          />
        ))}

        {series.map((item) => (
          <path
            key={item.label}
            d={linePath(item.values, maxValue)}
            fill="none"
            stroke={item.color}
            strokeWidth={isMain ? "0.8" : "0.95"}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}
      </svg>

      {(isMain || !isMain) && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 3,
            pointerEvents: "none",
          }}
        >
          {series.map((item) =>
            item.values.map((value, index) => {
              const x = item.values.length === 1 ? 50 : (index / (item.values.length - 1)) * 100;
              const y = 82 - (value / maxValue) * 56;
              const isHovered =
                hoveredPoint?.seriesLabel === item.label &&
                hoveredPoint?.timeLabel === timeLabels[index];

              return (
                <div
                  key={`${item.label}-${timeLabels[index]}`}
                  style={{
                    position: "absolute",
                    left: `${x}%`,
                    top: `${y}%`,
                    transform: "translate(-50%, -50%)",
                    pointerEvents: "auto",
                  }}
                  onMouseEnter={() =>
                    setHoveredPoint({
                      seriesLabel: item.label,
                      timeLabel: timeLabels[index],
                      value,
                      color: item.color,
                      x,
                      y,
                    })
                  }
                  onMouseLeave={() => setHoveredPoint(null)}
                >
                  <div
                    style={{
                      width: isHovered ? "14px" : isMain ? "12px" : "10px",
                      height: isHovered ? "14px" : isMain ? "12px" : "10px",
                      borderRadius: "999px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "transparent",
                      cursor: "pointer",
                      transition: "all 140ms ease",
                    }}
                  >
                    <div
                      style={{
                        width: isHovered ? "7px" : isMain ? "5px" : "4px",
                        height: isHovered ? "7px" : isMain ? "5px" : "4px",
                        borderRadius: "50%",
                        background: item.color,
                        boxShadow: isHovered
                          ? `0 0 0 4px ${item.color}33, 0 0 10px ${item.color}66`
                          : `0 0 0 2px ${item.color}22`,
                        transition: "all 140ms ease",
                      }}
                    />
                  </div>
                </div>
              );
            })
          )}

          {hoveredPoint && (
            <div
              style={{
                position: "absolute",
                left: `${Math.min(86, Math.max(14, hoveredPoint.x))}%`,
                top: `${Math.max(16, hoveredPoint.y - 10)}%`,
                transform: "translate(-50%, -100%)",
                background: "rgba(5,20,24,0.92)",
                color: "#fff",
                border: "1px solid rgba(103,197,214,0.22)",
                borderRadius: "12px",
                padding: "8px 10px",
                fontSize: "11px",
                lineHeight: 1.35,
                whiteSpace: "nowrap",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "7px",
                  marginBottom: "2px",
                  fontFamily: "Eurostile Regular, Arial, sans-serif",
                }}
              >
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: hoveredPoint.color,
                    flexShrink: 0,
                  }}
                />
                <span>{hoveredPoint.seriesLabel}</span>
              </div>
              <div style={{ color: "rgba(255,255,255,0.72)", fontSize: "10px" }}>
                {hoveredPoint.timeLabel} · {hoveredPoint.value} alerts
              </div>
            </div>
          )}
        </div>
      )}

      {isMain ? (
        <div
          style={{
            position: "absolute",
            bottom: "14px",
            left: "14px",
            zIndex: 4,
            pointerEvents: "none",
            background: "rgba(5,20,24,0.62)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            borderRadius: "8px",
            padding: "5px 11px",
            border: "1px solid rgba(103,197,214,0.18)",
          }}
        >
          <span className="viss-map-title">ALERT TREND</span>
        </div>
      ) : (
        <div
          style={{
            position: "absolute",
            left: "14px",
            top: "12px",
            zIndex: 4,
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            pointerEvents: "none",
          }}
        >
          <span
            className="viss-map-title"
            style={{ color: "rgba(255,255,255,0.84)" }}
          >
            {collapsedSubtitle}
          </span>
          <span
            style={{
              fontSize: "10px",
              color: "rgba(255,255,255,0.52)",
              fontFamily: "Eurostile Regular, Arial, sans-serif",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            {timeframe}
          </span>
        </div>
      )}

      {isMain && (
        <div
          style={{
            position: "absolute",
            top: "12px",
            left: "12px",
            zIndex: 4,
            display: "flex",
            gap: "8px",
            flexWrap: "wrap",
            maxWidth: "72%",
          }}
        >
          <SelectPill
            label="City"
            value={selectedCity}
            options={CITY_OPTIONS}
            onChange={setSelectedCity}
          />
          <SelectPill
            label="Group"
            value={groupBy}
            options={GROUP_OPTIONS}
            onChange={setGroupBy}
          />
          <SegmentedTimeframe value={timeframe} onChange={setTimeframe} />
        </div>
      )}

      {!isMain && (
        <div
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            zIndex: 4,
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <SegmentedTimeframe
            value={timeframe}
            onChange={setTimeframe}
            compact
          />
          <ExpandIconButton onClick={() => setActiveCard("trend")} />
        </div>
      )}

      {isMain && (
        <div
          style={{
            position: "absolute",
            left: "14px",
            right: "14px",
            bottom: "46px",
            zIndex: 4,
            display: "flex",
            justifyContent: "space-between",
            pointerEvents: "none",
          }}
        >
          {timeLabels.map((label, index) => (
            <span
              key={label}
              style={{
                fontSize: "10px",
                color: "rgba(255,255,255,0.55)",
                fontFamily: "Eurostile Regular, Arial, sans-serif",
                transform:
                  index === 0
                    ? "translateX(0%)"
                    : index === timeLabels.length - 1
                    ? "translateX(0%)"
                    : "translateX(-50%)",
                position: "relative",
                left:
                  index === 0
                    ? "0%"
                    : index === timeLabels.length - 1
                    ? "0%"
                    : "0%",
              }}
            >
              {label}
            </span>
          ))}
        </div>
      )}

      {!isMain && (
        <div
          style={{
            position: "absolute",
            left: "12px",
            right: "12px",
            bottom: "10px",
            zIndex: 4,
            display: "flex",
            justifyContent: "space-between",
            pointerEvents: "none",
          }}
        >
          {timeLabels.map((label) => (
            <span
              key={label}
              style={{
                fontSize: "9px",
                color: "rgba(255,255,255,0.48)",
                fontFamily: "Eurostile Regular, Arial, sans-serif",
              }}
            >
              {label}
            </span>
          ))}
        </div>
      )}

      {isMain && (
        <div
          style={{
            position: "absolute",
            right: "14px",
            bottom: "14px",
            zIndex: 4,
            display: "flex",
            flexDirection: "column",
            gap: "6px",
            width: "220px",
            maxWidth: "38%",
          }}
        >
          <div
            style={{
              alignSelf: "flex-end",
              marginBottom: "2px",
              background: "rgba(5,20,24,0.62)",
              border: "1px solid rgba(103,197,214,0.16)",
              borderRadius: "999px",
              padding: "5px 10px",
              color: "rgba(255,255,255,0.78)",
              fontSize: "11px",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              whiteSpace: "nowrap",
            }}
          >
            {headerLabel} · {groupBy}
          </div>

          {series.map((item) => (
            <div
              key={item.label}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "10px",
                background: "rgba(5,20,24,0.62)",
                border: "1px solid rgba(103,197,214,0.16)",
                borderRadius: "999px",
                padding: "5px 10px",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
              }}
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  minWidth: 0,
                  color: "#fff",
                  fontSize: "11px",
                  fontFamily: "Eurostile Regular, Arial, sans-serif",
                }}
              >
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: item.color,
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.label}
                </span>
              </span>

              <span
                style={{
                  color: "rgba(255,255,255,0.7)",
                  fontSize: "10px",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                }}
              >
                {item.total}
              </span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default TrendCard;