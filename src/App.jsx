import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import TrackingPage from "./pages/CourierTracking";
import { useEffect, useState } from "react";
import CustomDrawer from "./components/Drawer";
import HeroSection from "./components/HeroSection";
import NoPage from "./pages/NoPage"; // Import NoPage component
import Layout from "./components/Layout"; // Layout component

function App() {
  const [colors, setColors] = useState({
    primary: "#f9e7d8",
    secondary: "#8B5E3C",
    tertiary: "#FFF8F2",
    paper: "#FFFFFF",
    textPrimary: "#4A3222",
    textSecondary: "#FFFFFF",
  });

  const [layout, setLayout] = useState({ horizontal: true });
  const [settingsOpen, setSettingsOpen] = useState(false);

  const [customer, setCustomer] = useState({
    logo: "https://www.logistiex.com/icons/BlackFontLogistiex.png",
    website: "https://www.logistiex.com/",
    socialLinks: {
      facebook: "https://www.facebook.com/logistiex",
      twitter: "https://twitter.com/logistiex",
      instagram: "https://www.instagram.com/logistiex/",
    },
  });

  useEffect(() => {
    document.documentElement.style.setProperty("--primary-color", colors.primary);
    document.documentElement.style.setProperty("--secondary-color", colors.secondary);
    document.documentElement.style.setProperty("--tertiary-color", colors.tertiary);
    document.documentElement.style.setProperty("--paper-color", colors.paper);
    document.documentElement.style.setProperty("--text-primary", colors.textPrimary);
    document.documentElement.style.setProperty("--text-secondary", colors.textSecondary);
  }, [colors]);

  return (
    <BrowserRouter>
      <Layout colors={colors} setSettingsOpen={setSettingsOpen} customer={customer}>
        <Routes>
          <Route path="/" element={<HeroSection colors={colors} />} />
          <Route
            path="/trackpage/trackShipment/:shipmentId"
            element={<TrackingPage colors={colors} layout={layout} />}
          />
          <Route path="/404" element={<NoPage colors={colors} />} />
          <Route path="/not-found" element={<NoPage colors={colors} />} />
          {/* Catch-all route for undefined paths */}
          <Route path="*" element={<NoPage colors={colors} />} />
        </Routes>

        {/* Drawer Component */}
        <CustomDrawer
          open={settingsOpen}
          setOpen={setSettingsOpen}
          colors={colors}
          setColors={setColors}
          layout={layout}
          setLayout={setLayout}
        />
      </Layout>
    </BrowserRouter>
  );
}

export default App;
