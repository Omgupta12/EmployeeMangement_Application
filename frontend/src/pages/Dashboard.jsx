import EmployeeList from "../components/EmployeeList";

const Dashboard = () => {
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-2xl font-bold text-center mb-6">Employee Management Dashboard</h1>
            <EmployeeList />
        </div>
    );
};

export default Dashboard;
