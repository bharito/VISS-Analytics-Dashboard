// Shared constants and components used across modals

export const SEVERITY_ORDER = { Critical: 0, High: 1, Medium: 2, Low: 3 };

export const SEVERITY_META = [
  { level: "Critical", color: "#fca5a5", bg: "rgba(239,68,68,0.18)",  border: "rgba(239,68,68,0.32)"  },
  { level: "High",     color: "#fdba74", bg: "rgba(249,115,22,0.18)", border: "rgba(249,115,22,0.30)" },
  { level: "Medium",   color: "#fde047", bg: "rgba(250,204,21,0.18)", border: "rgba(250,204,21,0.28)" },
  { level: "Low",      color: "#86efac", bg: "rgba(34,197,94,0.18)",  border: "rgba(34,197,94,0.28)"  },
];

export function severityClass(level) {
  if (level === "Critical") return "severity-chip severity-critical";
  if (level === "High")     return "severity-chip severity-high";
  if (level === "Medium")   return "severity-chip severity-medium";
  return "severity-chip severity-low";
}

export function CloseIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
      <path
        d="M1.5 1.5L13.5 13.5M13.5 1.5L1.5 13.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}