import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddStudent = () => {
    const [formData, setFormData] = useState({
        fullname: "",
        profilePicture: "",
        address: "",
        phoneNumber: "",
        birthDate: "",
        gender: "",
        programStudy: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const facultyMap = {
            Ekonomi: "Fakultas Ekonomi",
            Manajemen: "Fakultas Ekonomi",
            Akuntansi: "Fakultas Ekonomi",
            "Administrasi Publik": "Fakultas Ilmu Sosial dan Politik",
            "Administrasi Bisnis": "Fakultas Ilmu Sosial dan Politik",
            "Hubungan Internasional": "Fakultas Ilmu Sosial dan Politik",
            "Teknik Sipil": "Fakultas Teknik",
            Arsitektur: "Fakultas Teknik",
            Matematika: "Fakultas Teknologi Informasi dan Sains",
            Fisika: "Fakultas Teknologi Informasi dan Sains",
            Informatika: "Fakultas Teknologi Informasi dan Sains",
        };

        const faculty = facultyMap[formData.programStudy];

        const newStudent = { ...formData, faculty };

        try {
            await fetch("http://localhost:3001/student", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newStudent),
            });
            navigate("/student");
        } catch (error) {
            console.error("Error adding student:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white shadow-md rounded">
            <input
                type="text"
                name="fullname"
                data-testid="name"
                value={formData.fullname}
                onChange={handleChange}
                placeholder="Fullname"
                className="w-full p-2 border border-gray-300 rounded"
            />
            <input
                type="text"
                name="profilePicture"
                data-testid="profilePicture"
                value={formData.profilePicture}
                onChange={handleChange}
                placeholder="Profile Picture URL"
                className="w-full p-2 border border-gray-300 rounded"
            />
            <input
                type="text"
                name="address"
                data-testid="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Address"
                className="w-full p-2 border border-gray-300 rounded"
            />
            <input
                type="text"
                name="phoneNumber"
                data-testid="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Phone Number"
                className="w-full p-2 border border-gray-300 rounded"
            />
            <input
                type="date"
                name="birthDate"
                data-testid="date"
                value={formData.birthDate}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
            />
            <select
                name="gender"
                data-testid="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
            >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
            </select>
            <select
                name="programStudy"
                data-testid="prody"
                value={formData.programStudy}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
            >
                <option value="">Select Program Study</option>
                <option value="Ekonomi">Ekonomi</option>
                <option value="Manajemen">Manajemen</option>
                <option value="Akuntansi">Akuntansi</option>
                <option value="Administrasi Publik">Administrasi Publik</option>
                <option value="Administrasi Bisnis">Administrasi Bisnis</option>
                <option value="Hubungan Internasional">Hubungan Internasional</option>
                <option value="Teknik Sipil">Teknik Sipil</option>
                <option value="Arsitektur">Arsitektur</option>
                <option value="Matematika">Matematika</option>
                <option value="Fisika">Fisika</option>
                <option value="Informatika">Informatika</option>
            </select>
            <button type="submit" data-testid="add-btn" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                Add Student
            </button>
        </form>
    );
};

export default AddStudent;
