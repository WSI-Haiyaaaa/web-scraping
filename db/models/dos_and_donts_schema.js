const mongoose = require("mongoose");

const dosAndDontsSchema = mongoose.Schema({
  countryName: String,
  "Dos": Array,
  "Donts": Array,
});

module.exports = mongoose.model("dos_and_donts", dosAndDontsSchema);
