import { React, useEffect, useState, useRef } from "react";
import Header from "../../components/Header/Header.jsx";
import PopularMeals from "../../components/PopularMeals/PopularMeals.jsx";
import Category from "../../components/Category/Category.jsx";
import Meals from "../../components/Meals/Meals.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import TrendingMeals from "../../components/TrendingMeals/TrendingMeals.jsx";

import image2 from "../../assets/image2.jpg";
import image3 from "../../assets/image3.jpg";
import image4 from "../../assets/image4.jpg";
import image5 from "../../assets/image5.jpg";

const slides = [
  {
    image: image2,
    title: "Welcome to Rasoi",
    desc: "Delicious food from your favorite local restaurants",
  },
  {
    image: image3,
    title: "Fresh & Hygienic",
    desc: "Quality meals prepared with love and care",
  },
  {
    image: image4,
    title: "Fast Delivery",
    desc: "Get your food delivered hot & fresh at your doorstep",
  },
  {
    image: image5,
    title: "Explore Variety",
    desc: "From street food to premium dining options",
  },
];

function CustomerHome() {
  const [current, setCurrent] = useState(0);
  const [loaded, setLoaded] = useState({});
  const [isInteracting, setIsInteracting] = useState(false);

  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  const minSwipeDistance = 50;

  // ✅ Auto slide (pause when user interacts)
  useEffect(() => {
    if (isInteracting) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isInteracting]);

  // ✅ Preload next image
  useEffect(() => {
    const next = (current + 1) % slides.length;
    const img = new Image();
    img.src = slides[next].image;
  }, [current]);

  // =========================
  // 🔥 Swipe / Drag Logic
  // =========================
  const handleStart = (x) => {
    setIsInteracting(true);
    touchEndX.current = null;
    touchStartX.current = x;
  };

  const handleMove = (x) => {
    touchEndX.current = x;
  };

  const handleEnd = () => {
    if (!touchStartX.current || !touchEndX.current) {
      setIsInteracting(false);
      return;
    }

    const distance = touchStartX.current - touchEndX.current;

    if (distance > minSwipeDistance) {
      // Next
      setCurrent((prev) => (prev + 1) % slides.length);
    } else if (distance < -minSwipeDistance) {
      // Prev
      setCurrent((prev) =>
        prev === 0 ? slides.length - 1 : prev - 1
      );
    }

    setIsInteracting(false);
  };

  return (
    <div>
      <Header />

      <div className="w-full mb-6">
        <div className="relative overflow-hidden">

          {/* 🔥 Slider */}
          <div
            className="relative h-[65vh] md:h-[85vh] overflow-hidden cursor-grab active:cursor-grabbing"
            onTouchStart={(e) => handleStart(e.touches[0].clientX)}
            onTouchMove={(e) => handleMove(e.touches[0].clientX)}
            onTouchEnd={handleEnd}
            onMouseDown={(e) => handleStart(e.clientX)}
            onMouseMove={(e) => handleMove(e.clientX)}
            onMouseUp={handleEnd}
            onMouseLeave={handleEnd}
          >

            {/* 🔥 Slides Container */}
            <div
              className="flex h-full transition-transform duration-700 ease-in-out"
              style={{
                transform: `translateX(-${current * 100}%)`,
              }}
            >
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className="min-w-full h-full relative"
                >
                  {/* Skeleton */}
                  {!loaded[index] && (
                    <div className="absolute inset-0 animate-pulse bg-gray-800" />
                  )}

                  {/* Image */}
                  <img
                    src={slide.image}
                    alt={slide.title}
                    loading="lazy"
                    onLoad={() =>
                      setLoaded((prev) => ({
                        ...prev,
                        [index]: true,
                      }))
                    }
                    className={`w-full h-full object-cover transition-opacity duration-500 ${
                      loaded[index] ? "opacity-100" : "opacity-0"
                    }`}
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/50" />

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
                    <h1 className="text-3xl md:text-6xl font-bold text-white mb-4">
                      {slide.title}
                    </h1>
                    <p className="text-lg md:text-xl text-gray-200 max-w-xl">
                      {slide.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* 🔥 Dots */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`h-2 rounded-full transition-all ${
                    current === index
                      ? "w-6 bg-orange-500"
                      : "w-2 bg-gray-400"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <TrendingMeals />
      <PopularMeals />
      
      <Category />
      <Meals />
      <Footer />
    </div>
  );
}

export default CustomerHome;