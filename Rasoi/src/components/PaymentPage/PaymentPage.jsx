import React, { useState } from "react";
import {
  MapPin,
  CreditCard,
  Wallet,
  Landmark,
  CheckCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { BASE_URL } from "../../utils/constant";
import axios from "axios";
import {toast} from "react-toastify"

function PaymentPage() {
  const [method, setMethod] = useState("upi");
  const [showSuccess, setSuccess] = useState(false);

  const orderData = useSelector((store) => store.order);
 


  const handlePlaceOrder = async () => {
    try {
      const {restaurant} = orderData.items[0][0].meal;
      const meals = orderData.items[0];
   
      const address = orderData.address[0];
      const paymentStatus = "paid";
      const status = "preparing";
      const {itemsPrice, deliveryCharge, totalPrice} = orderData;
      
      
      const res = await axios.post(BASE_URL + "/payment",
        {
         
          restaurant,
          meals,
          address,
          paymentMethod: method,
          paymentStatus,
          status,
          itemsPrice,
          deliveryCharge,
          totalPrice,
          
        },
        { withCredentials: true },
        )

      setSuccess(true);

      toast.success("Enjoy Your Meal Order Placed!", {
        position: "top-right",
        autoClose: 2000,
        theme: "dark",
      });
      
    } catch (err) {
      toast.error(err?.response?.data, {
              position: "top-right",
              autoClose: 2000,
              theme: "dark",
            });
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-orange-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white shadow-xl rounded-2xl p-6 md:p-10">
        {showSuccess && (
          <div className="fixed inset-0 items-center flex justify-center bg-black/40 backdrop-blur-sm px-4 z-50">
            <div className="bg-white shadow-2xl rounded-2xl p-6 sm:p-8 md:p-10 max-w-md w-full text-center border border-green-100">
              <div className="flex justify-center mb-4">
                <CheckCircle className="text-green-500 w-14 h-14 md:w-16 md:h-16" />
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-green-600 mb-3">
                Congratulations 🎉
              </h2>

              <p className="text-gray-600 text-sm sm:text-base mb-6">
                Your meal has been purchased successfully 🍽️ Sit back, relax,
                and enjoy your delicious food! 😋
              </p>

              <Link
                to={"/home"}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold transition w-full sm:w-auto"
              >
                Continue Shopping 🛒
              </Link>
            </div>
          </div>
        )}

        {/* Stepper */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3 opacity-50">
            <div className="bg-gray-200 p-3 rounded-full">
              <MapPin size={20} />
            </div>
            <p className="font-semibold text-gray-400">Address</p>
          </div>

          <div className="flex-1 h-0.5 bg-orange-200 mx-4 relative">
            <div className="absolute left-0 top-0 h-0.5 w-full bg-orange-500"></div>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-orange-500 text-white p-3 rounded-full">
              <CreditCard size={20} />
            </div>
            <p className="font-semibold text-orange-500">Payment</p>
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
          Select Payment Method
        </h2>

        {/* Payment Options */}
        <div className="grid gap-4">
          {/* UPI */}
          <div
            onClick={() => setMethod("upi")}
            className={`p-4 border rounded-xl flex items-center gap-4 cursor-pointer transition ${
              method === "upi"
                ? "border-orange-500 bg-orange-50"
                : "border-gray-300"
            }`}
          >
            <Wallet className="text-orange-500" />
            <div>
              <p className="font-semibold text-gray-800">UPI</p>
              <p className="text-sm text-gray-500">
                Pay via Google Pay, PhonePe
              </p>
            </div>
          </div>

          {/* Card */}
          {/* <div
            onClick={() => setMethod("card")}
            className={`p-4 border rounded-xl flex items-center gap-4 cursor-pointer transition ${
              method === "card"
                ? "border-orange-500 bg-orange-50"
                : "border-gray-300"
            }`}
          >
            <CreditCard className="text-orange-500" />
            <div>
              <p className="font-semibold text-gray-800">Card</p>
              <p className="text-sm text-gray-500">Debit / Credit Card</p>
            </div>
          </div> */}

          {/* Net Banking */}
          {/* <div
            onClick={() => setMethod("netbanking")}
            className={`p-4 border rounded-xl flex items-center gap-4 cursor-pointer transition ${
              method === "netbanking"
                ? "border-orange-500 bg-orange-50"
                : "border-gray-300"
            }`}
          >
            <Landmark className="text-orange-500" />
            <div>
              <p className="font-semibold text-gray-800">Net Banking</p>
              <p className="text-sm text-gray-500">All major banks supported</p>
            </div>
          </div> */}

          {/* COD */}
          <div
            onClick={() => setMethod("cod")}
            className={`p-4 border rounded-xl flex items-center gap-4 cursor-pointer transition ${
              method === "cod"
                ? "border-orange-500 bg-orange-50"
                : "border-gray-300"
            }`}
          >
            <Wallet className="text-orange-500" />
            <div>
              <p className="font-semibold text-gray-800">Cash on Delivery</p>
              <p className="text-sm text-gray-500">Pay when order arrives</p>
            </div>
          </div>
        </div>

        {/* Button */}
        <button
          onClick={handlePlaceOrder}
          className="w-full mt-8 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl text-lg font-semibold transition duration-200 shadow-md hover:shadow-lg"
        >
          Place Order 🚀
        </button>
      </div>
    </div>
  );
}

export default PaymentPage;
