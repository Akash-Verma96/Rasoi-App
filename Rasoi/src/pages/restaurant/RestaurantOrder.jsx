import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/constant";
import { useSelector } from "react-redux";
import { addOrders } from "../../utils/restaurantSlice";

function RestaurantOrder() {
  const [orders, setOrders] = useState([]);
  const ordersData = useSelector((store) => store.restaurant.orders);
  
  useEffect(() => {
    setOrders(ordersData[0]);
  }, []);

  return (
    <div className="w-full min-h-screen bg-orange-50 p-4 md:p-6">
      {/* Heading */}
      <h1 className="text-2xl md:text-3xl font-bold text-orange-600 mb-6">
        Orders
      </h1>

      {/* Orders Table */}
      <div className="bg-white shadow rounded-xl p-4 md:p-6 overflow-x-auto">
        <table className="w-full min-w-150 text-left">
          <thead>
            <tr className="border-b text-gray-600">
              <th className="py-2">Order ID</th>
              <th>Customer</th>
              <th>Meal</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {!orders || orders.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No Orders Found
                </td>
              </tr>
            ) : (
              [...orders]
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
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RestaurantOrder;
