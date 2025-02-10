import HeroAd from "./HeroAd";
import TrackingForm from "./TrackingForm";

const HeroSection = ({ colors }) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto min-h-[calc(90vh)]">
      {/* Left Section */}
      <HeroAd colors={colors} />

      {/* Right Section */}
      <TrackingForm colors={colors} />
    </div>
  );
};

export default HeroSection;
