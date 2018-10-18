const express = require('express');

const router = express.Router();

const arizona = {
    name: 'Cardinals',
    logo: 'https://static.nfl.com/static/content/public/static/wildcat/assets/img/logos/teams/ARI.svg'
};
const atlanta = {
    name: 'Falcons',
    logo: 'https://static.nfl.com/static/content/public/static/wildcat/assets/img/logos/teams/ATL.svg'
};
const baltimore = {
    name: 'Ravens',
    logo: 'https://static.nfl.com/static/content/public/static/wildcat/assets/img/logos/teams/BAL.svg'
};
const buffalo = {
    name: 'Bills',
    logo: 'https://static.nfl.com/static/content/public/static/wildcat/assets/img/logos/teams/BUF.svg'
};
const carolina = {
    name: 'Panthers',
    logo: 'https://static.nfl.com/static/content/public/static/wildcat/assets/img/logos/teams/CAR.svg'
};
const chicago = {
    name: 'Bears',
    logo: 'https://static.nfl.com/static/content/public/static/wildcat/assets/img/logos/teams/CHI.svg'
};
const cincinnati = {
    name: 'Bengals',
    logo: 'https://static.nfl.com/static/content/public/static/wildcat/assets/img/logos/teams/CIN.svg'
};
const cleveland = {
    name: 'Browns',
    logo: 'https://static.nfl.com/static/content/public/static/wildcat/assets/img/logos/teams/CLE.svg'
};
const dallas = {
    name: 'Cowboys',
    logo: 'https://static.nfl.com/static/content/public/static/wildcat/assets/img/logos/teams/DAL.svg'
};
const denver = {
    name: 'Broncos',
    logo: 'https://static.nfl.com/static/content/public/static/wildcat/assets/img/logos/teams/DEN.svg'
};
const detroit = {
    name: 'Lions',
    logo: 'https://static.nfl.com/static/content/public/static/wildcat/assets/img/logos/teams/DET.svg'
};
const greenBay = {
    name: 'Packers',
    logo: 'https://static.nfl.com/static/content/public/static/wildcat/assets/img/logos/teams/GB.svg'
};
const houston = {
    name: 'Texans',
    logo: 'https://static.nfl.com/static/content/public/static/wildcat/assets/img/logos/teams/HOU.svg'
};
const indianapolis = {
    name: 'Colts',
    logo: 'https://static.nfl.com/static/content/public/static/wildcat/assets/img/logos/teams/IND.svg'
};
const jacksonville = {
    name: 'Jaguars',
    logo: 'https://static.nfl.com/static/content/public/static/wildcat/assets/img/logos/teams/JAX.svg'
};
const kansasCity = {
    name: 'Chiefs',
    logo: 'https://static.nfl.com/static/content/public/static/wildcat/assets/img/logos/teams/KC.svg'
};
const losAngelesAFC = {
    name: 'Chargers',
    logo: 'https://static.nfl.com/static/content/public/static/wildcat/assets/img/logos/teams/LAC.svg'
};
const losAngelesNFC = {
    name: 'Rams',
    logo: 'https://static.nfl.com/static/content/public/static/wildcat/assets/img/logos/teams/LA.svg'
};
const miami = {
    name: 'Dolphins',
    logo: 'https://static.nfl.com/static/content/public/static/wildcat/assets/img/logos/teams/MIA.svg'
};
const minnesota = {
    name: 'Vikings',
    logo: 'https://static.nfl.com/static/content/public/static/wildcat/assets/img/logos/teams/MIN.svg'
};
const newEngland = {
    name: 'Patriots',
    logo: 'https://static.nfl.com/static/content/public/static/wildcat/assets/img/logos/teams/NE.svg'
};
const newOrleans = {
    name: 'Saints',
    logo: 'https://static.nfl.com/static/content/public/static/wildcat/assets/img/logos/teams/NO.svg'
};
const newYorkNFC = {
    name: 'Giants',
    logo: 'https://static.nfl.com/static/content/public/static/wildcat/assets/img/logos/teams/NYG.svg'
};
const newYorkAFC = {
    name: 'Jets',
    logo: 'https://static.nfl.com/static/content/public/static/wildcat/assets/img/logos/teams/NYJ.svg'
};
const oakland = {
    name: 'Raiders',
    logo: 'https://static.nfl.com/static/content/public/static/wildcat/assets/img/logos/teams/OAK.svg'
};
const philadelphia = {
    name: 'Eagles',
    logo: 'https://static.nfl.com/static/content/public/static/wildcat/assets/img/logos/teams/PHI.svg'
};
const pittsburgh = {
    name: 'Steelers',
    logo: 'https://static.nfl.com/static/content/public/static/wildcat/assets/img/logos/teams/PIT.svg'
};
const sanFrancisco = {
    name: '49ers',
    logo: 'https://static.nfl.com/static/content/public/static/wildcat/assets/img/logos/teams/SF.svg'
};
const seattle = {
    name: 'Seahawks',
    logo: 'https://static.nfl.com/static/content/public/static/wildcat/assets/img/logos/teams/SEA.svg'
};
const tampaBay = {
    name: 'Buccaneers',
    logo: 'https://static.nfl.com/static/content/public/static/wildcat/assets/img/logos/teams/TB.svg'
};
const tennessee = {
    name: 'Titans',
    logo: 'https://static.nfl.com/static/content/public/static/wildcat/assets/img/logos/teams/TEN.svg'
};
const washington = {
    name: 'Redskins',
    logo: 'https://static.nfl.com/static/content/public/static/wildcat/assets/img/logos/teams/WAS.svg'
};

const matchups = [
    [denver.name, arizona.name, denver.logo, arizona.logo],
    [tennessee.name, losAngelesAFC.name, tennessee.logo, losAngelesAFC.logo],
    [newEngland.name, chicago.name, newEngland.logo, chicago.logo],
    [cleveland.name, tampaBay.name, cleveland.logo, tampaBay.logo],
    [houston.name, jacksonville.name, houston.logo, jacksonville.logo],
    [minnesota.name, newYorkAFC.name, minnesota.logo, newYorkAFC.logo],
    [buffalo.name, indianapolis.name, buffalo.logo, indianapolis.logo],
    [detroit.name, miami.name, detroit.logo, miami.logo],
    [carolina.name, philadelphia.name, carolina.logo, philadelphia.logo],
    [newOrleans.name, baltimore.name, newOrleans.logo, baltimore.logo],
    [dallas.name, washington.name, dallas.logo, washington.logo],
    [losAngelesNFC.name, sanFrancisco.name, losAngelesNFC.logo, sanFrancisco.logo],
    [cincinnati.name, kansasCity.name, cincinnati.logo, kansasCity.logo],
    [newYorkNFC.name, atlanta.name, newYorkNFC.logo, atlanta.logo]
];

router.get('/', (req, res) => {
    return res.json(matchups);
});

module.exports = router;
