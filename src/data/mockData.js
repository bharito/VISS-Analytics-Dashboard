export const cities = [
  { name: "Berlin",    lat: 52.52,  lng: 13.405, severity: "critical", alerts: 31 },
  { name: "Frankfurt", lat: 50.11,  lng: 8.682,  severity: "critical", alerts: 24 },
  { name: "Munich",    lat: 48.137, lng: 11.576, severity: "high",     alerts: 17 },
  { name: "Hamburg",   lat: 53.551, lng: 9.993,  severity: "medium",   alerts: 9  },
  { name: "Cologne",   lat: 50.938, lng: 6.960,  severity: "low",      alerts: 4  },
];

const depts = [
  { name: "Cybersecurity",       severity: "Critical" },
  { name: "Risk & Compliance",   severity: "Critical" },
  { name: "Core Banking",        severity: "Critical" },
  { name: "Trading Floor",       severity: "High"     },
  { name: "Investment Banking",  severity: "High"     },
  { name: "Fraud Detection",     severity: "High"     },
  { name: "IT Infrastructure",   severity: "High"     },
  { name: "Private Banking",     severity: "Medium"   },
  { name: "Retail Banking",      severity: "Medium"   },
  { name: "HR & Payroll",        severity: "Medium"   },
  { name: "Legal",               severity: "Medium"   },
  { name: "Finance & Accounts",  severity: "Low"      },
  { name: "Facilities",          severity: "Low"      },
  { name: "Marketing",           severity: "Low"      },
];

const cityOffices = {
  Berlin:    ["Cybersecurity","Risk & Compliance","Core Banking","Trading Floor","Investment Banking","Fraud Detection","IT Infrastructure","Private Banking","Retail Banking","HR & Payroll","Legal","Finance & Accounts","Facilities","Marketing"],
  Frankfurt: ["Cybersecurity","Risk & Compliance","Core Banking","Trading Floor","Investment Banking","Fraud Detection","IT Infrastructure","Private Banking","Retail Banking","HR & Payroll","Legal","Finance & Accounts","Facilities","Marketing"],
  Munich:    ["Trading Floor","Investment Banking","Fraud Detection","IT Infrastructure","Private Banking","Retail Banking","HR & Payroll","Legal","Finance & Accounts","Facilities"],
  Hamburg:   ["Retail Banking","HR & Payroll","Legal","Finance & Accounts","Facilities","Marketing","Private Banking"],
  Cologne:   ["Marketing","Facilities","Finance & Accounts","HR & Payroll"],
};

const statuses  = ["Online","Online","Online","Online","Offline"];
const lastSeens = ["Just now","1 min ago","2 mins ago","3 mins ago","5 mins ago","8 mins ago","12 mins ago","18 mins ago","24 mins ago","31 mins ago","47 mins ago"];
const models    = ["ThinkPad X1 Carbon","Dell Latitude 7420","MacBook Pro 14\"","HP EliteBook 850","Lenovo ThinkPad T14","Dell Precision 5560","MacBook Pro 13\"","HP ZBook Fury 15"];

// Alert counts by severity — only 1 alert per alerted device, kept small
const alertCounts = { Critical: 2, High: 1, Medium: 1, Low: 0 };

const TIMELINE_VARIANTS = [
  [
    { type: "deploy",    label: "Device deployed",             ts: "12 Jan 2024  09:00" },
    { type: "online",    label: "First login",                 ts: "12 Jan 2024  09:14" },
    { type: "alert",     label: "Threshold breach detected",   ts: "03 Mar 2024  14:22" },
    { type: "rectified", label: "Threshold resolved",          ts: "03 Mar 2024  16:05" },
    { type: "offline",   label: "Scheduled maintenance",       ts: "18 Jun 2024  23:00" },
    { type: "online",    label: "Restored online",             ts: "19 Jun 2024  06:30" },
  ],
  [
    { type: "deploy",    label: "Device deployed",             ts: "05 Feb 2024  10:00" },
    { type: "online",    label: "First login",                 ts: "05 Feb 2024  10:18" },
    { type: "offline",   label: "Network outage",              ts: "22 Feb 2024  08:47" },
    { type: "online",    label: "Connectivity restored",       ts: "22 Feb 2024  11:03" },
    { type: "alert",     label: "Security event flagged",      ts: "15 May 2024  02:31" },
    { type: "rectified", label: "Incident closed",             ts: "15 May 2024  04:12" },
  ],
  [
    { type: "deploy",    label: "Device deployed",             ts: "20 Mar 2024  08:30" },
    { type: "online",    label: "First login",                 ts: "20 Mar 2024  08:45" },
    { type: "alert",     label: "Anomaly detected",            ts: "11 Apr 2024  17:09" },
    { type: "offline",   label: "Device isolated",             ts: "11 Apr 2024  17:12" },
    { type: "rectified", label: "Anomaly resolved",            ts: "12 Apr 2024  10:00" },
    { type: "online",    label: "Device restored",             ts: "12 Apr 2024  10:22" },
  ],
  [
    { type: "deploy",    label: "Device deployed",             ts: "08 Apr 2024  11:00" },
    { type: "online",    label: "First login",                 ts: "08 Apr 2024  11:20" },
    { type: "alert",     label: "Unauthorised access attempt", ts: "29 Apr 2024  03:44" },
    { type: "rectified", label: "Access blocked & logged",     ts: "29 Apr 2024  03:51" },
    { type: "offline",   label: "Patch deployment",            ts: "10 Jun 2024  22:00" },
    { type: "online",    label: "Patch applied, online",       ts: "11 Jun 2024  00:15" },
  ],
  [
    { type: "deploy",    label: "Device deployed",             ts: "01 May 2024  09:00" },
    { type: "online",    label: "First login",                 ts: "01 May 2024  09:08" },
    { type: "offline",   label: "Power failure",               ts: "14 May 2024  13:27" },
    { type: "online",    label: "Back online",                 ts: "14 May 2024  14:00" },
    { type: "alert",     label: "CPU anomaly detected",        ts: "02 Jul 2024  11:55" },
    { type: "rectified", label: "Process killed, resolved",    ts: "02 Jul 2024  12:10" },
  ],
  [
    { type: "deploy",    label: "Device deployed",             ts: "15 May 2024  08:00" },
    { type: "online",    label: "First login",                 ts: "15 May 2024  08:22" },
    { type: "alert",     label: "Data exfiltration attempt",   ts: "30 May 2024  00:03" },
    { type: "offline",   label: "Device quarantined",          ts: "30 May 2024  00:04" },
    { type: "rectified", label: "Threat neutralised",          ts: "31 May 2024  09:30" },
    { type: "online",    label: "Device reinstated",           ts: "31 May 2024  10:05" },
  ],
  [
    { type: "deploy",    label: "Device deployed",             ts: "22 Jun 2024  10:30" },
    { type: "online",    label: "First login",                 ts: "22 Jun 2024  10:44" },
    { type: "offline",   label: "OS update restart",           ts: "05 Jul 2024  03:00" },
    { type: "online",    label: "Update complete",             ts: "05 Jul 2024  03:28" },
    { type: "alert",     label: "Compliance policy breach",    ts: "19 Aug 2024  14:17" },
    { type: "rectified", label: "Policy re-applied",           ts: "19 Aug 2024  15:00" },
  ],
  [
    { type: "deploy",    label: "Device deployed",             ts: "10 Jul 2024  09:15" },
    { type: "online",    label: "First login",                 ts: "10 Jul 2024  09:30" },
    { type: "alert",     label: "Disk health warning",         ts: "28 Jul 2024  08:00" },
    { type: "rectified", label: "Disk replaced remotely",      ts: "29 Jul 2024  11:30" },
    { type: "offline",   label: "Hardware swap",               ts: "29 Jul 2024  11:31" },
    { type: "online",    label: "Back online post-swap",       ts: "29 Jul 2024  13:00" },
  ],
  [
    { type: "deploy",    label: "Device deployed",             ts: "03 Aug 2024  08:45" },
    { type: "online",    label: "First login",                 ts: "03 Aug 2024  09:00" },
    { type: "offline",   label: "Unplanned disconnect",        ts: "20 Aug 2024  16:52" },
    { type: "alert",     label: "Offline alert triggered",     ts: "20 Aug 2024  16:53" },
    { type: "online",    label: "Reconnected",                 ts: "20 Aug 2024  17:40" },
    { type: "rectified", label: "Alert closed",                ts: "20 Aug 2024  17:42" },
  ],
  [
    { type: "deploy",    label: "Device deployed",             ts: "18 Sep 2024  11:00" },
    { type: "online",    label: "First login",                 ts: "18 Sep 2024  11:15" },
    { type: "alert",     label: "Malware signature found",     ts: "02 Oct 2024  07:33" },
    { type: "offline",   label: "Isolated for scan",           ts: "02 Oct 2024  07:35" },
    { type: "rectified", label: "Malware removed",             ts: "03 Oct 2024  14:00" },
    { type: "online",    label: "Cleared & restored",          ts: "03 Oct 2024  14:30" },
  ],
];

const HW_VERSIONS = ["HW-2.1.0","HW-2.1.1","HW-2.2.0","HW-3.0.0","HW-3.0.1","HW-3.1.0","HW-3.1.2","HW-4.0.0","HW-4.0.1","HW-4.1.0"];
const SW_VERSIONS = ["SW-7.4.2","SW-7.4.5","SW-7.5.0","SW-7.5.3","SW-8.0.0","SW-8.0.1","SW-8.1.0","SW-8.1.4","SW-9.0.0","SW-9.0.2"];

// Sparse alert set — only ~20% of devices are alerted.
// We pre-define exactly which global device indices get alerts.
// idCounter starts at 1000 and increments once per device.
// Alerted indices (0-based position in generation order):
const ALERTED_INDICES = new Set([
  2, 5, 9, 14, 18, 23, 27, 31, 36, 40,
  44, 49, 53, 58, 62, 67, 71, 75, 80, 84,
]);

let idCounter = 1000;
let deviceIndex = 0;
export const devices = [];

for (const [city, deptList] of Object.entries(cityOffices)) {
  for (const deptName of deptList) {
    const dept  = depts.find(d => d.name === deptName);
    const count = deptName === "Cybersecurity" || deptName === "Core Banking" ? 5
                : deptName === "Trading Floor" || deptName === "Investment Banking" ? 4
                : deptName === "Fraud Detection" || deptName === "IT Infrastructure" ? 3
                : 2;

    for (let i = 0; i < count; i++) {
      const id      = `DEV-${idCounter++}`;
      const variant = deviceIndex % 10;
      const model   = models[deviceIndex % models.length];
      const status  = statuses[deviceIndex % statuses.length];
      const lastSeen = lastSeens[deviceIndex % lastSeens.length];

      // Only pre-listed indices get alerts; everything else is clean
      const isAlerted = ALERTED_INDICES.has(deviceIndex);
      const alerts    = isAlerted ? alertCounts[dept.severity] || 1 : 0;

      devices.push({
        id,
        name:       `${deptName} — ${model}`,
        city,
        department: deptName,
        status,
        severity:   dept.severity,
        lastSeen,
        alerts,
        model,
        hwVersion:  HW_VERSIONS[variant],
        swVersion:  SW_VERSIONS[variant],
        timeline:   TIMELINE_VARIANTS[variant],
      });

      deviceIndex++;
    }
  }
}

export const siteColors = {
  Berlin:    "#ef4444",
  Frankfurt: "#ef4444",
  Munich:    "#f97316",
  Hamburg:   "#eab308",
  Cologne:   "#22c55e",
};

export const severityMapColors = {
  critical: "#ef4444",
  high:     "#f97316",
  medium:   "#eab308",
  low:      "#22c55e",
};

export const trendData = [
  { time: "00:00", Berlin: 18, Frankfurt: 14, Munich: 9,  Hamburg: 5, Cologne: 2 },
  { time: "06:00", Berlin: 22, Frankfurt: 18, Munich: 12, Hamburg: 7, Cologne: 3 },
  { time: "12:00", Berlin: 28, Frankfurt: 21, Munich: 15, Hamburg: 8, Cologne: 3 },
  { time: "18:00", Berlin: 31, Frankfurt: 24, Munich: 17, Hamburg: 9, Cologne: 4 },
];