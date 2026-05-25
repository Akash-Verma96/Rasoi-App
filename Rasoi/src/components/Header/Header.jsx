import React, { useState } from "react";
import rasoiLogo from "../../assets/Rasoi Logo.png";
import { Bell, Search, Menu, X } from "lucide-react";
import axios from "axios";
import { BASE_URL } from "../../utils/constant";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";

function Header() {
  const [open, setOpen] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    const delay = setTimeout(() => {
      if (query.trim()) {
        fetchResults();
      } else {
        setResults([]);
      }
    }, 400);

    return () => clearTimeout(delay);
  }, [query]);

  const fetchResults = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/search?q=${query}`);

      setResults(res.data);
    } catch (err) {
      console.log(err);
    }
  };

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
    <>
      <header className="w-full px-4 flex items-center bg-black shadow-orange-600/20 shadow-xl justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center">
          <img
            onClick={handleHome}
            src={rasoiLogo}
            alt="Rasoi Logo"
            className="w-14 sm:w-16 md:w-30 object-contain mix-blend-lighten"
          />
        </div>

        {/* Desktop Search */}
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
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {/* Mobile Search Icon */}

        {/* Search Overlay */}
        {query && (
          <>
            {/* Background Blur */}
            <div
              onClick={() => setResults([])}
              className="fixed inset-0 bg-black/40  z-40 transition-all duration-300"
            />

            {/* Search Results Container */}
            <div className="fixed top-24 left-1/2 -translate-x-1/2 w-[92%] md:w-[80%] lg:w-[65%] max-h-[75vh] overflow-y-auto z-50">
              <div className="bg-orange-400 rounded-3xl shadow-2xl border border-orange-100 overflow-hidden animate-in fade-in zoom-in duration-300">
                {/* Header */}
                <div className="sticky top-0 bg-white/90 backdrop-blur-md border-b border-orange-100 px-6 py-4 flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                      Search Results
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                      {results.length} delicious meals found
                    </p>
                  </div>

                  <button
                    onClick={() => setQuery("")}
                    className="w-10 h-10 rounded-full bg-orange-100 hover:bg-orange-200 transition flex items-center justify-center text-orange-600 font-bold text-lg"
                  >
                    ✕
                  </button>
                </div>

                {/* Meals Grid */}
                {query && results.length === 0 ? (
                  <div className="py-5 text-center"> No Meals found ! </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                    {results.map((meal) => (
                      <div
                        key={meal._id}
                        className="group bg-white rounded-2xl overflow-hidden border border-orange-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                      >
                        {/* Meal Image */}
                        <div className="relative overflow-hidden">
                          <img
                            src={meal.image}
                            alt={meal.description}
                            className="w-full h-52 object-cover group-hover:scale-110 transition duration-500"
                          />

                          {/* Gradient Overlay */}
                          <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />

                          {/* Category Badge */}
                          <div className="absolute top-3 left-3 bg-orange-500 text-white text-xs px-3 py-1 rounded-full shadow-lg">
                            {meal.category}
                          </div>
                        </div>

                        {/* Meal Info */}
                        <div className="p-5">
                          <div className="flex justify-between items-center">
                            <h3 className="text-lg font-bold text-gray-800 line-clamp-1">
                              ₹{meal.price}
                            </h3>

                            <p className=" font-bold text-orange-500 mt-2">
                              {meal.name}
                            </p>
                          </div>

                          {/* Buttons */}
                          <div className="flex items-center gap-3 mt-5">
                            <Link
                              to={`mealDetail/${meal._id}`}
                              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-2.5 rounded-xl font-medium text-center transition-all duration-300"
                            >
                              View Meal
                            </Link>

                            <button className="w-11 h-11 rounded-xl border border-orange-200 hover:bg-orange-50 transition">
                              ❤️
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {/* Notification */}
        <div className="relative flex gap-3 justify-center items-center cursor-pointer">
          <div className="sm:hidden relative">
            <button
              onClick={() => setShowMobileSearch(!showMobileSearch)}
              className="p-2 rounded-xl bg-white/10 border border-orange-400/40 text-orange-300"
            >
              <Search size={20} />
            </button>

            {/* Mobile Search Bar */}
            {showMobileSearch && (
              <div className="absolute top-12 right-0  w-50 z-50 animate-in slide-in-from-top-2 duration-300">
                <div className="relative">
                  <Search
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-400"
                  />

                  <input
                    type="text"
                    autoFocus
                    placeholder="Search dishes..."
                    className="w-full pl-10 pr-4 py-2 rounded-2xl 
          bg-black/80 backdrop-blur-xl
          border border-orange-400/40
          text-white placeholder-orange-300
          focus:outline-none
          focus:shadow-[0_0_15px_rgba(255,140,0,0.7)]"
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </div>
              </div>
            )}
          </div>
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
          <div className=" z-10">
            {/* Hamburger Icon */}
            <button
              onClick={() => setOpen(!open)}
              className="p-2 rounded-lg bg-orange-400 text-white shadow-md hover:bg-orange-500 transition"
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Dropdown Menu */}
            {open && (
              <div className="absolute z-10 right-0 mt-3 w-48 bg-black backdrop-blur-lg rounded-xl shadow-lg border overflow-hidden">
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
                  <button
                    onClick={handleLogout}
                    className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-2.5 rounded-lg font-semibold transition-all duration-300 hover:scale-105 active:scale-95"
                  >
                    Logout
                  </button>
                </ul>
              </div>
            )}
          </div>
        </div>
      </header>
      <div className="h-px w-full bg-linear-to-r from-transparent via-orange-500/70 to-transparent"></div>
    </>
  );
}

export default Header;
