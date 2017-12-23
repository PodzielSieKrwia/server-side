const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const database = admin.database();

const krewInfoScraperFunction = require('./scraper/krew-info-scraper');

exports.krewInfoScraper = functions.https.onRequest((req, res) => {
    krewInfoScraperFunction.scrapPage(database);
    res.send("Page scraped successfully!");
});