import { useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children, colors, setSettingsOpen, customer }) => {
  const location = useLocation();

  // Determine if we should show header/footer based on current route
  const showHeaderFooter = location.pathname === "/" || location.pathname.startsWith("/trackpage/trackShipment/");

//   console.log("Current Path:", location.pathname); // Debugging
//   console.log("Should Hide Header/Footer:", hideHeaderFooter); // Debugging

  return (
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
          {/* Conditionally render Header & Footer */}
          {showHeaderFooter && <Header colors={colors} setSettingsOpen={setSettingsOpen} customer={customer} />}
          {children}
          {showHeaderFooter && <Footer colors={colors} />}
        </div>
      </div>
    </div>
  );
};

export default Layout;
