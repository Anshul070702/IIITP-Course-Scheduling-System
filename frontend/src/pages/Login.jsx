import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginAPI } from "../utils/constants";
import Cookies from "js-cookie";
import { Mail, Lock, LogIn } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (isLoggedIn) navigate("/home");
  }, [isLoggedIn]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    const data = { email, password };
    try {
      const response = await fetch(loginAPI, {
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

        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error("There was a problem with your fetch operation:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-blue-600 flex justify-center items-center p-6">
      <div className="bg-white/80 text-center p-8 rounded-3xl shadow-lg w-full max-w-md transition-all duration-300">
        <div className="mb-8">
          <h1 className="text-4xl font-semibold text-gray-800 mb-3">
            Welcome Back!
          </h1>
          <p className="text-gray-500">Log in to access your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-5">
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Email"
                className="w-full pl-10 pr-4 py-3 bg-gray-100 border border-gray-200 rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-300"
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full pl-10 pr-4 py-3 bg-gray-100 border border-gray-200 rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-300"
              />
              <label className="flex flex-row-reverse items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                  className="m-1"
                />
              </label>
            </div>
          </div>

          <button className="w-full bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white py-3 px-4 rounded-2xl font-semibold shadow-md flex items-center justify-center space-x-2 transition-transform duration-200 transform hover:scale-[1.03]">
            <LogIn className="h-5 w-5" />
            <span>Sign In</span>
          </button>
        </form>

        <div className="mt-8 text-sm">
          <p className="text-gray-500">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-indigo-600 font-semibold hover:text-indigo-700 transition-colors duration-300"
            >
              Signup
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
