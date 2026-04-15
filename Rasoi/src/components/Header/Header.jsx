import React, { useState } from "react";
import rasoiLogo from "../../assets/Rasoi Logo.png";
import { Bell, Search, Menu, X } from "lucide-react";
import axios from "axios";
import { BASE_URL } from "../../utils/constant";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Header() {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await axios.post(
        BASE_URL + "/logout",
        {},
        {
          withCredentials: true,
        },
      );

      toast.success("Logout Successfull", {
        position: "top-right",
        autoClose: 2000,
        theme: "dark",
      });

      return navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const handleHome = () => {
    navigate("/home");
  };

  return (
    <header className="w-full px-4 flex items-center justify-between gap-4">
      {/* Logo */}
      <div className="flex items-center">
        <img
          onClick={handleHome}
          src={rasoiLogo}
          alt="Rasoi Logo"
          className="w-14 sm:w-16 md:w-30 object-contain mix-blend-lighten"
        />
      </div>

      {/* Search Bar */}
      <div className="flex-1 max-w-xl relative hidden sm:flex">
        <Search
          size={18}
          className="absolute z-10 left-4 top-1/2 -translate-y-1/2 text-orange-400"
        />
        <input
          type="text"
          placeholder="Search dishes..."
          className="w-full pl-10 pr-4 py-2 rounded-2xl 
          bg-white/10 backdrop-blur-md
          border border-orange-400/40
          text-white placeholder-orange-300
          focus:outline-none
          focus:shadow-[0_0_15px_rgba(255,140,0,0.7)]"
        />
      </div>

      {/* Notification */}
      <div className="relative flex gap-3 justify-center items-center cursor-pointer">
        <button
          className="group relative hidden  sm:block items-center justify-center px-5 py-2 font-semibold text-white rounded-2xl
      bg-linear-to-r from-orange-500 via-orange-600 to-red-500
      shadow-lg shadow-orange-500/30
      hover:shadow-orange-600/40 hover:scale-105
      active:scale-95
      transition-all duration-300 ease-in-out"
          onClick={handleLogout}
        >
          <span className="absolute inset-0 rounded-2xl bg-white opacity-0 group-hover:opacity-10 transition duration-300"></span>
          <span className="relative">Logout</span>
        </button>
        <Bell
          size={24}
          className="text-orange-400 
          drop-shadow-[0_0_8px_rgba(255,140,0,0.8)] 
          cursor-pointer hover:scale-110 transition"
        />
        <div className=" z-3">
          {/* Hamburger Icon */}
          <button
            onClick={() => setOpen(!open)}
            className="p-2 rounded-lg bg-orange-400 text-white shadow-md hover:bg-orange-500 transition"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Dropdown Menu */}
          {open && (
            <div className="absolute right-0 mt-3 w-48 backdrop-blur-lg rounded-xl shadow-lg border overflow-hidden">
              <ul className="flex flex-col text-orange-200">
                

                <Link
                  to={"/home/cart"}
                  className="px-4 py-3 hover:bg-orange-100 hover:text-orange-500 cursor-pointer transition"
                >
                  Cart
                </Link>

                <Link
                  to={"/home/orders"}
                  className="px-4 py-3 hover:bg-orange-100 hover:text-orange-500 cursor-pointer transition"
                >
                  My Orders
                </Link>

                <Link
                  to={"/home/profile"}
                  className="px-4 py-3 hover:bg-orange-100 hover:text-orange-500 cursor-pointer transition"
                >
                  Profile
                </Link>
                <button onClick={handleLogout}  className="bg-amber-600 text-white px-5 py-2.5 rounded-lg font-semibold transition-all duration-300 hover:bg-amber-900 hover:scale-105 active:scale-95">
                  Logout
                </button>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
