const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    branch: { type: String, required: true },
    basicSalary: { type: Number, required: true },
    birthdate: { type: Date, required: true },
});

module.exports = mongoose.model("Employee", employeeSchema);
