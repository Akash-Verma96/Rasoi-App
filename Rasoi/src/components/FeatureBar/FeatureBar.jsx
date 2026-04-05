import React, { useEffect, useState } from "react";
import { Home, Grid, ShoppingCart, User, LayoutGrid } from "lucide-react";
import { Link } from "react-router-dom";

function FeatureBar() {
  const [openBar, setOpenBar] = useState(true);
  const [showHint, setShowHint] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const [position, setPosition] = useState({ x: 50, y: 100 });
  const [dragging, setDragging] = useState(false);

  // ✅ Toggle bar + remove intro
  const handleOpenBar = () => {
    setOpenBar((prev) => !prev);

    if (showIntro || showHint) {
      setShowIntro(false);
      setShowHint(false);
      localStorage.setItem("featureBarHint", "true");
    }
  };

  // ✅ Drag logic
  const handleMouseDown = () => setDragging(true);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (dragging) {
        setPosition({
          x: e.clientX - 20,
          y: e.clientY - 20,
        });
      }
    };

    const handleMouseUp = () => setDragging(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging]);

  // ✅ First-time intro logic
  useEffect(() => {
    const hasSeen = localStorage.getItem("featureBarHint");

    if (!hasSeen) {
      setShowIntro(true);
      setShowHint(true);
    }
  }, []);

  return (
    <>
      {/* 🔥 Overlay */}
      {showIntro && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"></div>
      )}

      {/* 🔘 Floating Button */}
      <div
        style={{
          position: "fixed",
          left: position.x,
          top: position.y,
          zIndex: showIntro ? 50 : 10,
        }}
        onMouseDown={handleMouseDown}
        className={`
          rounded-lg p-2 cursor-pointer transition duration-300
          ${
            showIntro
              ? "bg-orange-500 shadow-[0_0_25px_rgba(255,140,0,1)] scale-110"
              : "bg-orange-600 opacity-20 hover:opacity-100 hover:scale-110"
          }
        `}
      >
        <LayoutGrid size={24} onClick={handleOpenBar} />
      </div>

      {/* 💬 Hint */}
      {showHint && (
        <div
          style={{
            position: "fixed",
            left: position.x,
            top: position.y - 70,
            zIndex: 50,
          }}
          className="
            relative
            max-w-55
            text-xs sm:text-sm
            bg-orange-500 text-white
            px-4 py-2 rounded-lg
            shadow-[0_0_20px_rgba(255,140,0,0.9)]
            animate-bounce
          "
        >
          👇 Tap here to open or close the quick menu. On desktop devices, you can also drag it to reposition as needed.

          <div className="absolute left-1/2 -bottom-2 -translate-x-1/2 w-3 h-3 bg-orange-500 rotate-45"></div>
        </div>
      )}

      {/* 📱 Bottom Bar */}
      <div
        className={`
          fixed bottom-4 left-1/2 -translate-x-1/2 
          w-[95%] sm:w-[80%] md:w-[60%] lg:w-[40%] 
          z-50 transition-all duration-500
          ${
            openBar
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10 pointer-events-none"
          }
        `}
      >
        <ul
          className="flex justify-around items-center 
          bg-black/50 backdrop-blur-lg 
          border border-orange-400/40 
          shadow-[0_0_25px_rgba(255,140,0,0.6)] 
          rounded-2xl px-4 py-3"
        >
          <Link to="/home" className="flex flex-col items-center text-orange-400 hover:text-orange-300 hover:scale-110 transition">
            <Home size={22} />
            <span className="text-xs mt-1">Home</span>
          </Link>

          <Link to="/cart" className="flex flex-col items-center text-orange-400 hover:text-orange-300 hover:scale-110 transition">
            <ShoppingCart size={22} />
            <span className="text-xs mt-1">Cart</span>
          </Link>

          <Link to="/orders" className="flex flex-col items-center text-orange-400 hover:text-orange-300 hover:scale-110 transition">
            <Grid size={22} />
            <span className="text-xs mt-1">Orders</span>
          </Link>

          <Link to="/profile" className="flex flex-col items-center text-orange-400 hover:text-orange-300 hover:scale-110 transition">
            <User size={22} />
            <span className="text-xs mt-1">Profile</span>
          </Link>
        </ul>
      </div>
    </>
  );
}

export default FeatureBar;