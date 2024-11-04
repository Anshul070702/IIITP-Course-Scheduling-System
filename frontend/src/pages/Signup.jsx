import { signupAPI } from "../utils/constants";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { User, Mail, Lock, LogIn } from "lucide-react"; // Import icons
import Cookies from "js-cookie";

const Signup = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (isLoggedIn) navigate("/home");
  }, [isLoggedIn]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fullName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const data = { fullName, email, password };

    try {
      const response = await fetch(signupAPI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      } else {
        const responseData = await response.json();

        Cookies.set("accessToken", responseData.data.accessToken);
        Cookies.set("refreshToken", responseData.data.refreshToken);

        localStorage.setItem("userData", JSON.stringify(responseData));
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error("There was a problem with your fetch operation:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-blue-600 to-blue-700 p-6">
      <div className="bg-white/80 backdrop-blur-md text-center p-10 rounded-3xl shadow-2xl w-full max-w-md transition-all duration-300 hover:shadow-3xl">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome!</h1>
        <p className="text-gray-500 mb-6">Create an account to get started</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Full Name"
              className="w-full pl-10 pr-4 py-3 bg-gray-100 border border-gray-200 rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-300"
            />
          </div>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="email"
              placeholder="Email"
              className="w-full pl-10 pr-4 py-3 bg-gray-100 border border-gray-200 rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-300"
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              className="w-full pl-10 pr-4 py-3 bg-gray-100 border border-gray-200 rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-300"
            />
          </div>

          <button className="w-full bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white py-3 px-4 rounded-2xl font-semibold shadow-md flex items-center justify-center space-x-2 transition-transform duration-200 transform hover:scale-105">
            <LogIn className="h-5 w-5" />
            <span>Sign Up</span>
          </button>
        </form>

        <p className="text-sm text-gray-500 mt-8">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-600 font-semibold hover:text-indigo-700 transition-colors duration-300"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
