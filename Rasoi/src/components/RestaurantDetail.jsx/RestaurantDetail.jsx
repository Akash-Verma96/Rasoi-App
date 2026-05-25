import React, { useEffect, useState } from "react";
import {
  Star,
  Clock3,
  MapPin,
  Phone,
  Heart,
  ShoppingCart,
  Bike,
  Flame,
  ChevronRight,
  Plus,
} from "lucide-react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../utils/constant";
import {toast} from "react-toastify"

// const menuItems = [
//   {
//     id: 1,
//     name: "Paneer Butter Masala",
//     desc: "Rich creamy gravy with soft paneer cubes and Indian spices.",
//     price: 249,
//     rating: 4.8,
//     image:
//       "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=1200&auto=format&fit=crop",
//   },
//   {
//     id: 2,
//     name: "Veg Biryani",
//     desc: "Aromatic basmati rice cooked with vegetables and spices.",
//     price: 199,
//     rating: 4.7,
//     image:
//       "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=80&w=1200&auto=format&fit=crop",
//   },
//   {
//     id: 3,
//     name: "Tandoori Momos",
//     desc: "Spicy grilled momos served with creamy dip.",
//     price: 179,
//     rating: 4.6,
//     image:
//       "https://images.unsplash.com/photo-1626776876729-bab4369a5a5f?q=80&w=1200&auto=format&fit=crop",
//   },
// ];

export default function RestaurantDetail() {
    const {restaurantId} = useParams();
    const [restaurant, setRestaurant] = useState({});
    const [menuItems, setMenuItems] = useState([]);


    const fetchRestaurant = async ()=>{
        try {
            const res = await axios.get(BASE_URL + "/restaurantDetail/" + restaurantId, {withCredentials : true});

            setRestaurant(res.data);
            const meals = await axios.get(BASE_URL + "/restaurantDetail/meals/" + restaurantId, {withCredentials : true});
            
            setMenuItems(meals.data);
        } catch (error) {
            res.send(error.message);
        }
    }

    const handleAddToCart = async (mealId,quantity) => {
    try {
      const res = await axios.post(BASE_URL + "/mealDetail/" + mealId,{
        quantity
      },{withCredentials:true});

       toast.success("Meal added to cart", {
        position: "top-right",
        autoClose: 2000,
        theme: "dark",
      });

    } catch (error) {
      console.log(error.message)
    }
  };

    useEffect(()=>{
        fetchRestaurant();
    },[])

  return (
    <div className="min-h-screen bg-linear-to-br from-orange-50 via-white to-orange-100">
      {/* HERO SECTION */}
      <div className="relative h-80 md:h-105 w-full overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1600&auto=format&fit=crop"
          alt="restaurant"
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/45" />

        {/* TOP CONTENT */}
        <div className="absolute inset-0 flex flex-col justify-end px-5 md:px-14 pb-8">
          <div className="max-w-5xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-orange-500 text-white text-xs px-3 py-1 rounded-full font-medium">
                PURE VEG
              </span>

              <span className="bg-white/20 backdrop-blur-md border border-white/20 text-white text-xs px-3 py-1 rounded-full">
                Best Seller
              </span>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <div>
                <h1 className="text-3xl md:text-5xl font-bold text-white">
                    {restaurant.restaurantName}
                </h1>

                <p className="text-orange-100 mt-3 max-w-2xl text-sm md:text-base">
                  {restaurant.address} • Chinese • Fast Food • Desserts
                </p>

                <div className="flex flex-wrap items-center gap-4 mt-5 text-white/90 text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-orange-400 text-orange-400" />
                    <span>4.8 (2.4k reviews)</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <Clock3 className="w-4 h-4" />
                    <span>25-30 mins</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <Bike className="w-4 h-4" />
                    <span>Free Delivery</span>
                  </div>
                </div>
              </div>

              {/* ACTIONS */}
              <div className="flex items-center gap-3">
                <button className="bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/20 text-white p-3 rounded-2xl transition">
                  <Heart className="w-5 h-5" />
                </button>

                <button className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-2xl font-semibold flex items-center gap-2 transition shadow-lg shadow-orange-500/30">
                  <ShoppingCart className="w-5 h-5" />
                  Order Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT SECTION */}
          <div className="lg:col-span-2 space-y-8">
            {/* OFFER CARD */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-orange-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="bg-orange-100 p-3 rounded-2xl">
                    <Flame className="text-orange-500 w-6 h-6" />
                  </div>

                  <div>
                    <h3 className="font-bold text-lg text-gray-800">
                      50% OFF up to ₹100
                    </h3>
                    <p className="text-sm text-gray-500">
                      Use coupon RASOI50 on orders above ₹299
                    </p>
                  </div>
                </div>

                <ChevronRight className="text-gray-400" />
              </div>
            </div>

            {/* MENU */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  Popular Dishes
                </h2>
              </div>

              <div className="space-y-5">
                
                {menuItems.length === 0 ? (<div className="text-gray-600 font-semibold text-lg text-center" >No Meals Available</div>) : menuItems.map((item) => (
                  <div
                    key={item._id}
                    className="bg-white rounded-3xl p-4 shadow-sm border border-orange-100 hover:shadow-xl transition duration-300"
                  >
                    <div className="flex flex-col sm:flex-row gap-5">
                      {/* IMAGE */}
                      <div className="relative w-full sm:w-45 h-45 rounded-2xl overflow-hidden shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* DETAILS */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <h3 className="text-xl font-bold text-gray-800">
                                {item.name}
                              </h3>

                              <div className="flex items-center gap-1 mt-1">
                                <Star className="w-4 h-4 fill-orange-400 text-orange-400" />
                                <span className="text-sm text-gray-600">
                                  4.8
                                </span>
                              </div>
                            </div>

                            <p className="text-xl font-bold text-orange-500">
                              ₹{item.price}
                            </p>
                          </div>

                          <p className="text-gray-500 mt-3 text-sm leading-relaxed">
                            {item.description}
                          </p>
                        </div>

                        <div className="mt-5 flex items-center justify-between">
                          <button className="text-sm text-orange-500 font-semibold hover:text-orange-600">
                            Customize
                          </button>

                          <button onClick={()=>handleAddToCart(item._id,1)} className="bg-orange-500 cursor-pointer hover:bg-orange-600 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 transition">
                            <Plus className="w-4 h-4" />
                            Add
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SECTION */}
          <div className="space-y-6">
            {/* RESTAURANT INFO */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-orange-100 sticky top-5">
              <h3 className="text-xl font-bold text-gray-800 mb-6">
                Restaurant Info
              </h3>

              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="bg-orange-100 p-2.5 rounded-xl">
                    <MapPin className="w-5 h-5 text-orange-500" />
                  </div>

                  <div>
                    <p className="font-semibold text-gray-800">
                      Location
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      {restaurant.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-orange-100 p-2.5 rounded-xl">
                    <Phone className="w-5 h-5 text-orange-500" />
                  </div>

                  <div>
                    <p className="font-semibold text-gray-800">
                      Contact
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      +91 98765 43210
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-orange-100 p-2.5 rounded-xl">
                    <Clock3 className="w-5 h-5 text-orange-500" />
                  </div>

                  <div>
                    <p className="font-semibold text-gray-800">
                      Opening Hours
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      10:00 AM - 11:00 PM
                    </p>
                  </div>
                </div>
              </div>

              {/* CART */}
              {/* <div className="mt-8 bg-linear-to-r from-orange-500 to-orange-600 rounded-2xl p-5 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-orange-100">
                      0
                    </p>

                    <h4 className="text-2xl font-bold mt-1">
                      0
                    </h4>
                  </div>

                  <button className="bg-white text-orange-600 hover:bg-orange-50 px-5 py-2.5 rounded-xl font-semibold transition">
                    View Cart
                  </button>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}