import axios from "axios";

const API_URL = "https://employeemangement-backend.onrender.com/api/employees";

const getAuthHeader = () => {
    const user = localStorage.getItem("user");
    if (!user) return {};
    const parsedUser = JSON.parse(user);
    const token = parsedUser.token;

    return token ? { Authorization: `Bearer ${token}` } : {};
};

// Fetch Employees with Pagination & Search
export const getEmployees = async (page = 1, search = "") => {
    const res = await axios.get(`${API_URL}?page=${page}&search=${search}`, { headers: getAuthHeader() });
    return res.data;
};

// Get Employee by ID
export const getEmployeeById = async (id) => {
    const res = await axios.get(`${API_URL}/${id}`, { headers: getAuthHeader() });
    return res.data;
};

// Add Employee
export const createEmployee = async (employeeData) => {
    return await axios.post(API_URL, employeeData, { headers: getAuthHeader() });
};

// Edit Employee
export const updateEmployee = async (id, employeeData) => {
    return await axios.put(`${API_URL}/${id}`, employeeData, { headers: getAuthHeader() });
};

// Delete Employee
export const deleteEmployee = async (id) => {
    return await axios.delete(`${API_URL}/${id}`, { headers: getAuthHeader() });
};
