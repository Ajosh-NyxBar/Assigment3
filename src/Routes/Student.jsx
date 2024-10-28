import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Student = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("All");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await fetch("http://localhost:3001/student");
                const data = await response.json();
                setStudents(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching students:", error);
            }
        };

        fetchStudents();
    }, []);

    const handleDelete = async (id) => {
        try {
            await fetch(`http://localhost:3001/student/${id}`, {
                method: "DELETE",
            });
            setStudents(students.filter((student) => student.id !== id));
        } catch (error) {
            console.error("Error deleting student:", error);
        }
    };

    const filteredStudents = students.filter((student) => {
        if (filter === "All") return true;
        return student.faculty === filter;
    });

    return (
        <div className="p-4">
            {loading ? (
                <p>Loading ...</p>
            ) : (
                <>
                    <select
                        data-testid="filter"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="mb-4 p-2 border border-gray-300 rounded"
                    >
                        <option value="All">All</option>
                        <option value="Fakultas Ekonomi">Fakultas Ekonomi</option>
                        <option value="Fakultas Ilmu Sosial dan Politik">
                            Fakultas Ilmu Sosial dan Politik
                        </option>
                        <option value="Fakultas Teknik">Fakultas Teknik</option>
                        <option value="Fakultas Teknologi Informasi dan Sains">
                            Fakultas Teknologi Informasi dan Sains
                        </option>
                    </select>
                    <table id="table-student" className="w-full bg-white shadow-md rounded">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="p-2">No</th>
                                <th className="p-2">Full Name</th>
                                <th className="p-2">Faculty</th>
                                <th className="p-2">Program Study</th>
                                <th className="p-2">Option</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredStudents.map((student, index) => (
                                <tr
                                    key={student.id}
                                    className="student-data-row hover:bg-gray-100"
                                >
                                    <td className="p-2 text-center">{index + 1}</td>
                                    <td
                                        onClick={() =>
                                            navigate(`/student/${student.id}`)
                                        }
                                        className="p-2 cursor-pointer text-blue-500 hover:underline"
                                    >
                                        {student.fullname}
                                    </td>
                                    <td className="p-2 text-center">{student.faculty}</td>
                                    <td className="p-2 text-center">{student.programStudy}</td>
                                    <td className="p-2 text-center">
                                        <button
                                            data-testid={`delete-${student.id}`}
                                            onClick={() =>
                                                handleDelete(student.id)
                                            }
                                            className="bg-red-500 text-white p-1 rounded hover:bg-red-600"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
};

export default Student;
