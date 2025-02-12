import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
// import notFoundAnimation from "/not-found.lottie";
const NoPage = ({ colors }) => {
  const [animationData, setAnimationData] = useState(null);

  // Fetch Lottie JSON dynamically
  useEffect(() => {
    fetch("/404.json")
      .then((res) => res.json())
      .then((data) => setAnimationData(data))
      .catch((err) => console.error("Failed to load Lottie animation:", err));
  }, []);

  return (
    <main className="grid max-w-7xl mx-auto min-h-[100vh] place-items-center py-8">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Render only if animation data is available */}
        {animationData ? (
          <div className="mx-auto">
            <Lottie animationData={animationData} loop />
          </div>
        ) : (
          <p className="text-gray-500">Loading animation...</p>
        )}

        <motion.h1
          className="lg:text-5xl sm:text-6xl font-bold leading-tight"
          style={{
            backgroundImage: `linear-gradient(99deg, ${colors.textPrimary}, ${colors.secondary})`,
            WebkitBackgroundClip: "text",
            color: "transparent",
            display: "inline-block",
          }}
          initial={{ backgroundPosition: "200% 0" }}
          animate={{ backgroundPosition: "-200% 0" }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        >
          Page not found
        </motion.h1>

        <motion.p
          className="mt-2 text-base leading-7"
          style={{ color: colors.textPrimary }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.7 }}
        >
          Sorry, we couldn’t find the page you’re looking for.
        </motion.p>

        <div className="mt-4 flex items-center justify-center gap-x-6">
          <motion.a
            href="/"
            className="rounded-md px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm"
            style={{ backgroundColor: colors.secondary }}
            whileHover={{ scale: 1.05, boxShadow: "0px 4px 15px rgba(0,0,0,0.2)" }}
            whileTap={{ scale: 0.95 }}
          >
            Go back home
          </motion.a>

          <motion.a
            href="/"
            className="text-sm font-semibold"
            style={{ color: colors.textPrimary }}
            whileHover={{ scale: 1.05 }}
          >
            Contact support <span aria-hidden="true">&rarr;</span>
          </motion.a>
        </div>
      </motion.div>
    </main>
  );
};

export default NoPage;
