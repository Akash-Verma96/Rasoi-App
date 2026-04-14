import React, { useEffect, useState } from "react";
import { MapPin, Clock, CheckCircle } from "lucide-react";
import axios from "axios";
import { BASE_URL } from "../../utils/constant";

function OrderDetail() {
  const [orders, setOrder] = useState([]);

  const fetchOrder = async () => {
    try {
      const orderData = await axios.get(BASE_URL + "/orders", {
        withCredentials: true,
      });

      const formattedData = orderData.data.map((order) => ({
        _id: order._id,
        status: order.status,
        eta: "25 mins",
        items: [
          {
            id: order.items[0]?._id,
            name: order.items[0]?.name,
            qty: order.items[0]?.quantity,
            price: order.items[0]?.price,
          },
        ],
        total: order.totalPrice,
        address: order.address.address[0]?.address,
        restaurant: "Akash Rasoi",
      }));

      setOrder(formattedData);
    } catch (error) {
      console.log(error);
    }
  };
  // const getLatLng = async () => {
  //   navigator.geolocation.getCurrentPosition((pos) => {
  //     const lat = pos.coords.latitude;
  //     const lng = pos.coords.longitude;
  //     console.log(`Lattitude ${lat} , Longitude : ${lng}`);

  //     const map = L.map("map").setView([lat, lng], 13);

  //     L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  //       attribution: "&copy; OpenStreetMap contributors",
  //     }).addTo(map);

  //     L.marker([lat, lng]).addTo(map);
  //   });
  // };

  useEffect(() => {
    fetchOrder();
    
  }, []);

  return (
    <div className="min-h-screen bg-orange-50 p-4 md:p-8">
      {orders.map((order) => (
        <div key={order._id} className="max-w-6xl mx-auto space-y-6">
          {/* ORDER HEADER */}
          <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                Order {order._id}
              </h2>
              <p className="text-gray-500 text-sm">From {order.restaurant}</p>
            </div>

            <div className="flex items-center gap-3">
              <Clock className="text-orange-500" />
              <div>
                <p className="text-gray-700 font-medium">{order.status}</p>
                <p className="text-sm text-gray-500">ETA: {order.eta}</p>
              </div>
            </div>
          </div>

          {/* TRACKING (DUMMY MAP BOX) */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h3 className="font-semibold text-gray-800 mb-4">Live Tracking</h3>

            <div
              id="map"
              className="w-full h-64 bg-gray-200 rounded-xl flex items-center justify-center text-gray-500"
            >
              Map will be shown here (lat, lng later)
            </div>
          </div>

          {/* ORDER ITEMS */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h3 className="font-semibold text-gray-800 mb-4">Order Items</h3>

            {order.items?.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b py-3"
              >
                <div>
                  <p className="text-gray-800 font-medium">{item.name}</p>
                  <p className="text-gray-500 text-sm">
                    ₹{item.price} × {item.qty}
                  </p>
                </div>

                <p className="text-orange-600 font-semibold">
                  ₹{item.price * item.qty}
                </p>
              </div>
            ))}

            <div className="flex justify-between mt-4 font-semibold text-lg">
              <span className="text-gray-800">Total</span>
              <span className="text-orange-600">₹{order.total}</span>
            </div>
          </div>

          {/* DELIVERY ADDRESS */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="text-orange-500" />
              <h3 className="font-semibold text-gray-800">Delivery Address</h3>
            </div>

            <p className="text-gray-600">{order.address}</p>
          </div>

          {/* STATUS TIMELINE */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h3 className="font-semibold text-gray-800 mb-4">Order Status</h3>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="text-green-500" />
                <p className="text-gray-700">Order Confirmed</p>
              </div>

              <div className="flex items-center gap-3">
                <CheckCircle className="text-green-500" />
                <p className="text-gray-700">Preparing Food</p>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="text-orange-500" />
                <p className="text-gray-700">Out for Delivery</p>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="text-gray-400" />
                <p className="text-gray-400">Delivered</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default OrderDetail;
