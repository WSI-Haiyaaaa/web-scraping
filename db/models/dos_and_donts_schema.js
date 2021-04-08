const mongoose = require("mongoose");

const dosAndDontsSchema = mongoose.Schema({
  countryName: String,
  "Do's": Array,
  "Don'ts": Array,
});

module.exports = mongoose.model("dos_and_donts", dosAndDontsSchema);
