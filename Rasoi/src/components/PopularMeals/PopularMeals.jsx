import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/constant";
import PopularMealsSkeleton from "../Skeletons/PopularMealsSkeleton";


function PopularMeals() {
  const [popularMeals,setPopularMeals] = useState([]);
  const [loading,setLoading] = useState(true);
  const navigate = useNavigate();

    const fetchMeals = async () => {
    try {
      const res = await axios.get(BASE_URL, { withCredentials: true });
      
      setPopularMeals(res.data);
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

  if(loading) return <PopularMealsSkeleton />

 
  return (
    <section className="w-full px-4">
      
      <h2 className="text-lg sm:text-xl font-semibold text-orange-400 mb-4">
        Popular Meals 🔥
      </h2>

      {/* Scroll Container */}
      <div className="flex gap-4 overflow-x-auto hide-scrollbar scroll-smooth p-4">
        {popularMeals.map((meal) => (
          <div
            key={meal._id}
            className="flex flex-col sm:flex-row gap-3
            min-w-65 sm:min-w-[320px] md:min-w-90
            bg-white/10 backdrop-blur-lg
            border border-orange-400/30
            rounded-2xl p-4
            shadow-[0_0_15px_rgba(255,140,0,0.3)]
            hover:shadow-[0_0_25px_rgba(255,140,0,0.6)]
            transition duration-300 hover:scale-105"
          >
            
            {/* Image */}
            <img
              src={`${meal.image}?w=500&auto=format&fit=crop`}
              alt={meal.name}
              className="w-full sm:w-32 h-40 sm:h-32 object-cover rounded-xl"
            />

            {/* Content */}
            <div className="flex flex-col justify-between flex-1">
              
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-white">
                  {meal.name}
                </h3>

                <p className="text-xs sm:text-sm text-orange-200 line-clamp-2 mt-1">
                  {meal.description}
                </p>
              </div>

              <Link
                to={`mealDetail/${meal._id}`}
                className="mt-3 sm:mt-2 w-full sm:w-auto px-4 py-2 rounded-xl 
                bg-orange-500 text-white font-medium
                hover:bg-orange-600
                hover:shadow-[0_0_12px_rgba(255,140,0,0.8)]
                transition"
              >
                Order Now
              </Link>

            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default PopularMeals;