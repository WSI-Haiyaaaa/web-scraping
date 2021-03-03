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

// list all six countries
let countries = [
  "chinese",
  "japanese",
  "malaysian",
  "singaporean",
  "south-korean",
  "thai",
];

let raw_html = null;
let $ = null;
let countries_culture = [];

for (let i = 0; i < countries.length; i++) {
  raw_html = fs.readFileSync(`data/raw/${countries[i]}-culture.html`);

  $ = cheerio.load(raw_html);
  // An object to store country culture data
  let country_culture = {};
  // Get the title
  let country_name = $("h1").text().replace(/-/gm, "");
  country_culture[country_name] = [];
  $(".text-content")
    .find(".culture-subheading")
    .each(function () {
      let data = {};
      data["type"] = $(this).text(); // Get Dos or Donts
      country_culture[country_name].push(data);
    });

  $(".text-content")
    .find("ul")
    .each(function (index) {
      country_culture[country_name][index]["list"] = extractText($(this), "li"); // Add bullet points
    });

  countries_culture.push(country_culture);
}

// Write data into json file
fs.writeFileSync(
  `data/countries_culture.json`,
  JSON.stringify(countries_culture)
);

/*
  Utility Functions
*/

/** Extract simple text from the child elements (li) of a parent element (ul).
  @function
  @param {object} element A Cheerio parent element
  @param {string} selector A CSS selector for child elements
  @returns {Array} The child's text content
*/

function extractText(element, selector) {
  let list = [];
  element.find(selector).each(function () {
    list.push($(this).text());
  });
  return list;
}
