import React from "react";

const mealCategories = [
  {
    id: 1,
    name: "Breakfast",
    image: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0",
  },
  {
    id: 2,
    name: "Lunch",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
  },
  {
    id: 3,
    name: "Dinner",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0",
  },
  {
    id: 4,
    name: "Snacks",
    image: "https://images.unsplash.com/photo-1599490659213-e2b9527bd087",
  },
  {
    id: 5,
    name: "Desserts",
    image: "https://images.unsplash.com/photo-1551024601-bec78aea704b",
  },
  {
    id: 6,
    name: "Beverages",
    image: "https://images.unsplash.com/photo-1497534446932-c925b458314e",
  },
  {
    id: 7,
    name: "Breakfast",
    image: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0",
  },
  {
    id: 8,
    name: "Lunch",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
  },
  {
    id: 9,
    name: "Dinner",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0",
  },
  {
    id: 10,
    name: "Snacks",
    image: "https://images.unsplash.com/photo-1599490659213-e2b9527bd087",
  },
  {
    id: 11,
    name: "Desserts",
    image: "https://images.unsplash.com/photo-1551024601-bec78aea704b",
  },
  {
    id: 12,
    name: "Beverages",
    image: "https://images.unsplash.com/photo-1497534446932-c925b458314e",
  },
  {
    id: 13,
    name: "Breakfast",
    image: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0",
  },
  {
    id: 14,
    name: "Lunch",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
  },
  {
    id: 15,
    name: "Dinner",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0",
  },
  {
    id: 16,
    name: "Snacks",
    image: "https://images.unsplash.com/photo-1599490659213-e2b9527bd087",
  },
  {
    id: 17,
    name: "Desserts",
    image: "https://images.unsplash.com/photo-1551024601-bec78aea704b",
  },
  {
    id: 18,
    name: "Beverages",
    image: "https://images.unsplash.com/photo-1497534446932-c925b458314e",
  },
];

function Category() {
  return (
    <section className="w-full px-4 py-6">
      <h2 className="text-lg sm:text-xl font-semibold text-orange-400 mb-4">
        Category 🔥
      </h2>

      {/* Scroll Container */}
      <div className="flex gap-4 pt-1 overflow-x-auto scroll-smooth scrollbar-hide">
        {mealCategories.map((meal) => (
          <div
            key={meal.id}
            className="shrink-0 w-28 sm:w-32 flex flex-col items-center gap-2"
          >
            {/* Image */}
            <div
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden 
              border-2 border-orange-400 shadow-md 
              hover:scale-105 transition duration-300"
            >
              <img
                src={`${meal.image}?w=400&auto=format&fit=crop`}
                alt={meal.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Title */}
            <h3 className="text-sm sm:text-base font-medium text-slate-200 text-center">
              {meal.name}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Category;
