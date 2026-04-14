import React from "react";
import { Home, Utensils, ShoppingBag, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

function SideBar() {
  const navigate = useNavigate();

  const handleNavigate = () => {
    return navigate("/restaurant/meals");
  };

  const navigateDashboard = () => {
    return navigate("/restaurant/dashboard");
  };
  const navigateOrder = () => {
    return navigate("/restaurant/orders");
  };
  const navigateSetting = () => {
    return navigate("/restaurant/setting");
  };

  return (
    <div>
      {/* Sidebar */}
      <aside className="h-screen w-64 bg-orange-500 text-white p-5 hidden md:flex flex-col shrink-0">
        
        <h1 className="text-2xl font-bold mb-10">Rasoi</h1>

        <nav className="space-y-4">
          
          <div
            onClick={navigateDashboard}
            className="flex items-center gap-3 hover:bg-orange-600 p-2 rounded-lg cursor-pointer"
          >
            <Home size={20} />
            Dashboard
          </div>

          <div
            onClick={handleNavigate}
            className="flex items-center gap-3 hover:bg-orange-600 p-2 rounded-lg cursor-pointer"
          >
            <Utensils size={20} />
            Meals
          </div>

          <div onClick={navigateOrder} className="flex items-center gap-3 hover:bg-orange-600 p-2 rounded-lg cursor-pointer">
            <ShoppingBag size={20} />
            Orders
          </div>

          <div onClick={navigateSetting} className="flex items-center gap-3 hover:bg-orange-600 p-2 rounded-lg cursor-pointer">
            <Settings size={20} />
            Settings
          </div>

        </nav>
      </aside>
    </div>
  );
}

export default SideBar;