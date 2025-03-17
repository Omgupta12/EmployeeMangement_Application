import { useEffect, useState } from "react";
import { getEmployees, deleteEmployee } from "../api/employeeService";
import EmployeeForm from "./EmployeeForm";
import Pagination from "./Pagination";

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [editEmployee, setEditEmployee] = useState(null);

    useEffect(() => {
        fetchEmployees();
    }, [page, search]);

    const fetchEmployees = async () => {
        try {
            const data = await getEmployees(page, search);

            if (data && data.employees) {
                setEmployees(data.employees);
                setTotalPages(Math.ceil(data.total / 5) || 1);
            } else {
                setEmployees([]);
                setTotalPages(1);
            }
        } catch (error) {
            console.error("Error fetching employees", error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this employee?")) {
            await deleteEmployee(id);
            fetchEmployees();
        }
    };

    return (
        <div className="p-4 sm:p-6 max-w-6xl mx-auto">
            {/* Search & Add Employee */}
            <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <input
                    type="text"
                    placeholder="Search by name"
                    className="border p-2 w-full sm:w-1/3 rounded-md focus:ring focus:ring-blue-300"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                    onClick={() => setEditEmployee(null)}
                >
                    + Add Employee
                </button>
            </div>

            {/* Employee Form */}
            <EmployeeForm employee={editEmployee} refresh={fetchEmployees} />

            <div className="overflow-x-auto mt-4">
                <table className="w-full border-collapse border border-gray-300 min-w-[600px]">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border p-2">Name</th>
                            <th className="border p-2">Location</th>
                            <th className="border p-2">Branch</th>
                            <th className="border p-2">Salary</th>
                            <th className="border p-2">Birthdate</th>
                            <th className="border p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((emp) => (
                            <tr key={emp._id} className="hover:bg-gray-100">
                                <td className="border p-2">{emp.name}</td>
                                <td className="border p-2">{emp.location}</td>
                                <td className="border p-2">{emp.branch}</td>
                                <td className="border p-2">Rs {emp.basicSalary}</td>
                                <td className="border p-2">{emp.birthdate}</td>
                                <td className="border p-2 flex justify-center gap-2">
                                    <button
                                        className="text-blue-500 hover:text-blue-700"
                                        onClick={() => setEditEmployee(emp)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="text-red-500 hover:text-red-700"
                                        onClick={() => handleDelete(emp._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <Pagination page={page} totalPages={totalPages} setPage={setPage} />
        </div>
    );
};

export default EmployeeList;
