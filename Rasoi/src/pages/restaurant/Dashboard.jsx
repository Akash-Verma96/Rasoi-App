import React, { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../utils/constant";
import { useDispatch } from "react-redux";
import { addOrders, settotalMeals } from "../../utils/restaurantSlice";
import RestaurantDashboardSkeleton from "../../components/Skeletons/RestaurantDashboardSkeleton";
import { toast } from "react-toastify"

function Dashboard() {
  const [restaurant, setRestaourant] = useState({});
  const [loading, setloading] = useState(true);
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

  if (loading) return <RestaurantDashboardSkeleton />;

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4">
        <h2 className="text-2xl font-bold text-gray-700">
          {restaurant.restaurantName}
        </h2>

        <div className="flex flex-wrap gap-3">
          <Link
            to={"/restaurant/addMeal"}
            className="flex items-center gap-2 bg-orange-500 text-white px-3 py-2 rounded-lg hover:bg-orange-600"
          >
            <Plus size={18} />
            AddMeal
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-orange-500 text-white px-3 py-2 rounded-lg hover:bg-orange-600"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white shadow rounded-xl p-5">
          <h3 className="text-gray-500">Total Orders</h3>
          <p className="text-3xl font-bold text-orange-500">{orders.length}</p>
        </div>

        <div className="bg-white shadow rounded-xl p-5">
          <h3 className="text-gray-500">Total Meals</h3>
          <p className="text-3xl font-bold text-orange-500">
            {mealsSize.length}
          </p>
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
          <table className="w-full text-left min-w-125">
            <thead>
              <tr className="border-b">
                <th className="py-2">Order ID</th>
                <th>Customer</th>
                <th>Meal</th>
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
                  className="border-b text-gray-600 hover:bg-gray-50"
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
    </div>
  );
}

export default Dashboard;
