import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cities, devices } from "../data/mockData";
import TopBar from "../components/TopBar";
import MapCard from "../components/MapCard";
import TrendCard from "../components/TrendCard";
import DeviceCard from "../components/DeviceCard";
import SiteModal from "../components/SiteModal";
import DeviceModal from "../components/DeviceModal";
import AlertModal from "../components/AlertModal";

function DashboardPage() {
  const [activeCard, setActiveCard] = useState("map");
  const [theme, setTheme] = useState("dark");
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);

  const totalAlerts = useMemo(() => devices.reduce((s, d) => s + d.alerts, 0), []);
  const totalOnline = useMemo(() => devices.filter((d) => d.status === "Online").length, []);
  const totalDevices = devices.length;

  const secondaryCards = useMemo(
    () => ["map", "trend", "devices"].filter((c) => c !== activeCard),
    [activeCard]
  );

  const renderCard = (card, isMain = false) => {
    if (card === "map") {
      return (
        <MapCard
          isMain={isMain}
          setActiveCard={setActiveCard}
          cities={cities}
          setSelectedCity={setSelectedCity}
          setIsAlertModalOpen={setIsAlertModalOpen}
          totalAlerts={totalAlerts}
          totalOnline={totalOnline}
          totalDevices={totalDevices}
        />
      );
    }

    if (card === "trend") {
      return (
        <TrendCard
          isMain={isMain}
          setActiveCard={setActiveCard}
          devices={devices}
        />
      );
    }

    return (
      <DeviceCard
        isMain={isMain}
        setActiveCard={setActiveCard}
        devices={devices}
        setSelectedDevice={setSelectedDevice}
      />
    );
  };

  return (
    <div
      className="viss-app"
      data-theme={theme}
      style={{
        height: "100vh",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <style>{`
        .viss-app,
        .viss-app * {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .viss-app *::-webkit-scrollbar {
          display: none;
          width: 0;
          height: 0;
        }
      `}</style>

      <TopBar isDark={theme === "dark"} setTheme={setTheme} />

      <main
        style={{
          maxWidth: "1280px",
          width: "100%",
          margin: "0 auto",
          padding: "24px 32px",
          boxSizing: "border-box",
          flex: 1,
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <h2
          className="viss-page-title"
          style={{ marginBottom: "24px", flexShrink: 0 }}
        >
          Monitoring Overview
        </h2>

        <div
          style={{
            flex: 1,
            minHeight: 0,
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              flex: "1.22 1 0",
              minHeight: 0,
              height: 0,
              overflow: "hidden",
              position: "relative",
            }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeCard}
                initial={{ opacity: 0, y: 12, scale: 0.985 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.985 }}
                transition={{
                  duration: 0.28,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{
                  height: "100%",
                  minHeight: 0,
                }}
              >
                {renderCard(activeCard, true)}
              </motion.div>
            </AnimatePresence>
          </div>

          <div
            style={{
              flex: "0.78 1 0",
              minHeight: 0,
              height: 0,
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "24px",
              alignItems: "stretch",
              overflow: "hidden",
            }}
          >
            {secondaryCards.map((card) => (
              <div
                key={card}
                style={{
                  height: "100%",
                  minHeight: 0,
                  overflow: "hidden",
                }}
              >
                {renderCard(card, false)}
              </div>
            ))}
          </div>
        </div>
      </main>

      <SiteModal
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
        devices={devices}
        setSelectedDevice={setSelectedDevice}
      />
      <DeviceModal
        selectedDevice={selectedDevice}
        setSelectedDevice={setSelectedDevice}
      />
      <AlertModal
        isOpen={isAlertModalOpen}
        setIsOpen={setIsAlertModalOpen}
        devices={devices}
        setSelectedDevice={setSelectedDevice}
      />
    </div>
  );
}

export default DashboardPage;