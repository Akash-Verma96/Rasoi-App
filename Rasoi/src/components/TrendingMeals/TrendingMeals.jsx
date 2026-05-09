import { Link } from "react-router-dom";

const dummyMeals = [
  {
    _id: "1",
    name: "Paneer Butter Masala",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398",
    price: 199,
    restaurantName: "Spice Hub",
  },
  {
    _id: "2",
    name: "Chicken Biryani",
    image: "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f",
    price: 249,
    restaurantName: "Biryani House",
  },
  {
    _id: "3",
    name: "Veg Pizza",
    image: "https://images.unsplash.com/photo-1601924582975-7e3d1c9b1d6c",
    price: 149,
    restaurantName: "Pizza Corner",
  },
  {
    _id: "4",
    name: "Masala Dosa",
    image: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3",
    price: 99,
    restaurantName: "South Express",
  },
];

const TrendingMeals = () => {
  return (
    <div className="w-full py-6 overflow-hidden">

      {/* Heading */}
      <div className="px-4 mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
          
          <span className="text-orange-500 drop-shadow-[0_0_6px_rgba(249,115,22,0.7)]">
            🔥
          </span>

          <span className="bg-linear-to-r from-orange-500 via-orange-600 to-orange-400 bg-clip-text text-transparent">
            Trending Meals
          </span>
        </h2>

        <div className="mt-2 h-0.5 w-full bg-linear-to-r from-orange-500 to-transparent rounded-full"></div>
      </div>

      {/* Scroll Container */}
      <div className="relative overflow-hidden">

        {/* Track */}
        <div
          className="
          flex gap-4 w-max
          animate-scroll
          hover:[animation-play-state:paused]
          "
        >

          {[...dummyMeals, ...dummyMeals].map((meal, index) => (
            <div
              key={index}
              className="
              min-w-65
              bg-orange-100/70 backdrop-blur-lg
              border border-orange-200
              rounded-2xl overflow-hidden
              shadow-md hover:shadow-xl
              transition duration-300
              "
            >
             

              {/* Content */}
              <div className="p-3">
                <h3 className="text-sm font-semibold text-orange-600">
                  {meal.name}
                </h3>

                <p className="inline-block text-xs rounded bg-linear-to-r from-orange-200 via-orange-300 to-orange-200   border border-orange-200 text-gray-800">
                  {meal.restaurantName}
                </p>

                <div className="flex justify-between items-center mt-2">
                  <span className="text-orange-600 font-semibold text-sm">
                    ₹{meal.price}
                  </span>

                  {/* <Link
                    to={`/meal/${meal._id}`}
                    className="text-xs text-white bg-orange-500 px-2 py-1 rounded-md hover:bg-orange-600 transition"
                  >
                    View
                  </Link> */}
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default TrendingMeals;