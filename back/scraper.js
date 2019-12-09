const fetch = require("node-fetch");
const cheerio = require("cheerio");

function getMetaProperties(url) {
  return fetch(url)
    .then(response => response.text())
    .then(text => {
      const $ = cheerio.load(text);

      const title =
        $("title").text() ||
        $('meta[property="og:title"]').attr("content") ||
        `There's no title for this post`;

      const description =
        $('meta[property="og:description"]').attr("content") ||
        $('meta[name="Description"]').attr("content") ||
        `There's no description for this post`;

      const imageURL =
        $('meta[property="og:image"]').attr("content") ||
        $("img")
          .first()
          .attr("src") ||
        `There's no image for this post`;
      return { title, description, imageURL };
    });
}

module.exports = getMetaProperties;
