/** Require the NodeJS file utils librabry
    @constant
    @type {object}
 */
const fs = require("fs");
/** Require the Cheerio third-party librabry
 * {@link https://cheerio.js.org/}
    @constant
    @type {object}
 */
const cheerio = require("cheerio");
/** Require utility functions
    @constant
    @type {object}
 */
const utils = require("./lib/utils.js");
/** Require MongoDB connection
    @constant
    @type {object}
 */
const mdb = require("./db/connect.js");

// Establish db connection
mdb.connect();

/** Contain of documents
    @constant
    @type {string|Array}
 */
const documents_array = [];

/** Contain of all six countries
    @constant
    @type {string|Array}
 */
const countries = [
  "china",
  "japan",
  "malaysia",
  "singapore",
  "south_korea",
  "thailand",
];

let raw_html = null;
let $ = null;

for (let i = 0; i < countries.length; i++) {
  let storage = {};
  raw_html = fs.readFileSync(`data/raw/${countries[i]}.html`);

  $ = cheerio.load(raw_html);

  storage["countryName"] = countries[i];

  // Add bullet points
  $(".text-content")
    .find("ul")
    .each(function (index) {
      if (index === 0) {
        storage["Do's"] = utils.extractText($(this), "li");
      }
      if (index === 1) {
        storage["Don'ts"] = utils.extractText($(this), "li");
      }
    });
  documents_array.push(storage);
}

// Insert data into DB
utils.insertManyDocuments(documents_array);