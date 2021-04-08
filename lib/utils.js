/** Require MongoDB model
    @constant
    @type {object}
*/
const DosAndDontsModel = require("../db/models/dos_and_donts_schema.js");
/** Require the Cheerio third-party librabry
 * {@link https://cheerio.js.org/}
    @constant
    @type {object}
 */
const $ = require("cheerio");

/** Extract simple text from the child elements (li) of a parent element (ul).
  @function
  @param {object} element A Cheerio parent element
  @param {string} selector A CSS selector for child elements
  @returns {string|Array} An array to hold a list of the child's text content
*/
// extractText($(this), li)
function extractText(element, selector) {
  let list = [];
  element.find(selector).each(function (i) {
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

module.exports = { extractText, insertManyDocuments };
