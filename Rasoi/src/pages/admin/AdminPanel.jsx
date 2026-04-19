import React, { useState } from "react";
import { Users, Store, ClipboardList, IndianRupee, Menu } from "lucide-react";
import { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/constant";
import AccessDenied from "../restaurant/AccessDenied"
import AdminSkeleton from "../../components/Skeletons/AdminSkeleton";

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [error,setError] = useState(false);
  const [loading,setLoadin] = useState(true);

  const[users, setUser] = useState([]);
  const [restaurants, setRestaurant] = useState([]);
  const [orders, setOrder] = useState([]);

  const fetchDetail = async () => {
      try {
        const userDetail = await axios.get(BASE_URL + "/admin",{withCredentials: true});

        // console.log(userDetail.data);
        setUser(userDetail.data);

        const restaurantDetail = await axios.get(BASE_URL + "/admin/restaurant",{withCredentials: true});

        // console.log(restaurantDetail.data);
        setRestaurant(restaurantDetail.data);

        const orderDetail = await axios.get(BASE_URL + "/admin/orders",{withCredentials: true});

        // console.log(orderDetail.data);
        setOrder(orderDetail.data);
      } catch (error) {
        setError(true);
        console.log(error?.response?.message);
      }
      finally{
        setLoadin(false);
      }
  }

  useEffect(()=>{
    fetchDetail();
  },[])

  const stats = [
    { title: "Users", value: users.length, icon: <Users /> },
    { title: "Restaurants", value: restaurants.length, icon: <Store /> },
    { title: "Orders", value: orders.length, icon: <ClipboardList /> },
    { title: "Revenue", value: "₹1,25,000", icon: <IndianRupee /> },
  ];

  const handleDelete = ()=>{
    console.log("User Deleted !");
  }

  if(loading) return <AdminSkeleton />;
  
  if(error) return < AccessDenied /> ;


  return (
    <div className="flex min-h-screen bg-black text-white">
      
      {/* Sidebar */}
      <div className={`bg-[#0f0f0f] w-64 p-5 fixed md:relative z-50 transition-transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
        <h1 className="text-2xl font-bold text-orange-500 mb-8">RASOI ADMIN</h1>

        <nav className="space-y-4">
          {["dashboard", "users", "restaurants", "orders"].map((tab) => (
            <div
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`cursor-pointer px-4 py-2 rounded-lg capitalize ${
                activeTab === tab
                  ? "bg-orange-500 text-black"
                  : "hover:bg-gray-800"
              }`}
            >
              {tab}
            </div>
          ))}
        </nav>
      </div>

      {/* Main */}
      <div className="flex-1 p-6 md:ml-0 w-full">
        
        {/* Topbar */}
        <div className="flex justify-between items-center mb-6">
          <button
            className="md:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu />
          </button>

          <h2 className="text-xl font-semibold capitalize">
            {activeTab}
          </h2>
        </div>

        {/* Dashboard */}
        {activeTab === "dashboard" && (
          <>
            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              {stats.map((item, i) => (
                <div
                  key={i}
                  className="bg-[#111] p-5 rounded-xl shadow-lg border border-gray-800 hover:border-orange-500 transition"
                >
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-gray-400">{item.title}</h3>
                    <span className="text-orange-500">{item.icon}</span>
                  </div>
                  <p className="text-2xl font-bold">{item.value}</p>
                </div>
              ))}
            </div>

            {/* Orders */}
            <div className="bg-[#111] p-6 rounded-xl shadow-lg border border-gray-800">
              <h3 className="mb-4 text-lg font-semibold">Recent Orders</h3>

              <div className="overflow-x-auto">
          <table className="w-full text-left min-w-125">
            <thead>
              <tr className="border-b">
                <th className="py-2">Order ID</th>
                <th>Customer</th>
                <th>Meal</th>
                <th>Price</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {orders
              ?.slice(-5)
              .reverse()
              .map((order) => (
                <tr
                  key={order._id}
                  className="border-b text-gray-600 hover:bg-gray-800"
                >
                  <td className="py-3 font-medium">#{order._id?.slice(-5)}</td>

                  <td>{order.address.address[0].name || "User"}</td>

                  <td>{order.items[0].name}</td>

                  <td className="text-orange-600 font-semibold">
                    ₹{order.totalPrice}
                  </td>

                  <td>
                    <span
                      className={`px-3 py-1 text-sm rounded-full font-medium ${
                        order.status === "Delivered"
                          ? "bg-green-100 text-green-600"
                          : order.status === "Preparing"
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-orange-100 text-orange-600"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
            </div>
          </>
        )}

        {/* Users */}
        {activeTab === "users" && (
          <div className="bg-[#111] p-6 rounded-xl border border-gray-800">
            <h3 className="mb-4 text-lg font-semibold">User Management</h3>
            <p className="text-gray-400">View, block or manage users</p>

            <div className="overflow-x-auto">
          <table className="w-full text-left min-w-125">
            <thead>
              <tr className="border-b">
                <th className="py-2">User ID</th>
                <th>FirstName</th>
                <th>LastName</th>
                <th>Email</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {users
              .reverse()
              .map((user) => (
                <tr
                  key={user._id}
                  className="border-b text-gray-600 hover:bg-gray-800"
                >
                  <td className="py-3 font-medium">#{user._id?.slice(-5)}</td>

                  <td>{user.firstName || "User"}</td>

                  <td>{user.lastName}</td>

                  <td className="text-orange-600 font-semibold">
                    ₹{user.emailId}
                  </td>

                  <td>
                    <span
                      onClick={handleDelete}
                      className={`px-3 py-1 cursor-pointer text-white bg-orange-700 text-sm rounded-full font-medium `}
                    >
                      Remove
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
          </div>

        )}

        {/* Restaurants */}
        {activeTab === "restaurants" && (
          <div className="bg-[#111] p-6 rounded-xl border border-gray-800">
            <h3 className="mb-4 text-lg font-semibold">
              Restaurant Approval
            </h3>

            <div className="flex gap-3">
              <button className="bg-green-600 px-4 py-2 rounded-lg">
                Approve
              </button>
              <button className="bg-red-600 px-4 py-2 rounded-lg">
                Reject
              </button>
            </div>
            
            <div className="overflow-x-auto">
          <table className="w-full text-left min-w-125">
            <thead>
              <tr className="border-b">
                <th className="py-2">Restaurant ID</th>
                <th>Name</th>
                <th>City</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {restaurants
              .reverse()
              .map((rest) => (
                <tr
                  key={rest._id}
                  className="border-b text-gray-600 hover:bg-gray-800"
                >
                  <td className="py-3 font-medium">#{rest._id?.slice(-5)}</td>

                  <td>{rest.restaurantName || "User"}</td>

                  <td>{rest.city}</td>

                  

                  <td>
                    <span
                      onClick={handleDelete}
                      className={`px-3 py-1 cursor-pointer text-white bg-orange-700 text-sm rounded-full font-medium `}
                    >
                      Remove
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

          </div>
        )}

        {/* Orders */}
        {activeTab === "orders" && (
          <div className="bg-[#111] p-6 rounded-xl border border-gray-800">
            <h3 className="mb-4 text-lg font-semibold">All Orders</h3>
            <p className="text-gray-400">Manage all platform orders</p>

            <div className="overflow-x-auto">
          <table className="w-full text-left min-w-125">
            <thead>
              <tr className="border-b">
                <th className="py-2">Order ID</th>
                <th>Customer</th>
                <th>Meal</th>
                <th>Price</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {orders
              .reverse()
              .map((order) => (
                <tr
                  key={order._id}
                  className="border-b text-gray-600 hover:bg-gray-800"
                >
                  <td className="py-3 font-medium">#{order._id?.slice(-5)}</td>

                  <td>{order.address.address[0].name || "User"}</td>

                  <td>{order.items[0].name}</td>

                  <td className="text-orange-600 font-semibold">
                    ₹{order.totalPrice}
                  </td>

                  <td>
                    <span
                      className={`px-3 py-1 text-sm rounded-full font-medium ${
                        order.status === "Delivered"
                          ? "bg-green-100 text-green-600"
                          : order.status === "Preparing"
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-orange-100 text-orange-600"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;