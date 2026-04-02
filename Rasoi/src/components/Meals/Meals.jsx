import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../utils/constant";
import HomeSkeleton from "../Skeletons/HomeSkeleton";



function Meals() {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  

  const fetchMeals = async () => {
    try {
      const res = await axios.get(BASE_URL, { withCredentials: true });
      console.log(res.data);
      setMeals(res.data);
    } catch (error) {
      console.log(error);
    }
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeals();
  }, []);

  return (
    <>
      {loading ? (
        <HomeSkeleton />
      ) : (
        <div className="px-4 py-8 max-w-7xl mx-auto">
      <h2 className="text-lg sm:text-xl font-semibold text-orange-400 mb-4">
        Meals 🔥
      </h2>

      <div className="columns-2 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">
        {meals.map((meal) => (
          <div
            key={meal._id}
            className="break-inside-avoid group relative rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300"
          >
            {/* Image */}
            <img
              src={meal.image}
              alt={meal.name}
              className="w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />

            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent opacity-90" />

            {/* Content */}
            <div className="absolute bottom-0 p-4 text-white w-full">
              <h2 className="text-lg font-semibold mb-2">
                <span className="relative inline-block">
                  <span className="absolute inset-0 bg-orange-500/40 -rotate-2 rounded-md"></span>
                  <span className="relative px-2 py-1 text-white">{meal.name}</span>
                </span>
              </h2>

              <div className="flex items-center justify-between mt-2">
                <span className="relative inline-block font-bold text-xl">
                  <span className="absolute inset-0 bg-black/70 -rotate-1 rounded-md"></span>
                  <span className="relative px-3 py-1 text-orange-400">
                    ₹{meal.price}
                  </span>
                </span>

                <Link
                  to={`mealDetail/${meal._id}`}
                  className="bg-orange-500 hover:bg-orange-600 text-white text-sm px-3 py-1 rounded-lg transition duration-300"
                >
                  Order
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
      )
      }
    </>
  );
}

export default Meals;
