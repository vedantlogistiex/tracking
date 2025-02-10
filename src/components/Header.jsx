import { Settings, Facebook, Twitter, Instagram } from "@mui/icons-material";
import React, { useState, useEffect } from "react";

function Header({ colors, setSettingsOpen, customer }) {
  const [isDetached, setIsDetached] = useState(false);

  const handleScroll = () => {
    setIsDetached(window.scrollY > 0);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`mx-auto sticky top-0 left-0 right-0 z-50 w-full rounded-lg max-w-7xl px-2 py-4 flex justify-between items-center transition-all duration-500 ease-in-out ${
        isDetached ? "shadow-lg bg-opacity-95" : "bg-transparent"
      }`}
      style={{
        backgroundColor: isDetached ? colors.primary : "transparent",
        transform: isDetached ? "translateY(0)" : "translateY(-10px)",
        transition: "background-color 0.5s ease, transform 0.3s ease",
      }}
    >
      {/* Customer Logo and Name */}
      <a href={customer?.website || "https://www.logistiex.com/"} className="flex items-center space-x-2">
        <img
          src={customer?.logo || "https://www.logistiex.com/icons/BlackFontLogistiex.png"}
          alt="Customer Logo"
          className="h-auto w-32"
        />
      </a>

      {/* Settings Button */}
      <button
        onClick={() => setSettingsOpen(true)}
        className="p-2 rounded hover:opacity-90"
        style={{ backgroundColor: colors.secondary, color: colors.primary }}
      >
        <Settings />
      </button>

      {/* Contact Us Button with Social Media Icons */}
      <div className="flex items-center space-x-3">
        <a
          href="https://www.logistiex.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full hover:opacity-90 transition-all duration-300 ease-in-out"
          style={{ backgroundColor: colors.secondary, color: colors.primary }}
        >
          CONTACT US
        </a>
        <a href={customer?.socialLinks?.facebook} target="_blank" rel="noopener noreferrer">
          <Facebook style={{ color: colors.secondary }} />
        </a>
        <a href={customer?.socialLinks?.twitter} target="_blank" rel="noopener noreferrer">
          <Twitter style={{ color: colors.secondary }} />
        </a>
        <a href={customer?.socialLinks?.instagram} target="_blank" rel="noopener noreferrer">
          <Instagram style={{ color: colors.secondary }} />
        </a>
      </div>
    </div>
  );
}

export default Header;
