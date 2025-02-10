import React from "react";

function Footer({ colors }) {
  return (
    <div className="p-6 text-center rounded-t-lg" style={{ backgroundColor: colors.secondary }}>
      <p style={{ color: colors.tertiary }}>
        &copy; Powered by{" "}
        <a
          href="https://www.logistiex.com/"
          style={{ textDecoration: "underline" }}
          target="_blank"
          rel="noopener noreferrer"
        >
          Noetic Logistiex
        </a>
        .
      </p>
    </div>
  );
}

export default Footer;
