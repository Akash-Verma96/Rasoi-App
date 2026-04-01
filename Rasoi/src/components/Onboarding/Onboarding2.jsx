import React from "react";
import { Link, useNavigate } from "react-router-dom";


const Onboarding2 = () => {
  const navigate = useNavigate();

  

  return (
    <div className="min-h-screen flex items-center justify-center  px-6">
      <div className="grid md:grid-cols-2 gap-8 max-w-5xl w-full">

        {/* Customer Card */}
        <Link
          to={"/login"}
          className="cursor-pointer bg-orange-400 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 transition duration-300"
        >
          <img
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836"
            alt="Customer ordering food"
            className="w-full h-52 object-cover"
          />

          <div className="p-6 text-center">
            <h2 className="text-2xl font-bold text-white mb-2">
              Customer
            </h2>

            <p className="text-white">
              Explore restaurants, order delicious food, and track your meals
              easily.
            </p>
          </div>
        </Link>

        {/* Restaurant Card */}
        <div
          onClick={() => navigate("/restaurant/Dashboard")}
          className="cursor-pointer bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 transition duration-300"
        >
          <img
            src="https://images.unsplash.com/photo-1555992336-03a23c7b20ee"
            alt="Restaurant dashboard"
            className="w-full h-52 object-cover"
          />

          <div className="p-6 text-center">
            <h2 className="text-2xl font-bold text-orange-500 mb-2">
              Restaurant
            </h2>

            <p className="text-gray-600">
              Manage your menu, receive orders, and grow your restaurant
              business.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Onboarding2;