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
    navigate("/home/orderDetail");
  };

  return (
    <div className="min-h-screen bg-orange-50 p-3 sm:p-4 md:p-8">
  <div className="max-w-5xl mx-auto">
    
    {/* HEADER */}
    <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6">
      My Orders
    </h1>

    {/* TABS */}
    <div className="flex gap-3 sm:gap-4 mb-4 sm:mb-6 overflow-x-auto">
      <button
        onClick={() => setActiveTab("current")}
        className={`px-3 sm:px-4 py-2 rounded-lg font-medium whitespace-nowrap transition ${
          activeTab === "current"
            ? "bg-orange-500 text-white"
            : "bg-white text-gray-600"
        }`}
      >
        Current Orders
      </button>
    </div>

    {/* ORDER LIST */}
    <div className="space-y-3 sm:space-y-4">

      {loading ? (
        <OrdersSkeleton />
      ) : userOrder.length === 0 ? (
        <div className="text-center py-12 sm:py-16 text-gray-500">
          <Package className="mx-auto mb-4" size={36} />
          <p>No orders found</p>
        </div>
      ) : (
        userOrder
        .reverse()
        .map((order) => (
          <div
            onClick={handleNavigate}
            key={order._id}
            className="bg-white rounded-2xl shadow-sm hover:shadow-md transition p-3 sm:p-4 cursor-pointer"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              
              {/* LEFT */}
              <div className="flex items-center gap-3 sm:gap-4">
                <img
                  src={order.image}
                  alt={order.name}
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg object-cover"
                />

                <div className="min-w-0">
                  <h3 className="text-gray-800 font-medium text-sm sm:text-base truncate">
                    {order.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 truncate">
                    {order.date}
                  </p>
                  <p
                    className={`px-3 py-1 text-center text-xs rounded-full font-medium ${
                          order.status === "delivered"
                            ? "bg-green-100 text-green-600"
                            : order.status === "preparing"
                              ? "bg-yellow-100 text-yellow-600"
                              : "bg-orange-100 text-orange-600"
                        }`}
                  >
                    {order.status}
                  </p>
                </div>
              </div>

              {/* RIGHT */}
              <div className="flex items-center justify-end gap-3 sm:gap-4">
                <p className="text-gray-800 font-semibold text-sm sm:text-base">
                  ₹{order.price}
                </p>
                <ChevronRight className="text-gray-400" size={18} />
              </div>
            </div>
          </div>
        ))
      )}

    </div>
  </div>
</div>
  );
}