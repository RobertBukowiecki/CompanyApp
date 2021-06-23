const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  deparment: { type: String, required: true },
});

module.export = mongoose.model("Product", productSchema);
