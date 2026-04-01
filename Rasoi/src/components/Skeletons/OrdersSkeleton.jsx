import React from "react";

function OrdersSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="bg-white border-orange-100 rounded-2xl shadow-sm p-4 flex items-center justify-between"
        >
          {/* LEFT SIDE */}
          <div className="flex items-center gap-4">
            
            {/* Image */}
            <div className="w-16 h-16 rounded-lg skeleton"></div>

            {/* Text */}
            <div className="space-y-2">
              <div className="h-3 w-32 skeleton rounded"></div>
              <div className="h-3 w-24 skeleton rounded"></div>
              <div className="h-3 w-20 skeleton rounded"></div>
            </div>

          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-4">
            <div className="h-4 w-12 skeleton rounded"></div>
            <div className="w-4 h-4 skeleton rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default OrdersSkeleton