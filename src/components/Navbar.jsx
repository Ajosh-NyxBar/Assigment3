import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();

    return (
        <nav className="p-4 bg-blue-500 text-white flex justify-between items-center">
            <h1
                data-testid="home-page"
                onClick={() => navigate("/")}
                className="text-xl font-bold cursor-pointer"
            >
                Student Portal
            </h1>
            <div className="space-x-4">
                <button
                    data-testid="student-page"
                    onClick={() => navigate("/student")}
                    className="bg-white text-blue-500 px-4 py-2 rounded hover:bg-blue-100"
                >
                    All Student
                </button>
                <button
                    data-testid="add-page"
                    onClick={() => navigate("/add")}
                    className="bg-white text-blue-500 px-4 py-2 rounded hover:bg-blue-100"
                >
                    Add Student
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
