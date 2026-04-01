import React, { useState, useEffect } from "react";
import { BASE_URL, cartAddedMeal } from "../../utils/constant";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {useDispatch } from "react-redux";
import { addItems, setDeliveryCharge, setItemsPrice, setTotalPrice} from "../../utils/orderSlice";
import CartSkeleton from "../Skeletons/CartSkeleton"

function Cart() {
  const [meals, setMeal] = useState([]);
  const [amount, setAmount] = useState(0);
  const [loading,setloading] = useState(true);
  const dispatch = useDispatch();
  
  const navigate = useNavigate();

  const fetchMeal = async () => {

    try {
      const res = await axios.get(BASE_URL + "/cart", {
        withCredentials: true,
      });

      setMeal(res.data.items || []);
    } catch (error) {
      console.log(error);
    }
    finally {
      setloading(false);
    }
  };

  useEffect(() => {
    fetchMeal();
  }, []);

  const handleDelete = async (mealId) => {
    try {
      const res = await axios.delete(BASE_URL + "/cart/" + mealId, {
        withCredentials: true,
      });

      setMeal((prev) => prev.filter((meal) => meal.meal._id !== mealId));
    } catch (error) {
      console.log(error.message);
    }
  };

  const totalAmount = () => {
    let a = 0;
    meals.map((m) => {
      a += m.meal.price * m.quantity;
    });

    setAmount(a);
  };

  useEffect(() => {
    totalAmount();
  }, [meals]);

  const handleSuccess = () => {

    dispatch(addItems(meals));
    dispatch(setItemsPrice(amount));
    dispatch(setDeliveryCharge(amount));
    dispatch(setTotalPrice(amount));

    return navigate('/address')
  };

  const handleIncrement = () => {};

  const handleDecrement = () => {};

  if(loading) return <CartSkeleton />

  return (
    <div className="relative w-full min-h-screen px-3 sm:px-6 py-8">
      {/* Success Modal */}
      

      {/* Heading */}
      <h2 className="text-xl sm:text-2xl font-bold text-orange-500 mb-6">
        Your Cart 🔥
      </h2>

      {/* Empty Cart */}
      {meals.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center gap-4">
          <p className="text-gray-500 text-lg sm:text-xl font-semibold">
            No meals found in your cart 🍽️
          </p>

          <Link
            to="/"
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold transition"
          >
            Browse Meals 🛒
          </Link>
        </div>
      ) : (
        <div className="flex flex-col xl:flex-row gap-8">
          {/* Cart Items */}
          <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 flex-1">
            {meals
            .map((meal) => {

              return (
                <div
                  key={meal.meal._id}
                  className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden group border border-orange-100"
                >
                  {/* Image */}
                  <div className="w-full h-28 sm:h-32 md:h-36 overflow-hidden">
                    <img
                      src={`${BASE_URL}/${meal.meal.image}`}
                      alt={meal.meal.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-3">
                    <div className="flex justify-between items-center">
                      <h3 className="text-gray-800 font-semibold text-sm truncate">
                        {meal.meal.name}
                      </h3>
                      <button
                        onClick={() => handleDelete(meal.meal._id)}
                        className="text-white text-sm hover:scale-110 duration-200 hover:bg-orange-500 bg-orange-400 px-1 rounded-2xl"
                      >
                        delete
                      </button>
                    </div>

                    <p className="text-orange-500 font-bold text-sm mt-1">
                      {`${meal.meal.price} Rs`}
                    </p>

                    <div className="sm:flex justify-between items-center mt-3 ">
                      <span className="text-xs sm:text-sm bg-orange-100 text-orange-600 px-3 py-1 rounded-full">
                        {`Quantity : ${meal.quantity}`}
                      </span>
                      <div className="flex items-center justify-between mt-2 sm:mt-0 gap-3 px-1 py-1 bg-orange-50 rounded-full ">
                        <button
                          onClick={handleDecrement}
                          className="w-6 h-6 flex items-center  justify-center
                      bg-white rounded-full shadow text-orange-500 font-bold hover:bg-orange-100"
                        >
                          −
                        </button>

                        <button
                          onClick={handleIncrement}
                          className="w-6 h-6 flex items-center justify-center
                      bg-white rounded-full shadow text-orange-500 font-bold hover:bg-orange-100"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Cart Summary */}
          <div className="w-full xl:w-80 bg-white rounded-xl shadow-md p-5 border border-orange-100 h-fit">
            <h3 className="text-lg font-semibold text-orange-500 mb-4">
              Order Summary
            </h3>

            <div className="bg-orange-100 text-orange-700 text-xs sm:text-sm rounded-lg p-2 mb-4">
              🎉 Get 10% OFF on orders above ₹499
            </div>

            <div className="flex gap-2 mb-5">
              <input
                type="text"
                placeholder="Coupon Code"
                className="flex-1 border border-orange-200 rounded-md px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
              />

              <button className="bg-orange-500 text-white px-3 py-2 rounded-md text-sm hover:bg-orange-600">
                Apply
              </button>
            </div>

            <div className="flex justify-between font-semibold text-base mb-5">
              <span className="text-orange-400 font-bold text-base">Total</span>

              <span className="text-orange-500">₹{amount}</span>
            </div>

            <button
              onClick={handleSuccess}
              className="w-full cursor-pointer bg-orange-500 text-white py-2.5 rounded-lg font-semibold hover:bg-orange-600 transition"
            >
              Buy Now 🚀
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
