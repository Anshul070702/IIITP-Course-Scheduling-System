import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginAPI } from "../utils/constants";
import Cookies from "js-cookie"

const Login = () => {
    const navigate = useNavigate(); 
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(()=>{
        if(isLoggedIn) navigate('/home');
    },[isLoggedIn])
    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;
        const data = { email, password };
        try {
            const response = await fetch(loginAPI, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            } else {
                const responseData = await response.json();

                Cookies.set('accessToken', responseData.data.accessToken); 
                Cookies.set('refreshToken',responseData.data.refreshToken);

                localStorage.setItem('token', responseData.data.accessToken);
                localStorage.setItem('userData', JSON.stringify(responseData));
                setIsLoggedIn(true);
            }
        } catch (error) {
            console.error('There was a problem with your fetch operation:', error);
        }
    };

    return (
        <div className="bg-blue-400 flex justify-center items-center h-screen">
            <div className="bg-white text-center p-4 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold mb-4">Welcome Back !</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">Login </div>
                    <div className="mb-4">
                        <input type="text" placeholder="Email" className="w-full py-2 px-4 border rounded-lg" />
                    </div>
                    <div className="mb-4">
                        <input type="password" placeholder="Password" className="w-full py-2 px-4 border rounded-lg" />
                    </div>
                    <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg mb-4 hover:bg-blue-700 transition duration-300">
                        Sign In
                    </button>
                </form>
                <p className="text-sm">Don't have an account? <Link to="/signup" className="text-blue-600 cursor-pointer">Signup</Link></p>
            </div>
        </div>
    );
};

export default Login;
