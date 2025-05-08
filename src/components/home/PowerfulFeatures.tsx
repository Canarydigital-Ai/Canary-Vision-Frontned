import React from "react";
import FeatureGridImg1 from "../../assets/FeatureGridImg1.png";
import FeatureGridImg2 from "../../assets/FeatureGridImg2.png";
import FeatureGridImg3 from "../../assets/FeatureGridImg3.png";
import FeatureGridImg4 from "../../assets/FeatureGridImg4.png";
import ProfilePhoto from '../../assets/ProfilePhoto.png';

const features = [
  {
    title: "Tagging Scene Elements",
    description: "Automatically tag and categorize elements within any scene.",
    image: FeatureGridImg1,
  },
  {
    title: "Tracking Footfall",
    description: "Monitor and analyze customer footfall in real-time.",
    image: FeatureGridImg2,
  },
  {
    title: "Shelf and Table Tracking",
    description: "Keep track of inventory and table usage effortlessly.",
    image: FeatureGridImg3,
  },
  {
    title: "Real-time Alerts",
    description: "Receive instant alerts for predefined conditions.",
    image: FeatureGridImg4,
  },
];

const PowerfulFeatures: React.FC = () => {
  return (
    <div className="bg-[#080F17] text-[#D6DDE6] px-4 sm:px-8 md:px-12 lg:px-30 py-10">
      <div className="flex items-center justify-center mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[48px] font-bold leading-tight text-center max-w-[600px]">
          Powerful Features for Every Business
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-[#FFFFFF0A] rounded-xl border border-[#FFFFFF1A] flex flex-col justify-between space-y-5"
          >
            <div className="px-10 pt-10 space-y-5">
              <h3 className="text-xl md:text-[28px] font-bold">
                {feature.title}
              </h3>
              <p className="text-sm md:text-xl font-medium text-[#C0C0C0] max-w-[320px]">
                {feature.description}
              </p>
            </div>
            <div className="flex justify-center">
              <img src={feature.image} alt={feature.title} className="" />
            </div>
          </div>
        ))}
      </div>

      <div className="max-w-[75%] mx-auto mt-26 text-[#D6DDE6] flex flex-col items-center space-y-16">
        <h1 className="font-medium text-[64px] text-center leading-[68px]">Canary Eye has transformed our operations, providing invaluable insights and improving efficiency.</h1>

        <div className="flex items-center gap-4">
          <img src={ProfilePhoto} alt="" />
          <div>
            <h2 className="text-lg font-bold">Emilia Hargrove</h2>
            <p>Chief Operations Officer</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PowerfulFeatures;