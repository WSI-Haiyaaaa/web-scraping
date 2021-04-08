const mongoose = require("mongoose");

const dosAndDontsSchema = mongoose.Schema({
  countryName: String,
  dos: Array,
  donts: Array,
});

module.exports = mongoose.model("dos_and_donts", dosAndDontsSchema);
