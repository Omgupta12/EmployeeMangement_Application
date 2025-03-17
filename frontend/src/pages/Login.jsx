import { useState } from "react";
import { login } from "../api/authService";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("admin@gmail.com"); 
    const [password, setPassword] = useState(""); 
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate("/dashboard");
        } catch (error) {
            alert("User not authorized");
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-200">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-lg">
                <h2 className="text-xl font-bold mb-4">Admin Login</h2>

                <input
                    type="email"
                    placeholder="Email"
                    className="border p-2 w-full mt-2"
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="border p-2 w-full mt-2"
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit" className="bg-blue-500 text-white p-2 w-full mt-4">
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
