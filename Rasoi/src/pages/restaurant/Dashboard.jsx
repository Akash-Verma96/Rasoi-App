import React, { useEffect, useState } from "react";
import { Home, Utensils, ShoppingBag, Settings, Plus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../utils/constant";


function Dashboard() {

  const [restaurant,setRestaourant] = useState({});

  const navigate = useNavigate();

  const fetchRestaurant = async ()=>{
      try {
        const res = await axios.get(BASE_URL + "/restaurant/Dashboard",{withCredentials:true});

        setRestaourant(res.data);
      } catch (error) {
        console.log(error);
      }
  }

  useEffect(()=>{
    fetchRestaurant();
  },[])

 const handleLogout = async () => {
    try {
      await axios.post(
        BASE_URL + "/logout",
        {},
        {
          withCredentials: true,
        },
      );

      alert("Logout Succesfull !");

      return navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };



  

  return (
    <div className="w-full min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-orange-500 text-white p-5 hidden md:flex flex-col">
        <h1 className="text-2xl font-bold mb-10">Rasoi</h1>

        <nav className="space-y-4">
          <div className="flex items-center gap-3 hover:bg-orange-600 p-2 rounded-lg cursor-pointer">
            <Home size={20} />
            Dashboard
          </div>

          <div className="flex items-center gap-3 hover:bg-orange-600 p-2 rounded-lg cursor-pointer">
            <Utensils size={20} />
            Meals
          </div>

          <div className="flex items-center gap-3 hover:bg-orange-600 p-2 rounded-lg cursor-pointer">
            <ShoppingBag size={20} />
            Orders
          </div>

          <div className="flex items-center gap-3 hover:bg-orange-600 p-2 rounded-lg cursor-pointer">
            <Settings size={20} />
            Settings
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-700">
            {restaurant.restaurantName}
          </h2>

          <div className="flex justify-between items-center gap-3" >
            <Link
              to={"/restaurant/addMeal"}
              className="w-full flex items-center gap-2 bg-orange-500 text-white px-2 py-1 md:px-4 md:py-2 rounded-lg hover:bg-orange-600"
            >
              <Plus size={18} />
              AddMeal
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-orange-500 text-white px-2 py-1 md:px-4 md:py-2 rounded-lg hover:bg-orange-600"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white shadow rounded-xl p-5">
            <h3 className="text-gray-500">Total Orders</h3>
            <p className="text-3xl font-bold text-orange-500">120</p>
          </div>

          <div className="bg-white shadow rounded-xl p-5">
            <h3 className="text-gray-500">Total Meals</h3>
            <p className="text-3xl font-bold text-orange-500">35</p>
          </div>

          <div className="bg-white shadow rounded-xl p-5">
            <h3 className="text-gray-500">Revenue</h3>
            <p className="text-3xl font-bold text-orange-500">₹25,400</p>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white text-gray-700 shadow rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b">
                  <th className="py-2">Order ID</th>
                  <th>Customer</th>
                  <th>Meal</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                <tr className="border-b">
                  <td className="py-2">#1021</td>
                  <td>Rahul</td>
                  <td>Paneer Butter Masala</td>
                  <td className="text-green-500 font-medium">Delivered</td>
                </tr>

                <tr className="border-b">
                  <td className="py-2">#1022</td>
                  <td>Aman</td>
                  <td>Veg Biryani</td>
                  <td className="text-yellow-500 font-medium">Preparing</td>
                </tr>

                <tr>
                  <td className="py-2">#1023</td>
                  <td>Sneha</td>
                  <td>Masala Dosa</td>
                  <td className="text-orange-500 font-medium">Pending</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
