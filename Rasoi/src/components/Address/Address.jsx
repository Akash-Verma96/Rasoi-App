import React, { useState } from "react";
import { MapPin, CreditCard } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAddress } from "../../utils/orderSlice";

export default function Address() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: ""
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, phone, address, city, state, pincode } = form;

    if (!name || !phone || !address || !city || !state || !pincode) {
      alert("⚠️ Please fill all required fields (*)");
      return;
    }
    
    dispatch(setAddress(form));
    return navigate('/payment');
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-orange-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white shadow-xl rounded-2xl p-5 sm:p-6 md:p-10">

        {/* Stepper */}
        <div className="flex items-center justify-between mb-8 md:mb-10">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="bg-orange-500 text-white p-2 sm:p-3 rounded-full">
              <MapPin size={18} />
            </div>
            <p className="font-semibold text-orange-500 text-sm sm:text-base">Address</p>
          </div>

          <div className="flex-1 h-0.5 bg-orange-200 mx-2 sm:mx-4 relative">
            <div className="absolute left-0 top-0 h-0.5 w-1/2 bg-orange-500"></div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 opacity-50">
            <div className="bg-gray-200 p-2 sm:p-3 rounded-full">
              <CreditCard size={18} />
            </div>
            <p className="font-semibold text-gray-400 text-sm sm:text-base">Payment</p>
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-6">
          Delivery Address
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">

          {/* Name */}
          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 text-gray-800 bg-white rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number *
            </label>
            <input
              type="text"
              name="phone"
              placeholder="Enter phone number"
              value={form.phone}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 text-gray-800 bg-white rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {/* Pincode */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Pincode *
            </label>
            <input
              type="text"
              name="pincode"
              placeholder="Enter pincode"
              value={form.pincode}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 text-gray-800 bg-white rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {/* Address */}
          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Address *
            </label>
            <textarea
              name="address"
              placeholder="House no, street, area..."
              value={form.address}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 text-gray-800 bg-white rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {/* City */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              City *
            </label>
            <input
              type="text"
              name="city"
              placeholder="Enter city"
              value={form.city}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 text-gray-800 bg-white rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {/* State */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              State *
            </label>
            <input
              type="text"
              name="state"
              placeholder="Enter state"
              value={form.state}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 text-gray-800 bg-white rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="col-span-1 md:col-span-2 mt-4 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl text-base sm:text-lg font-semibold transition duration-200 shadow-md hover:shadow-lg"
          >
            Continue to Payment →
          </button>
        </form>
      </div>
    </div>
  );
}