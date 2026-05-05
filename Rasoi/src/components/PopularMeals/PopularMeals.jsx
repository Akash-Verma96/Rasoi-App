import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/constant";
import PopularMealsSkeleton from "../Skeletons/PopularMealsSkeleton";
import {toast} from "react-toastify"

// const restaurants = [
//   {
//     _id: "1",
//     name: "Spice Garden",
//     location: "Sector 18, Noida",
//     tagline: "Serving happiness with every bite ✨",
//     rating: 4.3,
//     deliveryTime: "30-40 min",
//   },
//   {
//     _id: "2",
//     name: "Urban Tadka",
//     location: "Connaught Place, Delhi",
//     tagline: "Where taste meets comfort 🍲",
//     rating: 4.1,
//     deliveryTime: "25-35 min",
//   },
//   {
//     _id: "3",
//     name: "Biryani Blues",
//     location: "Lajpat Nagar, Delhi",
//     tagline: "Crafted with love, served hot 🔥",
//     rating: 4.5,
//     deliveryTime: "35-45 min",
//   },
//   {
//     _id: "4",
//     name: "The Food Hub",
//     location: "Karol Bagh, Delhi",
//     tagline: "Good food. Good mood. Always 😌",
//     rating: 4.0,
//     deliveryTime: "20-30 min",
//   },
//   {
//     _id: "5",
//     name: "Desi Flavours",
//     location: "Rohini, Delhi",
//     tagline: "A place you'll keep coming back to ❤️",
//     rating: 4.2,
//     deliveryTime: "30 min",
//   },
//   {
//     _id: "6",
//     name: "Tandoori Nights",
//     location: "Janakpuri, Delhi",
//     tagline: "Smoky flavors that hit different 🔥",
//     rating: 4.4,
//     deliveryTime: "40 min",
//   },
//   {
//     _id: "7",
//     name: "Street Zaika",
//     location: "Chandni Chowk, Delhi",
//     tagline: "Authentic street taste, modern vibe 😎",
//     rating: 4.3,
//     deliveryTime: "20 min",
//   },
//   {
//     _id: "8",
//     name: "The Food Hub",
//     location: "Karol Bagh, Delhi",
//     tagline: "Good food. Good mood. Always 😌",
//     rating: 4.0,
//     deliveryTime: "20-30 min",
//   }
// ];

function PopularMeals() {
  const [popularMeals, setPopularMeals] = useState([]);
  const [restaurants,setRestaurant] = useState([]);
  const [loading, setLoading] = useState(true);
  

  const navigate = useNavigate();

  const fetchMeals = async () => {
    try {
      const mealData = await axios.get(BASE_URL, { withCredentials: true });

      setPopularMeals(mealData.data);
      const restaurantData = await axios.get(BASE_URL + "/home", {withCredentials: true});

      setRestaurant(restaurantData.data);
    } catch (err) {
      toast.error(err?.response?.data, {
        position: "top-right",
        autoClose: 2000,
        theme: "dark",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeals();
  }, []);

  if (loading) return <PopularMealsSkeleton />;

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


      <h2 className="text-lg sm:text-xl font-semibold text-orange-400 ">
  Popular Restaurants 🍽️
</h2>

{/* Scroll Container */}

<div className="flex flex-nowrap gap-4 overflow-x-auto hide-scrollbar scroll-smooth px-4 py-3">
  {restaurants.map((restaurant) => (
    <div
      key={restaurant._id}
      className="
      min-w-65 sm:min-w-75
      bg-gray-950 rounded-2xl px-4 py-3
      border border-gray-800
      shadow-sm hover:shadow-md
      transition duration-300 hover:-translate-y-1
      flex items-center justify-between
      "
    >
      {/* Left Content */}
      <div>
        <h3 className="text-sm sm:text-base font-semibold text-white">
          {restaurant.restaurantName}
        </h3>

        <p className="text-xs text-gray-400 mt-1">
          📍 {restaurant.address}
        </p>
      </div>

      {/* CTA */}
      <Link
        to={`restaurant/${restaurant._id}`}
        className="text-xs sm:text-sm font-medium text-orange-500 hover:text-orange-600 whitespace-nowrap"
      >
        View →
      </Link>
    </div>
  ))}
</div>


      
    </section>
  );
}

export default PopularMeals;
