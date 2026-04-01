import React from "react";

const OnboardingSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-200 animate-pulse flex flex-col justify-center items-center px-6">

      {/* Title Skeleton */}
      <div className="w-3/4 h-10 bg-gray-300 rounded-lg mb-4"></div>

      {/* Subtitle */}
      <div className="w-2/3 h-4 bg-gray-300 rounded mb-2"></div>
      <div className="w-1/2 h-4 bg-gray-300 rounded mb-6"></div>

      {/* Button */}
      <div className="w-40 h-12 bg-gray-300 rounded-xl"></div>

    </div>
  );
};

export default OnboardingSkeleton;