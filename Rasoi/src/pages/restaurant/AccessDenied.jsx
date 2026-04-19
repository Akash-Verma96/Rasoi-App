import React from "react";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";

const AccessDenied = () =>{
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-orange-50 to-white px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white shadow-2xl rounded-2xl p-8 text-center"
      >
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-orange-100 p-4 rounded-full">
            <Lock className="text-orange-500 w-10 h-10" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Access Denied
        </h1>

        {/* Subtitle */}
        <p className="text-gray-500 mb-6">
          You don’t have permission to view this page. Please contact admin or go back to a safe place.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => window.history.back()}
            className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
          >
            Go Back
          </button>

          <button
            onClick={() => (window.location.href = "/")}
            className="px-5 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition shadow-md"
          >
            Go Home
          </button>
        </div>

        {/* Footer */}
        <p className="text-xs text-gray-400 mt-6">
          Error Code: 403 Forbidden
        </p>
      </motion.div>
    </div>
  );
}


export default AccessDenied;