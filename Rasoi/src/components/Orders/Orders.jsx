import axios from "axios";
import React, { useEffect, useState } from "react";
import { Package, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/constant";
import OrdersSkeleton from "../Skeletons/OrdersSkeleton";

export default function Orders() {
  const [activeTab, setActiveTab] = useState("current");
  const [userOrder, setUserOrder] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchOrder = async () => {
    try {
      const orderData = await axios.get(BASE_URL + "/orders", {
        withCredentials: true,
      });

      const formattedData = orderData.data.map((order) => ({
        _id: order._id,
        name: order.items[0]?.name,
        image: order.items[0]?.image,
        date: order.updatedAt,
        price: order.totalPrice,
        status: order.status,
      }));

      setUserOrder(formattedData);
    } catch (error) {
      console.log(error);
    } finally {
      // small delay for better UX (optional but recommended)
      setTimeout(() => setLoading(false), 300);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  const handleNavigate = () => {
    navigate("/orderDetail");
  };

  return (
    <div className="min-h-screen bg-orange-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        
        {/* HEADER */}
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          My Orders
        </h1>

        {/* TABS */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab("current")}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              activeTab === "current"
                ? "bg-orange-500 text-white"
                : "bg-white text-gray-600"
            }`}
          >
            Current Orders
          </button>
        </div>

        {/* ORDER LIST */}
        <div className="space-y-4">

          {loading ? (
            <OrdersSkeleton />
          ) : userOrder.length === 0 ? (
            <div className="text-center py-16 text-gray-500">
              <Package className="mx-auto mb-4" size={40} />
              <p>No orders found</p>
            </div>
          ) : (
            userOrder.map((order) => (
              <div
                onClick={handleNavigate}
                key={order._id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-md transition p-4 flex items-center justify-between cursor-pointer"
              >
                {/* LEFT */}
                <div className="flex items-center gap-4">
                  <img
                    src={`${BASE_URL}/${order.image}`}
                    alt={order.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />

                  <div>
                    <h3 className="text-gray-800 font-medium">
                      {order.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {order.date}
                    </p>
                    <p
                      className={`text-sm font-medium ${
                        order.status === "Delivered"
                          ? "text-green-600"
                          : "text-orange-500"
                      }`}
                    >
                      {order.status}
                    </p>
                  </div>
                </div>

                {/* RIGHT */}
                <div className="flex items-center gap-4">
                  <p className="text-gray-800 font-semibold">
                    ₹{order.price}
                  </p>
                  <ChevronRight className="text-gray-400" />
                </div>
              </div>
            ))
          )}

        </div>
      </div>
    </div>
  );
}