import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/constant";

function RestaurantSetting() {
  const [form, setForm] = useState({
    restaurantName: "",
    email: "",
    phone: "",
    address: "",
  });

  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(
        BASE_URL + "/restaurant/profile",
        { withCredentials: true }
      );

      setForm(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      await axios.put(
        BASE_URL + "/restaurant/profile",
        form,
        { withCredentials: true }
      );

      alert("Profile Updated Successfully!");
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <p className="text-orange-500 font-semibold">Loading Settings...</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen text-gray-600 bg-orange-50 p-4 md:p-6">
      
      {/* Heading */}
      <h1 className="text-2xl md:text-3xl font-bold text-orange-600 mb-6">
        Settings
      </h1>

      {/* Form Card */}
      <div className="bg-white shadow rounded-2xl p-5 md:p-8 max-w-2xl">
        
        <div className="grid grid-cols-1 gap-5">
          
          {/* Restaurant Name */}
          <div>
            <label className="text-gray-600 text-sm">
              Restaurant Name
            </label>
            <input
              type="text"
              name="restaurantName"
              value={form.restaurantName}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-gray-600 text-sm">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="text-gray-600 text-sm">Phone</label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {/* Address */}
          <div>
            <label className="text-gray-600 text-sm">Address</label>
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              rows="3"
              className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            className="mt-4 bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition"
          >
            Save Changes
          </button>

        </div>
      </div>
    </div>
  );
}

export default RestaurantSetting;