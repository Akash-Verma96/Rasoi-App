import React, { useEffect, useState } from "react";
import { Home, Grid, ShoppingCart, User, LayoutGrid } from "lucide-react";
import { Link } from "react-router-dom";

function FeatureBar() {

  const [openBar,setOpenBar] = useState(false);
  const [position, setPosition] = useState({ x: 50, y: 100 });
  const [dragging, setDragging] = useState(false);

  const handleOpenBar = ()=>{
    setOpenBar(!openBar);
  }

  const handleMouseDown = () => {
    setDragging(true);
  };
useEffect(() => {
    const handleMouseMove = (e) => {
      if (dragging) {
        setPosition({
          x: e.clientX - 20,
          y: e.clientY - 20,
        });
      }
    };

    const handleMouseUp = () => {
      setDragging(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging]);

  return (
    <>
    <div
      style={{
        position: "fixed",
        left: position.x,
        top: position.y,
      }}
      onMouseDown={handleMouseDown}
      className="opacity-20 hover:opacity-100 bg-orange-600 rounded-lg p-2 cursor-pointer hover:scale-110 transition duration-300"
    >
      <LayoutGrid size={24} onClick={handleOpenBar} />
    </div>

    <div className={`
      fixed bottom-4 left-1/2 -translate-x-1/2 
      w-[95%] sm:w-[80%] md:w-[60%] lg:w-[40%] 
      z-50 transition-all duration-500
      ${openBar ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"}
    `}>

      <ul
        className="flex justify-around items-center 
        bg-black/50 backdrop-blur-lg 
        border border-orange-400/40 
        shadow-[0_0_25px_rgba(255,140,0,0.6)] 
        rounded-2xl px-4 py-3"
      >
        <Link to={"/home"} className="flex flex-col items-center text-orange-400 hover:text-orange-300 transition duration-300 cursor-pointer hover:scale-110">
          <Home size={22} />
          <span className="text-xs mt-1">Home</span>
        </Link>

        <Link to={"cart"} className="flex flex-col items-center text-orange-400 hover:text-orange-300 transition duration-300 cursor-pointer hover:scale-110">
          <ShoppingCart size={22} />
          <span className="text-xs mt-1">Cart</span>
        </Link>

        <Link to={"orders"} className="flex flex-col items-center text-orange-400 hover:text-orange-300 transition duration-300 cursor-pointer hover:scale-110">
          <Grid size={22} />
          <span className="text-xs mt-1">My Orders</span>
        </Link>

        <Link to={"profile"} className="flex flex-col items-center text-orange-400 hover:text-orange-300 transition duration-300 cursor-pointer hover:scale-110">
          <User size={22} />
          <span className="text-xs mt-1">Profile</span>
        </Link>
      </ul>

    </div>
    </>
  );
}

export default FeatureBar;