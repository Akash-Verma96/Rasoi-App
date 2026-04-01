import Skeleton from "react-loading-skeleton";

export default function HomeSkeleton() {
  return (
    <div className="px-4 py-8 max-w-7xl mx-auto">
      {/* Title */}
      <div className="h-5 w-32 mb-6 skeleton rounded"></div>

      {/* Masonry Grid */}
      <div className="columns-2 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="break-inside-avoid rounded-2xl overflow-hidden shadow-md"
          >
            {/* Image */}
            <div className="w-full h-48 skeleton"></div>

            {/* Content */}
            <div className="p-4 space-y-3">
              <div className="h-4 w-24 skeleton rounded"></div>
              <div className="h-4 w-16 skeleton rounded"></div>

              <div className="flex justify-between items-center mt-3">
                <div className="h-5 w-14 skeleton rounded"></div>
                <div className="h-6 w-20 skeleton rounded-lg"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}