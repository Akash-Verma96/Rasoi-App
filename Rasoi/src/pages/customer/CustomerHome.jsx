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
     
      <PopularMeals />
      <Category />
      <Meals />
      <Footer />
    </div>
  );
}

export default CustomerHome;
