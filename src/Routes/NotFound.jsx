import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
            <h1 className="text-3xl font-bold mb-4">404 | Not Found</h1>
            <button
                data-testid="back"
                onClick={() => navigate(-1)}
                className="bg-blue-500 text-white p-4 rounded hover:bg-blue-600"
            >
                Go Back
            </button>
        </div>
    );
};

export default NotFound;
