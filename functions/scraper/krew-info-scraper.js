const osmosis = require('osmosis');

/* return data structure (JSON object)
[{ 
    bloodType : "0 RH+",
    area: "Wrocław"
    bloodLevel: 0
},
{ 
    bloodType : "0 RH-",
    area: "Wrocław"
    bloodLevel: 1
}
 */

exports.scrapPage = function(database) {
    osmosis
    .get('http://krew.info/zapasy/index.html')
    .set([
        osmosis
        .find('table tbody tr')
        .set({bloodType: 'td:first-of-type h3'})
        .find('td:last-of-type(21)')
        .set(
            {
                area: 'img@alt',
                bloodLevel : 'img@src'
            })
        .then(function(context, data, next) {
            if (data.bloodLevel === 'img/krew0.png') {
                data.bloodLevel = 3;
            } else if (data.bloodLevel === 'img/krew1.png') {
                data.bloodLevel = 2;
            } else if (data.bloodLevel === 'img/krew2.png') {
                data.bloodLevel = 1;
            } else if (data.bloodLevel === 'img/krew3.png') {
                data.bloodLevel = 0;
            }
            next(context, data);
        })
    ])
    .data(function(data) {
        console.log(data)
        data.forEach(function(element, index, array) {
            console.log(element);
            var rccikDBLocaion = "/stations/" + mapArea(element.area) + "/inventory/byType/"
                + mapBloodType(element.bloodType);
            var ref = database.ref(rccikDBLocaion);
            ref.set(element.bloodLevel)
        })
    })
}

function  mapArea(areaName) {
    if (areaName === 'Białystok') return 'pl_bialystok_rckik'
    else if (areaName === 'Bydgoszcz') return 'pl_bydgoszcz_rckik'
    else if (areaName === 'Gdańsk') return 'pl_gdansk_rckik'
    else if (areaName === 'Kalisz') return 'pl_kalisz_rckik'
    else if (areaName === 'Katowice') return 'pl_katowice_rckik'
    else if (areaName === 'Kielce') return 'pl_kielce_rckik'
    else if (areaName === 'Kraków') return 'pl_krakow_rckik'
    else if (areaName === 'Lublin') return 'pl_lublin_rckik'
    else if (areaName === 'Łódź') return 'pl_lodz_rckik'
    else if (areaName === 'Olsztyn') return 'pl_olsztyn_rckik'
    else if (areaName === 'Opole') return 'pl_opole_rckik'
    else if (areaName === 'Poznań') return 'pl_poznan_rckik'
    else if (areaName === 'Racibórz') return 'pl_raciborz_rckik'
    else if (areaName === 'Radom') return 'pl_radom_rckik'
    else if (areaName === 'Rzeszów') return 'pl_rzeszow_rckik'
    else if (areaName === 'Słupsk') return 'pl_slupsk_rckik'
    else if (areaName === 'Szczecin') return 'pl_szczecin_rckik'
    else if (areaName === 'Wałbrzych') return 'pl_walbrzych_rckik'
    else if (areaName === 'Warszawa') return 'pl_warszawa_rckik'
    else if (areaName === 'Wrocław') return 'pl_wroclaw_rckik'
    else if (areaName === 'Zielona Góra') return 'pl_zielonagora_rckik'
    else return "unknow-" + areaName
}

function  mapBloodType(bloodType) {
    if (bloodType === '0 Rh-') return '0-'
    else if (bloodType === '0 Rh+') return '0+' 
    else if (bloodType === 'A Rh-') return 'A-' 
    else if (bloodType === 'A Rh+') return 'A+' 
    else if (bloodType === 'B Rh-') return 'B-' 
    else if (bloodType === 'B Rh+') return 'B+' 
    else if (bloodType === 'AB Rh-') return 'AB-' 
    else if (bloodType === 'AB Rh+') return 'AB+' 
    else return 'unknown-' + bloodType 
}