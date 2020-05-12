const cheerio = require("cheerio");
const rp = require("./request-promise");
const google = require("./google_site");

const name = "lyrics.com";
const supported = (lang) => lang === "en";
const site = "https://www.lyrics.com/lyric";
const site_re = /https:\/\/www\.lyrics\.com\/lyric\/(\d+)\/.*\/.*/;
google.register(name, site, site_re);
const search = async (query) => google.search(name, query);

async function lyrics(url) {
  const html = await rp(url);
  const $ = cheerio.load(html);
  const l = $("#lyric-body-text").text().trim();
  return l;
}

module.exports = {
  name,
  search,
  supported,
  lyrics,
};
