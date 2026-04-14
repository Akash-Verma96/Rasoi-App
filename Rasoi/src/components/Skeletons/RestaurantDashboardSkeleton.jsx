import React from 'react'

const Skeleton = ({ className }) => {
  return (
    <div className={`bg-gray-200 animate-pulse rounded ${className}`}></div>
  );
};


function RestaurantDashboardSkeleton() {
  return (
    <div className="w-full">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4">
        <Skeleton className="h-8 w-48" />

        <div className="flex gap-3">
          <Skeleton className="h-10 w-28 rounded-lg" />
          <Skeleton className="h-10 w-24 rounded-lg" />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
        {[1, 2, 3].map((_, i) => (
          <div key={i} className="bg-white shadow rounded-xl p-5">
            <Skeleton className="h-4 w-24 mb-3" />
            <Skeleton className="h-8 w-20" />
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white shadow rounded-xl p-6">
        <Skeleton className="h-6 w-40 mb-6" />

        <div className="space-y-4">
          {[1, 2, 3].map((_, i) => (
            <div key={i} className="grid grid-cols-4 gap-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-20" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RestaurantDashboardSkeleton
