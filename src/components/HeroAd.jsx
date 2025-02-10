import React from "react";

function HeroAd({ colors }) {
  return (
    <div className="max-w-lg text-center md:text-left">
      <h1 className="text-6xl font-bold mb-4" style={{ color: colors.textPrimary }}>
        Track your
        <br />
        <span
          style={{
            background: `linear-gradient(99deg, ${colors.textPrimary}, ${colors.secondary})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            display: "inline-block", // Ensures the gradient applies to the text
          }}
        >
          shipment easily
        </span>
      </h1>
      <p className=" =font-semibold mb-2" style={{ color: colors.textPrimary }}>
        Get 25% Off with DLV25
      </p>
      <p className="mb-4" style={{ color: colors.textPrimary }}>
        Download the Delhivery Direct App
      </p>
      <div className="flex gap-4 justify-center md:justify-start">
        <img
          src="https://www.delhivery.com/_nuxt/img/app-link-ios1.ad29378.png"
          alt="Download on App Store"
          className="h-12"
        />
        <img
          src="https://www.delhivery.com/_nuxt/img/app-link1.43932e1.png"
          alt="Get it on Google Play"
          className="h-12"
        />
      </div>
    </div>
  );
}

export default HeroAd;
