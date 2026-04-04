import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const popularMeals = [
  {
    id: 1,
    name: "Masala Dosa",
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7",
    description: "Crispy rice crepe filled with spiced potato masala.",
  },
  {
    id: 2,
    name: "Paneer Tikka",
    image: "https://images.unsplash.com/photo-1701579231378-3726490a407b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGFuaXJ8ZW58MHx8MHx8fDA%3D",
    description: "Grilled cottage cheese cubes marinated in spicy yogurt mix.",
  },
  {
    id: 3,
    name: "Margherita Pizza",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8TWFyZ2hlcml0YSUyMFBpenphfGVufDB8fDB8fHww",
    description:
      "Classic pizza topped with fresh mozzarella, basil, and tomato sauce.",
  },
  {
    id: 4,
    name: "Cheeseburger",
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349",
    description:
      "Juicy grilled patty layered with cheese, lettuce, and sauces.",
  },
  {
    id: 5,
    name: "Chicken Momos",
    image: "https://images.unsplash.com/photo-1625943555419-56a2cb596640",
    description: "Steamed dumplings stuffed with spicy minced chicken.",
  },
  {
    id: 6,
    name: "Chocolate Brownie",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c",
    description: "Rich and fudgy chocolate brownie topped with nuts.",
  },
  {
    id: 7,
    name: "Butter Chicken",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398",
    description:
      "Creamy tomato-based curry with tender chicken and aromatic spices.",
  },
  {
    id: 8,
    name: "Veg Biryani",
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0",
    description:
      "Fragrant basmati rice cooked with fresh vegetables and Indian spices.",
  },
];

function PopularMeals() {
  const navigate = useNavigate();

  const handleNavigate = ()=>{
    return navigate("/mealDetail")
  }
  return (
    <section className="w-full px-4">
      
      <h2 className="text-lg sm:text-xl font-semibold text-orange-400 mb-4">
        Popular Meals 🔥
      </h2>

      {/* Scroll Container */}
      <div className="flex gap-4 overflow-x-auto hide-scrollbar scroll-smooth p-4">
        {popularMeals.map((meal) => (
          <div
            key={meal.id}
            className="flex flex-col sm:flex-row gap-3
            min-w-65 sm:min-w-[320px] md:min-w-90
            bg-white/10 backdrop-blur-lg
            border border-orange-400/30
            rounded-2xl p-4
            shadow-[0_0_15px_rgba(255,140,0,0.3)]
            hover:shadow-[0_0_25px_rgba(255,140,0,0.6)]
            transition duration-300 hover:scale-105"
          >
            
            {/* Image */}
            <img
              src={`${meal.image}?w=500&auto=format&fit=crop`}
              alt={meal.name}
              className="w-full sm:w-32 h-40 sm:h-32 object-cover rounded-xl"
            />

            {/* Content */}
            <div className="flex flex-col justify-between flex-1">
              
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-white">
                  {meal.name}
                </h3>

                <p className="text-xs sm:text-sm text-orange-200 line-clamp-2 mt-1">
                  {meal.description}
                </p>
              </div>

              <button
                onClick={handleNavigate}
                disabled={true}   
                className="cursor-not-allowed mt-3 sm:mt-2 w-full sm:w-auto px-4 py-2 rounded-xl 
                bg-orange-500 text-white font-medium
                hover:bg-orange-600
                hover:shadow-[0_0_12px_rgba(255,140,0,0.8)]
                transition"
              >
                Order Now
              </button>

            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default PopularMeals;