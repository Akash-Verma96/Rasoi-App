import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../utils/constant";
import { XCircle } from "lucide-react";
import { Link } from "react-router-dom";

const MealDetail = () => {
  const [meal, setMeal] = useState({});
  const { mealId } = useParams();
  const [quantity, setQuantity] = useState(1);

  const fetchMeal = async () => {
    try {
      const res = await axios.get(BASE_URL + "/mealDetail/" + mealId, {
        withCredentials: true,
      });
      setMeal(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMeal();
  }, []);

  const handleAddToCart = async () => {
    try {
      const res = await axios.post(BASE_URL + "/mealDetail/" + mealId,{
        quantity
      },{withCredentials:true});

      alert("Meal Added Successfully !")
    } catch (error) {
      console.log(error.message)
    }
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  return (
    <div className="min-h-screen flex justify-center items-center p-3 sm:p-4">
      <div className="max-w-5xl w-full max-h-130 bg-white/90 rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row relative">
        {/* Close Button */}
        <Link to={"/"} className="absolute top-3 right-3">
          <XCircle
            size={26}
            className="hover:scale-110 text-orange-300 duration-200 hover:text-orange-500"
          />
        </Link>

        {/* Image Section */}
        <div className="w-full md:w-1/2">
          <img
            src={meal.image}
            alt={meal.name}
            className="w-full h-52 sm:h-64 md:h-full object-cover"
          />
        </div>

        {/* Content Section */}
        <div className="w-full md:w-1/2 p-4 sm:p-6 flex flex-col justify-between">
          <div>
            <span className="text-xs sm:text-sm bg-orange-100 text-orange-600 px-3 py-1 rounded-full">
              {meal.category}
            </span>

            <h1 className="text-2xl sm:text-3xl font-bold mt-3 text-gray-800">
              {meal.name}
            </h1>

            <p className="text-gray-600 mt-3 sm:mt-4 leading-relaxed text-sm sm:text-base">
              {meal.description}
            </p>

            <div className="flex items-center mt-4 gap-4 flex-wrap">
              <span className="text-yellow-500 font-semibold text-sm sm:text-base">
                ⭐⭐⭐⭐ 
              </span>

              <span className="text-xl sm:text-2xl font-bold text-orange-500">
                ₹{meal.price}
              </span>
            </div>
          </div>

          <div>
            {/* Button */}
            
            <div className="w-20 text-xs sm:text-sm bg-orange-100 text-orange-600 px-3 my-2 sm:my-3 rounded-full">
              Quantity
            </div>
            {/* + - Controls */}
            <div className="flex items-center justify-between bg-orange-50 rounded-lg px-2 py-1">
              
              <button
                onClick={handleDecrement}
                className="w-7 h-7 flex items-center justify-center
                      bg-white rounded-full shadow text-orange-500 font-bold hover:bg-orange-100"
              >
                −
              </button>

              <span className="text-sm text-orange-400 font-semibold">
                {quantity}
              </span>

              <button
                onClick={handleIncrement}
                className="w-7 h-7 flex items-center justify-center
                      bg-white rounded-full shadow text-orange-500 font-bold hover:bg-orange-100"
              >
                +
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className="mt-6 w-full cursor-pointer bg-orange-400 hover:bg-orange-500 text-white font-semibold py-3 rounded-xl transition duration-300 disabled:bg-gray-500"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealDetail;
