import React from "react";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

export default function RasoiFooter() {
  return (
    <footer className="bg-[#0f0f0f] text-gray-300 pt-16 pb-6 px-6">
      
      <div className="max-w-7xl mx-auto">
        
        {/* 🔥 Top Border Glow */}
        <div className="h-px w-full bg-linear-to-r from-transparent via-orange-500 to-transparent mb-12"></div>

        {/* 🔥 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">
          
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <h2 className="text-2xl font-bold text-white tracking-wide">
              Rasoi
            </h2>

            <p className="text-sm leading-relaxed max-w-xs">
              Discover delicious homemade recipes and order your favorite meals
              with ease. Fresh ingredients, authentic taste, and fast delivery
              at your doorstep.
            </p>

            <div className="flex gap-4 mt-3">
              <a className="hover:text-orange-400 transition hover:scale-110">
                <Facebook size={20} />
              </a>
              <a className="hover:text-orange-400 transition hover:scale-110">
                <Instagram size={20} />
              </a>
              <a className="hover:text-orange-400 transition hover:scale-110">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Support */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <h3 className="text-lg font-semibold text-white">Support</h3>

            <ul className="space-y-2 text-sm">
              <li><a className="hover:text-orange-400 transition">FAQs</a></li>
              <li><a className="hover:text-orange-400 transition">Privacy Policy</a></li>
              <li><a className="hover:text-orange-400 transition">Terms & Conditions</a></li>
              <li><a className="hover:text-orange-400 transition">Refund Policy</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <h3 className="text-lg font-semibold text-white">Contact Us</h3>

            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <MapPin size={16} className="text-orange-400" />
                Varanasi Uttar Pradesh India
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-orange-400" />
                +91 8004243893
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-orange-400" />
                support@rasoi.com
              </li>
            </ul>
          </div>

        </div>

        {/* 🔥 Bottom Section */}
        <div className="mt-12 pt-6 border-t border-gray-800 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} 
          <span className="text-orange-400 font-medium"> Rasoi</span>. All rights reserved.
        </div>
      </div>
    </footer>
  );
}