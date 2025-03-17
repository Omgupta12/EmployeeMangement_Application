import { useState, useEffect } from "react";
import { createEmployee, updateEmployee } from "../api/employeeService";

const EmployeeForm = ({ employee, refresh }) => {
    const [formData, setFormData] = useState({
        name: "",
        location: "",
        branch: "",
        basicSalary: "",
        birthdate: "",
    });

    useEffect(() => {
        if (employee) {
            setFormData(employee);
        }
    }, [employee]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (employee) {
            await updateEmployee(employee._id, formData);
        } else {
            await createEmployee(formData);
        }
        refresh();
        setFormData({ name: "", location: "", branch: "", basicSalary: "", birthdate: "" });
    };

    return (
        <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6 mt-6 w-full">
            <h2 className="text-xl font-bold mb-4 text-center">
                {employee ? "Update Employee" : "Add Employee"}
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    className="border p-2 rounded w-full focus:ring focus:ring-blue-300"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    className="border p-2 rounded w-full focus:ring focus:ring-blue-300"
                    value={formData.location}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="branch"
                    placeholder="Branch"
                    className="border p-2 rounded w-full focus:ring focus:ring-blue-300"
                    value={formData.branch}
                    onChange={handleChange}
                    required
                />

                <input
                    type="number"
                    name="basicSalary"
                    placeholder="Basic Salary"
                    className="border p-2 rounded w-full focus:ring focus:ring-blue-300"
                    value={formData.basicSalary}
                    onChange={handleChange}
                    required
                />

                <input
                    type="date"
                    name="birthdate"
                    className="border p-2 rounded w-full focus:ring focus:ring-blue-300"
                    value={formData.birthdate}
                    onChange={handleChange}
                    required
                />

                <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300 transition"
                >
                    {employee ? "Update Employee" : "Add Employee"}
                </button>
            </form>
        </div>
    );
};

export default EmployeeForm;
