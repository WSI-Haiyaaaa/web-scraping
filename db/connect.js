/** Require mongoose package
 * {@link https://www.npmjs.com/package/mongoose}
    @constant
    @type {object}
 */
const mongoose = require("mongoose");
/** Require dotenv package
 * {@link https://www.npmjs.com/package/dotenv}
    @constant
    @type {object}
 */
require("dotenv").config();

async function connect() {
  await mongoose.connect(process.env.MONGO_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  });
  console.log("db connected successfully");
}

module.exports = { connect };
