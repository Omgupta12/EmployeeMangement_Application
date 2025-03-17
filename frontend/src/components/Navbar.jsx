import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../api/authService";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <nav className="bg-blue-600 p-4 flex justify-between items-center">
            <h1 className="text-white text-xl font-bold">Employee Management</h1>
            <button
                className="text-white text-2xl sm:hidden"
                onClick={() => setMenuOpen(!menuOpen)}
            >
                {menuOpen ? <FaTimes /> : <FaBars />}
            </button>

            <div className="hidden sm:flex">
                <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                >
                    Logout
                </button>
            </div>

            {menuOpen && (
                <div className="absolute top-16 left-0 w-full bg-blue-700 text-white flex flex-col items-center sm:hidden transition-all">
                    <button
                        onClick={handleLogout}
                        className="w-full text-center py-3 hover:bg-red-500 transition"
                    >
                        Logout
                    </button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
