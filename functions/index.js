// It is intended to have this file as function exposure as WebServices. Functions' body
// should be implemented in dedicated modules: directory and code files with implementation.

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const krewInfoScraperFunction = require('./scraper/krew-info-scraper');

admin.initializeApp(functions.config().firebase);
const database = admin.database();

exports.krewInfoScraper = functions.https.onRequest((req, res) => {
    krewInfoScraperFunction.scrapPage(database);
    res.send("Page scraped successfully!");
});