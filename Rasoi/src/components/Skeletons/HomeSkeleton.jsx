import Skeleton from "react-loading-skeleton";

export default function HomeSkeleton() {
  return (
    <div className="p-4 space-y-6">

      {/* Banner */}
      <Skeleton height={180} borderRadius={12} />

      {/* Categories */}
      <div className="flex gap-4 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} width={80} height={80} borderRadius="50%" />
        ))}
      </div>

      {/* Restaurant Cards */}
      {[...Array(4)].map((_, i) => (
        <div key={i} className="flex gap-4">
          <Skeleton width={100} height={100} borderRadius={10} />
          <div className="flex-1 space-y-2">
            <Skeleton height={20} width="60%" />
            <Skeleton height={15} width="40%" />
            <Skeleton height={15} width="30%" />
          </div>
        </div>
      ))}
      
    </div>
  );
}