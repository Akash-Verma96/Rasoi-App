import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/constant";

function RestaurantProfile() {
  const [form, setForm] = useState({
    restaurantName: "",
    description: "",
    address: "",
    state: "",
    city: "",
    pincode: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      

      const res = await axios.post(BASE_URL + "/restaurant/Profile",
        form,
        {withCredentials:true});


      alert("Data saved successfully !");
      navigate("/restaurant/Dashboard");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-r from-orange-500 via-orange-600 to-red-500 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-6 md:p-8">

        <h1 className="text-2xl md:text-3xl font-bold text-orange-500 mb-6 text-center">
          Setup Your Restaurant 🍊
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5 text-gray-700">

          {/* Restaurant Name */}
          <div>
            <label className="block mb-1 font-medium">Restaurant Name</label>
            <input
              type="text"
              name="restaurantName"
              value={form.restaurantName}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl focus:outline-orange-400"
              required
              placeholder="restaurant name"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1 font-medium">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="description"
              className="w-full border p-3 rounded-xl focus:outline-orange-400"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block mb-1 font-medium">Full Address</label>
            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl focus:outline-orange-400"
              placeholder="Street, Area"
              required
            />
          </div>

          {/* State */}
          <div>
            <label className="block mb-1 font-medium">State</label>
            <input
              type="text"
              name="state"
              value={form.state}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl focus:outline-orange-400"
              placeholder="Uttar Pradesh"
            />
          </div>

          {/* City + Pincode */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium">City</label>
              <input
                type="text"
                name="city"
                value={form.city}
                onChange={handleChange}
                className="w-full border p-3 rounded-xl focus:outline-orange-400"
                required
                placeholder="city"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Pincode</label>
              <input
                type="number"
                name="pincode"
                value={form.pincode}
                onChange={handleChange}
                className="w-full border p-3 rounded-xl focus:outline-orange-400"
                required
                placeholder="pincode"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold transition duration-200 shadow-md hover:scale-105"
          >
            Save & Continue 🚀
          </button>

        </form>
      </div>
    </div>
  );
}

export default RestaurantProfile;