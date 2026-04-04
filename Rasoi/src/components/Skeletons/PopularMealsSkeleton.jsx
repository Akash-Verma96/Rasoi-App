import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function PopularMealsSkeleton() {
  return (
    <section className="w-full px-4">
      
      {/* Title */}
      <h2 className="text-lg sm:text-xl font-semibold text-orange-400 mb-4">
        <Skeleton width={150} height={20} />
      </h2>

      {/* Scroll Container */}
      <div className="flex gap-4 overflow-x-auto hide-scrollbar scroll-smooth p-4">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="flex flex-col sm:flex-row gap-3
            min-w-65 sm:min-w-[320px] md:min-w-90
            bg-white/10 backdrop-blur-lg
            border border-orange-400/30
            rounded-2xl p-4"
          >
            
            {/* Image */}
            <Skeleton
              className="w-full sm:w-32 h-40 sm:h-32 rounded-xl"
            />

            {/* Content */}
            <div className="flex flex-col justify-between flex-1 w-full">
              
              <div className="space-y-2">
                <Skeleton height={18} width="70%" />
                <Skeleton height={14} width="90%" />
                <Skeleton height={14} width="60%" />
              </div>

              {/* Button */}
              <Skeleton
                height={35}
                width={120}
                className="mt-3 sm:mt-2 rounded-xl"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}