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
    }, 4000); // change slide every 4s

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Header />
      <div className="w-full my-6">
      <div className="mx-auto w-[95%] md:w-[80%] lg:w-[97%]">

        {/* Premium Border Wrapper */}
        <div className="relative rounded-3xl p-0.5 bg-linear-to-r from-orange-300 via-orange-500 to-orange-700 animate-border">
          
          {/* Soft Glow */}
          <div className="absolute inset-0 rounded-3xl blur-xl opacity-70 bg-orange-400"></div>

          {/* Main Slider */}
          <div className="relative h-[60vh] md:h-[75vh] overflow-hidden rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.4)] bg-black">

            {slides.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-1000 ${
                  index === current
                    ? "opacity-100 scale-100 z-10"
                    : "opacity-0 scale-105 z-0"
                }`}
              >
                {/* Image */}
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />

                {/* Edge Blur Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
                  <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                    {slide.title}
                  </h1>

                  <p className="text-lg md:text-xl text-gray-200 max-w-xl">
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
                      ? "bg-orange-500 scale-125"
                      : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tailwind Custom Animation */}
      <style jsx>{`
        @keyframes borderMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .animate-border {
          background-size: 200% 200%;
          animation: borderMove 6s linear infinite;
        }
      `}</style>
    </div>
      <PopularMeals />
      <Category />
      <Meals />
      <Footer />
    </div>
  );
}

export default CustomerHome;
