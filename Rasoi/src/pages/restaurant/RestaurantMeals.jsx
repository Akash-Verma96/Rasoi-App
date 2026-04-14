import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/constant";
import { useSelector } from 'react-redux'
import { settotalMeals } from "../../utils/restaurantSlice";

function RestaurantMeals() {
  const [meals, setMeals] = useState([]);
  // const [loading, setloading] = useState(true);
  const mealData = useSelector((store) => store.restaurant.totalMeals);



  useEffect(() => {
    setMeals(mealData[0]);
  }, []);

  

  return (
    <div className="w-full bg-orange-50 p-4 md:p-6 min-h-screen">
      
      {/* Heading */}
      <h1 className="text-2xl md:text-3xl font-bold text-orange-600 mb-6">
        Your Meals
      </h1>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
        {!meals || meals.length === 0 ? (<div className="text-gray-600" >No Meals Found !</div>) :
        (meals.map((meal) => (
          
          <div
            key={meal._id}
            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300"
          >
            
            {/* Image */}
            <img
              src={meal.image}
              alt={meal.name}
              className="w-full h-40 object-cover"
            />

            {/* Content */}
            <div className="p-4">
              
              <h2 className="text-lg md:text-xl font-semibold text-gray-800">
                {meal.name}
              </h2>

              <p className="text-sm text-gray-500">
                {meal.category}
              </p>

              {/* Bottom Section */}
              <div className="flex items-center justify-between mt-4">
                
                <span className="text-base md:text-lg font-bold text-orange-600">
                  ₹{meal.price}
                </span>

                <div className="flex gap-2">
                  <button className="px-2 md:px-3 py-1 text-xs md:text-sm bg-orange-500 text-white rounded-lg hover:bg-orange-600">
                    Edit
                  </button>

                  <button className="px-2 md:px-3 py-1 text-xs md:text-sm bg-red-500 text-white rounded-lg hover:bg-red-600">
                    Delete
                  </button>
                </div>

              </div>
            </div>

          </div>
        )))
        }
      </div>
    </div>
  );
}

export default RestaurantMeals;