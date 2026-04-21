import React, { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../utils/constant";
import { useDispatch } from "react-redux";
import { addOrders, settotalMeals } from "../../utils/restaurantSlice";
import RestaurantDashboardSkeleton from "../../components/Skeletons/RestaurantDashboardSkeleton";
import { toast } from "react-toastify";
import AccessDenied from "./AccessDenied";

function Dashboard() {
  const [restaurant, setRestaourant] = useState({});
  const [loading, setloading] = useState(true);
  const [error, setError] = useState(false);
  const [mealsSize, setMealsSize] = useState([]);
  const [orders, setOrders] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchRestaurant = async () => {
    try {
      const res = await axios.get(BASE_URL + "/restaurant/Dashboard", {
        withCredentials: true,
      });

      setRestaourant(res.data);

      const mealsData = await axios.get(BASE_URL + "/restaurant/meals", {
        withCredentials: true,
      });

      dispatch(settotalMeals(mealsData.data));
      setMealsSize(mealsData.data);

      const ordersData = await axios.get(BASE_URL + "/restaurant/orders", {
        withCredentials: true,
      });

      dispatch(addOrders(ordersData.data));
      setOrders(ordersData.data);
    } catch (error) {
      setError(true);
      console.log(error);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    fetchRestaurant();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });

      toast.success("Data Added Successfully !", {
        position: "top-right",
        autoClose: 2000,
        theme: "dark",
      });
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const handleAccept = async (orderID) => {
    try {
      const res = await axios.patch(
        BASE_URL + "/restaurant/acceptOrder",
        {
          _id: orderID,
          status: "delivered",
        },
        { withCredentials: true },
      );
    } catch (error) {
      console.log(error?.response?.message);
    }
  };

  if (loading) return <RestaurantDashboardSkeleton />;

  if (error) return <AccessDenied />;

  return (
    <div className="w-full px-3 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-8 gap-4">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
          {restaurant.restaurantName}
        </h2>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 bg-linear-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-full shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 w-full sm:w-auto"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
        <div className="bg-white/80 backdrop-blur-lg border border-gray-100 shadow-md rounded-2xl p-5 hover:shadow-xl transition">
          <h3 className="text-gray-500 text-sm">Total Orders</h3>
          <p className="text-2xl sm:text-3xl font-bold text-orange-500">
            {orders.length}
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-lg border border-gray-100 shadow-md rounded-2xl p-5 hover:shadow-xl transition">
          <h3 className="text-gray-500 text-sm">Total Meals</h3>
          <p className="text-2xl sm:text-3xl font-bold text-orange-500">
            {mealsSize.length}
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-lg border border-gray-100 shadow-md rounded-2xl p-5 hover:shadow-xl transition">
          <h3 className="text-gray-500 text-sm">Revenue</h3>
          <p className="text-2xl sm:text-3xl font-bold text-orange-500">
            ₹25,400
          </p>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white text-gray-700 shadow-lg rounded-2xl p-4 sm:p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>

        {/* TABLE (Desktop) */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b text-gray-500 text-sm">
                <th className="py-2">Order ID</th>
                <th>Customer</th>
                <th>Meal</th>
                <th>Price</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {orders
                ?.slice(-5)
                .reverse()
                .map((order) => (
                  <tr
                    key={order._id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="py-3 font-medium">
                      #{order._id?.slice(-5)}
                    </td>

                    <td>{order.address.address[0].name || "User"}</td>

                    <td>{order.items[0].name}</td>

                    <td className="text-orange-600 font-semibold">
                      ₹{order.totalPrice}
                    </td>

                    <td>
                      <span
                        className={`px-3 py-1 text-xs rounded-full font-medium ${
                          order.status === "delivered"
                            ? "bg-green-100 text-green-600"
                            : order.status === "preparing"
                              ? "bg-yellow-100 text-yellow-600"
                              : "bg-orange-100 text-orange-600"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>

                    <td>
                      {order.status !== "delivered" && (
                        <button
                          onClick={() => handleAccept(order._id)}
                          className="px-3 py-1 text-sm font-semibold rounded-full bg-linear-to-r from-green-500 to-emerald-600 text-white shadow hover:scale-105 transition"
                        >
                          Accept
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* MOBILE CARD VIEW */}
        <div className="flex flex-col gap-4 md:hidden">
          {orders
            ?.slice(-5)
            .reverse()
            .map((order) => (
              <div
                key={order._id}
                className="border rounded-xl p-4 shadow-sm hover:shadow-md transition"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-sm">
                    #{order._id?.slice(-5)}
                  </span>

                  <span
                    className={`px-2 py-1 text-xs rounded-full font-medium ${
                      order.status === "Delivered"
                        ? "bg-green-100 text-green-600"
                        : order.status === "Preparing"
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-orange-100 text-orange-600"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                <p className="text-sm text-gray-600">
                  {order.address.address[0].name || "User"}
                </p>

                <p className="text-sm">{order.items[0].name}</p>

                <div className="flex justify-between items-center mt-3">
                  <span className="text-orange-600 font-semibold">
                    ₹{order.totalPrice}
                  </span>

                  {order.status !== "delivered" && (
                    <button
                      onClick={() => handleAccept(order._id)}
                      className="px-3 py-1 text-sm font-semibold rounded-full bg-linear-to-r from-green-500 to-emerald-600 text-white shadow hover:scale-105 transition"
                    >
                      Accept
                    </button>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
