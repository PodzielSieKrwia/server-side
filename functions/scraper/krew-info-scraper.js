const osmosis = require('osmosis');

exports.scrapPage = function(database) {
    osmosis
        .get('http://krew.info/zapasy/index.html')
        .set('last-update', 'body div div div h3')
        //.set('rccik', 'body div div div thead [th span]')
        //.set('blood-levels', 'body div div div tbody [td img @src]')
        .data(function(data) {
            console.log(data);
            database.ref('/test/messages').set(data);
        });
}