import React from "react";

const MealDetailSkeleton = () => {
  return (
    <div className="min-h-screen flex justify-center items-center p-3 sm:p-4">
      <div className="max-w-5xl w-full max-h-130 bg-white/90 rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row animate-pulse">
        
        {/* Image Skeleton */}
        <div className="w-full md:w-1/2 bg-gray-300 h-52 sm:h-64 md:h-full"></div>

        {/* Content Skeleton */}
        <div className="w-full md:w-1/2 p-4 sm:p-6 flex flex-col justify-between">
          <div>
            {/* Category */}
            <div className="w-24 h-6 bg-gray-300 rounded-full"></div>

            {/* Title */}
            <div className="mt-4 h-6 bg-gray-300 rounded w-3/4"></div>
            <div className="mt-2 h-6 bg-gray-300 rounded w-1/2"></div>

            {/* Description */}
            <div className="mt-4 space-y-2">
              <div className="h-3 bg-gray-300 rounded"></div>
              <div className="h-3 bg-gray-300 rounded w-5/6"></div>
              <div className="h-3 bg-gray-300 rounded w-4/6"></div>
            </div>

            {/* Rating + Price */}
            <div className="flex items-center mt-4 gap-4">
              <div className="h-4 w-20 bg-gray-300 rounded"></div>
              <div className="h-6 w-16 bg-gray-300 rounded"></div>
            </div>
          </div>

          {/* Bottom Section */}
          <div>
            {/* Quantity Label */}
            <div className="w-20 h-5 bg-gray-300 rounded-full mt-4"></div>

            {/* Quantity Box */}
            <div className="flex items-center justify-between bg-gray-200 rounded-lg px-2 py-2 mt-2">
              <div className="w-7 h-7 bg-gray-300 rounded-full"></div>
              <div className="w-6 h-4 bg-gray-300 rounded"></div>
              <div className="w-7 h-7 bg-gray-300 rounded-full"></div>
            </div>

            {/* Button */}
            <div className="mt-6 w-full h-12 bg-gray-300 rounded-xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealDetailSkeleton;