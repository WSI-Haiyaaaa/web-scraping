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

/** Contain of all six countries
    @constant
    @type {string|Array}
 */
const countries = [
  "china",
  "japan",
  "malaysia",
  "singapore",
  "south-korea",
  "thailand",
];

let raw_html = null;
let $ = null;
/** Hold all countries' data
    @type {object}
*/
let countries_culture = {};

for (let i = 0; i < countries.length; i++) {
  raw_html = fs.readFileSync(`data/raw/${countries[i]}.html`);

  $ = cheerio.load(raw_html);

  let country_name = countries[i];
  countries_culture[country_name] = [];
  $(".text-content")
    .find(".culture-subheading")
    .each(function () {
      let data = {};
      data["type"] = $(this).text(); // Get Dos or Donts
      countries_culture[country_name].push(data);
    });

  $(".text-content")
    .find("ul")
    .each(function (index) {
      countries_culture[country_name][index]["list"] = extractText(
        $(this),
        "li"
      ); // Add bullet points
    });
}

// Write data into json file
fs.writeFileSync(`data/dos_and_donts.json`, JSON.stringify(countries_culture));

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
