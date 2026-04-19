import React from "react";

function CartSkeleton() {
  return (
    <div className="flex flex-col xl:flex-row gap-8 my-5 mx-5">
      
      {/* Cart Items Skeleton */}
      <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 flex-1">
        
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="bg-black  rounded-xl shadow border border-orange-100 overflow-hidden"
          >
            {/* Image */}
            <div className="w-full h-28 sm:h-32 md:h-36 skeleton"></div>

            {/* Content */}
            <div className="p-3 space-y-2">
              
              {/* Title */}
              <div className="h-3 w-3/4 skeleton rounded"></div>

              {/* Price */}
              <div className="h-3 w-1/3 skeleton rounded"></div>

              {/* Quantity */}
              <div className="h-6 w-full skeleton rounded-full"></div>

              {/* Buttons */}
              <div className="flex gap-2">
                <div className="h-6 w-6 rounded-full skeleton"></div>
                <div className="h-6 w-6 rounded-full skeleton"></div>
              </div>

            </div>
          </div>
        ))}

      </div>

      {/* Summary Skeleton */}
      <div className="w-full xl:w-80 bg-black rounded-xl shadow-md p-5 border border-orange-100 h-fit space-y-4">
        
        <div className="h-4 w-1/2 skeleton rounded"></div>

        <div className="h-10 w-full skeleton rounded"></div>

        <div className="h-10 w-full skeleton rounded"></div>

        <div className="h-5 w-full skeleton rounded"></div>

        <div className="h-10 w-full skeleton rounded-lg"></div>

      </div>

    </div>
  );
}

export default CartSkeleton;