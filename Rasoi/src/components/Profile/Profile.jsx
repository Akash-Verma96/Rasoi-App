import React from "react";
import { useState, useEffect } from "react";
import axios from "axios"
import { BASE_URL } from "../../utils/constant";

const Profile = () => {

  const [profile , setProfile] = useState({});


  const fetchProfile = async () => {
    try {
      const res = await axios.get( BASE_URL +  "/profile/view", {withCredentials:true});

      setProfile(res.data);
    } catch (error) {
      console.log(error?.response?.data);
    }
  }

  useEffect(()=>{
    fetchProfile();
  },[])

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-zinc-900 rounded-2xl shadow-xl p-6 text-white">

        {/* Profile Header */}
        <div className="flex flex-col items-center">
          <img
            src="https://i.pinimg.com/736x/99/5c/46/995c46fb3db7da44434d14ba5264e00c.jpg"
            alt="User"
            className="w-24 h-24 rounded-full object-cover border-4 border-orange-500"
          />
          <h2 className="text-xl font-semibold mt-4">{`${profile.firstName} ${profile.lastName}`}</h2>
          <p className="text-sm text-zinc-400">{profile.emailId}</p>
        </div>

        {/* Divider */}
        <div className="border-t border-zinc-700 my-6"></div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <h3 className="text-lg font-bold text-orange-500">12</h3>
            <p className="text-sm text-zinc-400">Orders</p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-orange-500">₹3,240</h3>
            <p className="text-sm text-zinc-400">Spent</p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-orange-500">5</h3>
            <p className="text-sm text-zinc-400">Favorites</p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-zinc-700 my-6"></div>

        {/* Settings Section */}
        <div className="space-y-3">

          <button className="w-full bg-zinc-800 hover:bg-zinc-700 transition rounded-xl py-2 text-left px-4">
            ⚙️ Settings
          </button>

          <button className="w-full bg-zinc-800 hover:bg-zinc-700 transition rounded-xl py-2 text-left px-4">
            📜 Terms & Conditions
          </button>

          <button className="w-full bg-zinc-800 hover:bg-zinc-700 transition rounded-xl py-2 text-left px-4">
            🔒 Privacy Policy
          </button>

        </div>

        {/* Divider */}
        <div className="border-t border-zinc-700 my-6"></div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <button className="bg-orange-500 hover:bg-orange-600 transition rounded-xl py-2 font-medium">
            Edit Profile
          </button>
          <button className="bg-red-500 hover:bg-red-600 transition rounded-xl py-2 font-medium">
            Logout
          </button>
        </div>

      </div>
    </div>
  );
};

export default Profile;
