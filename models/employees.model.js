const mongoose = require("mongoose");

const employeesSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  deparment: { type: String, required: true },
});