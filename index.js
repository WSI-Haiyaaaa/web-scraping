const cheerio = require("cheerio");
const fs = require("fs");

let raw_html = fs.readFileSync("data/raw/chinese-culture.html");
let $ = cheerio.load(raw_html);
// An object to store country culture data
let country_culture = {};
// Get the country name
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

console.log(JSON.stringify(country_culture));
// Store parsed data into json file
fs.writeFileSync("data/chinese-culture.json", JSON.stringify(country_culture));

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
