import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import OnboardingSkeleton from "../Skeletons/OnboardingSkeleton";

const Onboarding = () => {

  const text = "Fresh Food Delivered Fast";
  const [displayText, setDisplayText] = useState("");
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);

  const bgImage =
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836";

  // 🔥 Preload image (REAL loading detection)
  useEffect(() => {
    const img = new Image();
    img.src = bgImage;

    img.onload = () => {
      setImageLoaded(true);
      setLoading(false);
    };
  }, []);

  // ✨ Typing effect (start AFTER image loads)
  useEffect(() => {
    if (!imageLoaded) return;

    let index = 0;

    const interval = setInterval(() => {
      setDisplayText(text.slice(0, index + 1));
      index++;

      if (index === text.length) {
        clearInterval(interval);
      }
    }, 60);

    return () => clearInterval(interval);
  }, [imageLoaded]);

  // 👇 Show skeleton until image is ready
  if (loading) return <OnboardingSkeleton />;

  return (
    <div
      className={`min-h-screen bg-cover bg-center relative flex items-end transition-opacity duration-700 ${
        imageLoaded ? "opacity-100" : "opacity-0"
      }`}
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>

      <div className="relative w-full h-screen flex flex-col justify-center items-center text-white px-6 pb-16 md:px-16">

        {/* Content Card */}
        <div className="max-w-2xl bg-slate-700/30 p-3 rounded-2xl backdrop-blur-lg transition-all duration-500 hover:scale-[1.02]">

          <h1 className="text-4xl md:text-5xl text-center font-bold leading-tight">
            {displayText}
          </h1>

          <p className="mt-4 text-gray-400 text-center text-lg  animate-fadeIn">
            Discover the best meals from your favorite restaurants.
            Order easily and enjoy delicious food anytime with Rasoi.
          </p>

        </div>

        {/* CTA Button */}
        <Link
          to={"/Onboarding2"}
          className="mt-8 bg-orange-400 hover:bg-orange-500 transition-all duration-300 px-8 py-3 rounded-xl font-semibold text-white shadow-lg hover:scale-105 active:scale-95"
        >
          Get Started
        </Link>

      </div>
    </div>
  );
};

export default Onboarding;