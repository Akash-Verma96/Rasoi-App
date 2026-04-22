import { React, useEffect } from "react";
import Header from "../../components/Header/Header.jsx";
import PopularMeals from "../../components/PopularMeals/PopularMeals.jsx";
import Category from "../../components/Category/Category.jsx";
import Meals from "../../components/Meals/Meals.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import { useState } from "react";

const slides = [
  {
    image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092",
    title: "Welcome to Rasoi",
    desc: "Delicious food from your favorite local restaurants",
  },
  {
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
    title: "Fresh & Hygienic",
    desc: "Quality meals prepared with love and care",
  },
  {
    image: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    title: "Fast Delivery",
    desc: "Get your food delivered hot & fresh at your doorstep",
  },
  {
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
    title: "Explore Variety",
    desc: "From street food to premium dining options",
  },
  {
    image: "https://images.unsplash.com/photo-1606787366850-de6330128bfc",
    title: "Order Anytime",
    desc: "Your cravings don’t wait — and neither do we",
  },
];

function CustomerHome() {
  const [current, setCurrent] = useState(0);

  // Auto Slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Header />
      
     <div className="w-full mb-6">
  <div className="mx-auto w-full md:w-[80%] lg:w-full">

    {/* Top Premium Line */}
    

    {/* Wrapper */}
    <div className="relative group  overflow-hidden">

      {/* 🔥 Glow Effect */}
      <div className="absolute -inset-0.5  opacity-40 blur-xl bg-orange-500 group-hover:opacity-70 transition duration-500"></div>

      {/* 🔥 Moving Shimmer Border */}
      <div className="absolute inset-0  overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-linear-to-r from-transparent via-orange-400/40 to-transparent animate-[shimmer_3s_linear_infinite]"></div>
      </div>

      {/* Main Slider */}
      <div className="relative h-[60vh] md:h-[80vh] bg-black overflow-hidden  shadow-[0_20px_80px_rgba(0,0,0,0.6)]">

        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ${
              index === current
                ? "opacity-100 scale-100 z-2"
                : "opacity-0 scale-110 z-0"
            }`}
          >
            {/* Image with Zoom */}
            <img
              src={slide.image}
              alt={slide.title}
              className={`w-full h-full object-cover transition-transform duration-8000 ease-in-out ${
                index === current ? "scale-110" : "scale-100"
              }`}
            />

            {/* Gradient Overlay (Depth) */}
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent"></div>

            {/* Side Vignette (premium feel) */}
            <div className="absolute inset-0 bg-linear-to-r from-black/40 via-transparent to-black/40"></div>

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
              
              <h1 className="text-3xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-[0_8px_30px_rgba(0,0,0,0.9)]">
                {slide.title}
              </h1>

              <p className="text-lg md:text-xl text-gray-200 max-w-xl backdrop-blur-sm bg-white/5 px-4 py-2 rounded-lg">
                {slide.desc}
              </p>

            </div>
          </div>
        ))}

        {/* Dots */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                current === index
                  ? "bg-orange-500 scale-125 shadow-[0_0_10px_rgba(255,115,0,0.8)]"
                  : "bg-gray-400/60"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  </div>

  {/* Animations */}
  <div className="h-px w-full bg-linear-to-r from-transparent via-orange-500/70 to-transparent"></div>
</div>
      <PopularMeals />
      <Category />
      <Meals />
      <Footer />
    </div>
  );
}

export default CustomerHome;
