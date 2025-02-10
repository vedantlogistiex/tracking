import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import TrackingPage from "./pages/CourierTracking";
import { useEffect, useState } from "react";
import Footer from "./components/Footer";
import CustomDrawer from "./components/Drawer";
import HeroSection from "./components/HeroSection";

function App() {
  const [colors, setColors] = useState({
    primary: "#f9e7d8", // Warm Beige (Soft, Elegant)
    secondary: "#8B5E3C", // Deep Brown (Good Contrast with Beige)
    tertiary: "#FFF8F2", // Soft Cream (For a Light Contrast)
    paper: "#FFFFFF", // Clean White (For Backgrounds)
    textPrimary: "#4A3222", // Rich Dark Brown (Readable on Light Backgrounds)
    textSecondary: "#FFFFFF", // White (Readable on Dark Backgrounds)
  });

  const [layout, setLayout] = useState({
    horizontal: true,
  });
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

  // Use useEffect to set the CSS variables when colors change
  useEffect(() => {
    // Set the CSS variables on the root or body element
    document.documentElement.style.setProperty("--primary-color", colors.primary);
    document.documentElement.style.setProperty("--secondary-color", colors.secondary);
    document.documentElement.style.setProperty("--tertiary-color", colors.tertiary);
    document.documentElement.style.setProperty("--paper-color", colors.paper);
    document.documentElement.style.setProperty("--text-primary", colors.textPrimary);
    document.documentElement.style.setProperty("--text-secondary", colors.textSecondary);
  }, [colors]);

  return (
    <BrowserRouter>
      <div style={{ fontFamily: "Inter, sans-serif" }}>
        <div className="mx-auto">
          <div
            style={{
              background: `transparent linear-gradient(244deg, ${colors.primary}, ${colors.tertiary}) 0 0 no-repeat padding-box`,
              backgroundPosition: "bottom",
              "--primary-color": colors.primary,
              "--secondary-color": colors.secondary,
              "--paper-color": colors.paper,
            }}
          >
            {/* Header with setSettingsOpen */}
            <Header colors={colors} setSettingsOpen={setSettingsOpen} customer={customer} />

            <Routes>
              <Route path="/" element={<HeroSection colors={colors} />} />
              <Route
                path="/trackpage/trackShipment/:shipmentId"
                element={<TrackingPage colors={colors} layout={layout} />}
              />
            </Routes>

            <Footer colors={colors} />

            {/* Drawer Component */}
            <CustomDrawer
              open={settingsOpen}
              setOpen={setSettingsOpen} // Function to close drawer
              colors={colors}
              setColors={setColors} // Pass setColors to update theme
              layout={layout}
              setLayout={setLayout} // Pass layout if needed
            />
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
