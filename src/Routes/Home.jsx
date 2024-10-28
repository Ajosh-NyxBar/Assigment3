import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate("/student");
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <button
                data-testid="student-btn"
                onClick={handleButtonClick}
                className="bg-blue-500 text-white p-4 rounded hover:bg-blue-600"
            >
                All Student
            </button>
        </div>
    );
};

export default Home;
