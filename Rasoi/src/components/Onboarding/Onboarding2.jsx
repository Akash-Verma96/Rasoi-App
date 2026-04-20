import React from "react";
import {
  ArrowRight,
  ChefHat,
  ShoppingCart,
  CalendarCheck,
  ShieldCheck,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Onboarding2() {
  return (
    <div className="min-h-screen bg-linear-to-br from-orange-500 via-orange-400 to-orange-300 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-6 md:p-10">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-5xl font-bold text-orange-600">
            Discover Rasoi 🚀
          </h1>
          <p className="text-gray-600 mt-3 text-sm md:text-base">
            Your all-in-one food platform — order, manage, and explore
            seamlessly.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition"
            >
              <div className="bg-orange-100 w-12 h-12 flex items-center justify-center rounded-full mb-4">
                {item.icon}
              </div>
              <h3 className="font-semibold text-lg text-gray-800">
                {item.title}
              </h3>
              <p className="text-sm text-gray-500 mt-2">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Flow Diagram */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-center text-orange-600 mb-6">
            How Rasoi Works
          </h2>

          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {flow.map((step, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="bg-orange-500 text-white w-12 h-12 flex items-center justify-center rounded-full font-bold">
                  {index + 1}
                </div>
                <div>
                  <p className="font-medium text-gray-800">{step}</p>
                </div>
                {index !== flow.length - 1 && (
                  <ArrowRight className="text-orange-400 hidden md:block" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Quick Guide */}
        <div className="bg-orange-50 rounded-2xl p-6 mb-10">
          <h3 className="text-xl font-semibold text-orange-600 mb-3">
            Quick Guide
          </h3>
          <ul className="text-gray-700 text-sm space-y-2">
            <li>• Browse restaurants & dishes easily</li>
            <li>• Place orders with secure checkout</li>
            <li>• Track your order in real-time</li>
            <li>• Admin & restaurant dashboards available</li>
          </ul>
        </div>

        {/* Buttons */}
        <div className="flex justify-between items-center">
          {/* Back Button */}
          <Link
            to="/"
            className="px-6 py-2 rounded-full border border-orange-400 text-orange-500 hover:shadow-xl hover:shadow-orange-300/50 transition-all duration-300 ease-in-out"
          >
            Back
          </Link>

          {/* Get Started Button */}
          <Link
            to="/login"
            className="px-8 py-3 bg-orange-500 text-white rounded-full shadow-md hover:bg-orange-600 hover:text-white hover:shadow-xl hover:shadow-orange-400/50 active:scale-95 transition-all duration-300 ease-in-out"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
}

const features = [
  {
    icon: <ChefHat className="text-orange-500" />,
    title: "Explore Food",
    desc: "Discover restaurants and delicious dishes near you",
  },
  {
    icon: <ShoppingCart className="text-orange-500" />,
    title: "Easy Ordering",
    desc: "Add to cart and order in seconds",
  },
  {
    icon: <CalendarCheck className="text-orange-500" />,
    title: "Order Tracking",
    desc: "Track your order in real-time",
  },
  {
    icon: <ShieldCheck className="text-orange-500" />,
    title: "Secure & Role Based",
    desc: "Admin, Restaurant & Customer access control",
  },
];

const flow = ["Browse Food", "Add to Cart", "Place Order", "Track Delivery"];
