import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditStudent = () => {
    const { id } = useParams();
    const [studentData, setStudentData] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const response = await fetch(`http://localhost:3001/student/${id}`);
                const data = await response.json();
                setStudentData(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching student data:", error);
            }
        };

        fetchStudent();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudentData({ ...studentData, [name]: value });
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

        const faculty = facultyMap[studentData.programStudy];
        const updatedStudentData = { ...studentData, faculty };

        try {
            await fetch(`http://localhost:3001/student/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedStudentData),
            });
            navigate("/student");
        } catch (error) {
            console.error("Error updating student data:", error);
        }
    };

    if (loading) {
        return <p>Loading ...</p>;
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white shadow-md rounded">
            <img src={studentData.profilePicture} alt="Profile" className="w-32 h-32 rounded-full mx-auto" />
            <input
                type="text"
                name="fullname"
                value={studentData.fullname}
                onChange={handleChange}
                data-testid="name"
                className="w-full p-2 border border-gray-300 rounded"
            />
            <input
                type="text"
                name="address"
                value={studentData.address}
                onChange={handleChange}
                data-testid="address"
                className="w-full p-2 border border-gray-300 rounded"
            />
            <input
                type="text"
                name="phoneNumber"
                value={studentData.phoneNumber}
                onChange={handleChange}
                data-testid="phoneNumber"
                className="w-full p-2 border border-gray-300 rounded"
            />
            <input
                type="date"
                name="birthDate"
                value={studentData.birthDate}
                onChange={handleChange}
                data-testid="date"
                className="w-full p-2 border border-gray-300 rounded"
            />
            <select
                name="gender"
                value={studentData.gender}
                onChange={handleChange}
                data-testid="gender"
                className="w-full p-2 border border-gray-300 rounded"
            >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
            </select>
            <select
                name="programStudy"
                value={studentData.programStudy}
                onChange={handleChange}
                data-testid="prody"
                className="w-full p-2 border border-gray-300 rounded"
            >
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
            <button type="submit" data-testid="edit-btn" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                Edit Student
            </button>
        </form>
    );
};

export default EditStudent;
