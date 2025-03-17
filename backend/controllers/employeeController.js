const Employee = require("../models/Employee");

exports.getEmployees = async (req, res) => {
  try {
      const { search, page = 1, limit = 5 } = req.query;
      const query = search
          ? { $or: [{ name: new RegExp(search, "i") }, { email: new RegExp(search, "i") }] }
          : {};

      const total = await Employee.countDocuments(query);
      const employees = await Employee.find(query)
          .limit(limit * 1)
          .skip((page - 1) * limit);

      res.json({ employees, total }); 
  } catch (error) {
      console.error("Error fetching employees:", error);
      res.status(500).json({ message: "Server Error" });
  }
};


exports.getEmployeeById = async (req, res) => {
    try {
      const employee = await Employee.findById(req.params.id);
      if (!employee) return res.status(404).json({ message: "Employee not found" });
      res.json(employee);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  };
  

exports.createEmployee = async (req, res) => {
    const employee = await Employee.create(req.body);
    res.status(201).json(employee);
};

exports.updateEmployee = async (req, res) => {
    try {
      const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!employee) return res.status(404).json({ message: "Employee not found" });
      res.json(employee);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  };
  

exports.deleteEmployee = async (req, res) => {
    await Employee.findByIdAndDelete(req.params.id);
    res.json({ message: "Employee deleted" });
};
