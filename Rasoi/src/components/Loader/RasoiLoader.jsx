import React from "react";

const RasoiLoader = (props) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/85 rounded-3xl backdrop-blur-3xl z-50">
      
      <div className="flex flex-col items-center gap-6">

        {/* Loader */}
        <div className="relative flex items-center justify-center">

          {/* Glow */}
          <div className="absolute w-32 h-32 rounded-full bg-orange-500/20 blur-2xl animate-pulse"></div>

          {/* Spinning Ring */}
          <div className="absolute w-28 h-28 border-[3px] border-orange-500/30 border-t-orange-500 rounded-full animate-spin"></div>

          {/* Inner Plate */}
          <div className="w-20 h-20 rounded-full bg-linear-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-lg">
            <div className="w-4 h-4 bg-white rounded-full animate-ping"></div>
          </div>

          {/* Custom Slow Spin (INLINE STYLE) */}
          <div
            className="absolute w-full h-full"
            style={{
              animation: "spin 6s linear infinite",
            }}
          >
            <span className="absolute top-0 left-1/2 w-2 h-2 bg-orange-300 rounded-full"></span>
            <span className="absolute bottom-0 left-1/2 w-2 h-2 bg-orange-400 rounded-full"></span>
            <span className="absolute left-0 top-1/2 w-2 h-2 bg-orange-200 rounded-full"></span>
            <span className="absolute right-0 top-1/2 w-2 h-2 bg-orange-500 rounded-full"></span>
          </div>

        </div>

        {/* Text */}
        <div className="text-center">
          <h1 className="text-orange-400 text-xl font-semibold animate-pulse">
           {props.featuredText}
          </h1>
          <p className="text-gray-400 text-sm">
            {props.description}
          </p>
        </div>

      </div>
    </div>
  );
};

export default RasoiLoader;