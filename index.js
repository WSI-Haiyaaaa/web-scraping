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
/** Require MongoDB connection
    @constant
    @type {object}
 */
const mdb = require("./db/connect.js");
/** Require MongoDB model
    @constant
    @type {object}
*/
const DosAndDontsModel = require("./db/models/dos_and_donts_schema");

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
/** Hold all countries' data
    @type {object}
*/

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
        storage["Do's"] = extractText($(this), "li");
      }
      if (index === 1) {
        storage["Don'ts"] = extractText($(this), "li");
      }
    });
  documents_array.push(storage);
}

insertManyDocuments(documents_array);

/*
  Utility Functions
*/

/** Extract simple text from the child elements (li) of a parent element (ul).
  @function
  @param {object} element A Cheerio parent element
  @param {string} selector A CSS selector for child elements
  @returns {string|Array} An array to hold a list of the child's text content
*/
function extractText(element, selector) {
  let list = [];
  element.find(selector).each(function () {
    list.push($(this).text());
  });
  return list;
}

/** Insert mutiple documents into MongoDB
  @function
*/
function insertManyDocuments(array) {
  DosAndDontsModel.insertMany(array, function (err) {
    if (err) {
      return console.error(err);
    } else {
      console.log("Multiple documents inserted to Collection");
    }
  });
}
