const AdminSkeleton = () => {
  return (
    <div className="flex min-h-screen bg-black text-white">
      
      {/* Sidebar Skeleton */}
      <div className="hidden md:block w-64 bg-[#0f0f0f] p-5 space-y-4">
        <div className="h-6 w-32 bg-gray-800 rounded animate-pulse"></div>

        {[1,2,3,4].map((_,i)=>(
          <div key={i} className="h-10 bg-gray-800 rounded-lg animate-pulse"></div>
        ))}
      </div>

      {/* Main */}
      <div className="flex-1 p-6 w-full">
        
        {/* Topbar */}
        <div className="flex justify-between items-center mb-6">
          <div className="h-6 w-32 bg-gray-800 rounded animate-pulse"></div>
          <div className="h-8 w-8 bg-gray-800 rounded-full animate-pulse"></div>
        </div>

        {/* Stats Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {[1,2,3,4].map((_, i) => (
            <div
              key={i}
              className="bg-[#111] p-5 rounded-xl border border-gray-800"
            >
              <div className="flex justify-between mb-4">
                <div className="h-4 w-20 bg-gray-800 rounded animate-pulse"></div>
                <div className="h-5 w-5 bg-gray-800 rounded-full animate-pulse"></div>
              </div>
              <div className="h-6 w-16 bg-gray-800 rounded animate-pulse"></div>
            </div>
          ))}
        </div>

        {/* Table Skeleton */}
        <div className="bg-[#111] p-6 rounded-xl border border-gray-800">
          <div className="h-5 w-40 bg-gray-800 rounded mb-6 animate-pulse"></div>

          {[1,2,3,4,5].map((_, i) => (
            <div
              key={i}
              className="flex justify-between items-center py-4 border-b border-gray-800"
            >
              <div className="h-4 w-16 bg-gray-800 rounded animate-pulse"></div>
              <div className="h-4 w-24 bg-gray-800 rounded animate-pulse"></div>
              <div className="h-4 w-20 bg-gray-800 rounded animate-pulse"></div>
              <div className="h-4 w-16 bg-gray-800 rounded animate-pulse"></div>
              <div className="h-6 w-20 bg-gray-800 rounded-full animate-pulse"></div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default AdminSkeleton;