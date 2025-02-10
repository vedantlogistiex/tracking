import React from "react";

const Loader = ({ colors }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center" style={{ backgroundColor: colors.primary }}>
      <div className="flex flex-col items-center space-y-4">
        <svg
          className="animate-spin h-12 w-12 "
          style={{
            color: colors.secondary,
          }}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
        </svg>
        <p className="text-lg font-semibold" style={{ color: colors.textPrimary }}>
          Loading...
        </p>
      </div>
    </div>
  );
};

export default Loader;
