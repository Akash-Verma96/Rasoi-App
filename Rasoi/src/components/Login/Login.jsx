import React, { useState } from "react";
import { Flame } from "lucide-react";
import axios from "axios";
import { BASE_URL } from "../../utils/constant";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../../utils/userSlice";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true },
      );

      dispatch(addUser(res.data));
      alert("Login succesfull !");
      
      if (res.data.data.role === "customer") {
        return navigate("/home");
      } else if (res.data.data.role === "restaurant") {
        return navigate("/restaurant/Dashboard");
      }
    } catch (err) {
      setError(err?.response?.data);
    }
  };

  const handleSignUp = async () => {
    try {
      setError("");
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          firstName,
          lastName,
          emailId,
          password,
          role,
        },
        { withCredentials: true },
      );

      alert("Sign Up Succesfull !");
      if (role === "customer") {
        return navigate("/home");
      } else if (role === "restaurant") {
        return navigate("/restaurant/Profile");
      }
    } catch (err) {
      setError(err?.response?.data);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-linear-to-br ">
      <div className="w-full max-w-md backdrop-blur-xl  border border-orange-200 shadow-lg shadow-orange-200 rounded-3xl p-8">
        {/* Logo Section */}
        <div className="flex flex-col items-center mb-6">
          <div className="bg-linear-to-r from-orange-500 to-red-500 p-3 rounded-2xl shadow-lg shadow-orange-400/40">
            <Flame className="text-white" size={28} />
          </div>
          <h2 className="text-3xl font-bold mt-4 bg-linear-to-r from-orange-600 to-red-500 bg-clip-text text-transparent">
            Rasoi
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            {isLogin ? "Welcome back!" : "Create your food account"}
          </p>
        </div>

        <h3 className="text-xl font-semibold text-center mb-6">
          {isLogin ? "Login" : "Sign Up"}
        </h3>

        {!isLogin && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border border-orange-200 focus:ring-2 focus:ring-orange-400 focus:outline-none transition"
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border border-orange-200 focus:ring-2 focus:ring-orange-400 focus:outline-none transition"
            />
          </div>
        )}

        <div className="mt-4">
          <input
            type="email"
            placeholder="Email address"
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
            className="w-full px-4 py-2 rounded-xl border border-orange-200 focus:ring-2 focus:ring-orange-400 focus:outline-none transition"
          />
        </div>

        <div className="mt-4">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-xl border border-orange-200 focus:ring-2 focus:ring-orange-400 focus:outline-none transition"
          />
        </div>

        {!isLogin && (
          <div className="mt-4">
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-2 rounded-xl bg-orange-500  bg-linear-to-r from-orange-500 via-orange-600 to-red-500 border border-orange-200 focus:ring-2 focus:ring-orange-400 focus:outline-none transition"
            >
              <option value="">Select Role</option>
              <option value="customer">Customer</option>
              <option value="restaurant">Restaurant</option>
              <option value="delivery">Delivery Partner</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        )}

        <div className="flex items-center justify-between mt-4 text-sm">
          <label className="flex items-center gap-2 text-gray-600">
            <input type="checkbox" className="accent-orange-500" />
            Remember me
          </label>
          <a href="#" className="text-orange-500 hover:underline">
            Forgot?
          </a>
        </div>

        {error && (
          <p className="text-red-500 text-sm mt-3 text-center">{error}</p>
        )}

        <button
          onClick={isLogin ? handleLogin : handleSignUp}
          className="w-full mt-6 py-2.5 rounded-2xl font-semibold text-white bg-linear-to-r from-orange-500 via-orange-600 to-red-500 shadow-lg shadow-orange-400/40 hover:scale-105 active:scale-95 transition-all duration-300"
        >
          {isLogin ? "Sign In" : "Create Account"}
        </button>

        <p className="mt-6 text-center text-sm text-gray-600">
          {isLogin ? "Don’t have an account?" : "Already have an account?"}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="ml-1 font-semibold text-orange-600 hover:underline"
          >
            {isLogin ? "Sign Up" : "Sign In"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
