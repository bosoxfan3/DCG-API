const express = require('express');

const router = express.Router();

const arizona = 'https://static.nfl.com/static/content/public/static/wildcat/assets/img/logos/teams/ARI.svg';
const atlanta = 'https://static.nfl.com/static/content/public/static/wildcat/assets/img/logos/teams/ATL.svg';
const baltimore = 'https://static.nfl.com/static/content/public/static/wildcat/assets/img/logos/teams/BAL.svg';
const buffalo = 'https://static.nfl.com/static/content/public/static/wildcat/assets/img/logos/teams/BUF.svg';
const carolina = 'https://static.nfl.com/static/content/public/static/wildcat/assets/img/logos/teams/CAR.svg';
const chicago = 'https://static.nfl.com/static/content/public/static/wildcat/assets/img/logos/teams/CHI.svg';
const cincinnati = 'https://static.nfl.com/static/content/public/static/wildcat/assets/img/logos/teams/CIN.svg';
const cleveland = 'https://static.nfl.com/static/content/public/static/wildcat/assets/img/logos/teams/CLE.svg';
const dallas = 'https://static.nfl.com/static/content/public/static/wildcat/assets/img/logos/teams/DAL.svg';
const denver = 'https://static.nfl.com/static/content/public/static/wildcat/assets/img/logos/teams/DEN.svg';
const detroit = 'https://static.nfl.com/static/content/public/static/wildcat/assets/img/logos/teams/DET.svg';
const greenBay = 'https://static.nfl.com/static/content/public/static/wildcat/assets/img/logos/teams/GB.svg';
const houston = 'https://static.nfl.com/static/content/public/static/wildcat/assets/img/logos/teams/HOU.svg';
const indianapolis = 'https://static.nfl.com/static/content/public/static/wildcat/assets/img/logos/teams/IND.svg';
const jacksonville = 'https://static.nfl.com/static/content/public/static/wildcat/assets/img/logos/teams/JAX.svg';
const kansasCity = 'https://static.nfl.com/static/content/public/static/wildcat/assets/img/logos/teams/KC.svg';
const losAngelesAFC = 'https://static.nfl.com/static/content/public/static/wildcat/assets/img/logos/teams/LAC.svg';
const losAngelesNFC = 'https://static.nfl.com/static/content/public/static/wildcat/assets/img/logos/teams/LA.svg';
const miami = 'https://static.nfl.com/static/content/public/static/wildcat/assets/img/logos/teams/MIA.svg';
const minnesota = 'https://static.nfl.com/static/content/public/static/wildcat/assets/img/logos/teams/MIN.svg';
const newEngland = 'https://static.nfl.com/static/content/public/static/wildcat/assets/img/logos/teams/NE.svg';
const newOrleans = 'https://static.nfl.com/static/content/public/static/wildcat/assets/img/logos/teams/NO.svg';
const newYorkNFC = 'https://static.nfl.com/static/content/public/static/wildcat/assets/img/logos/teams/NYG.svg';
const newYorkAFC = 'https://static.nfl.com/static/content/public/static/wildcat/assets/img/logos/teams/NYJ.svg';
const oakland = 'https://static.nfl.com/static/content/public/static/wildcat/assets/img/logos/teams/OAK.svg';
const philadelphia = 'https://static.nfl.com/static/content/public/static/wildcat/assets/img/logos/teams/PHI.svg';
const pittsburgh = 'https://static.nfl.com/static/content/public/static/wildcat/assets/img/logos/teams/PIT.svg';
const sanFrancisco = 'https://static.nfl.com/static/content/public/static/wildcat/assets/img/logos/teams/SF.svg';
const seattle = 'https://static.nfl.com/static/content/public/static/wildcat/assets/img/logos/teams/SEA.svg';
const tampaBay = 'https://static.nfl.com/static/content/public/static/wildcat/assets/img/logos/teams/TB.svg';
const tennessee = 'https://static.nfl.com/static/content/public/static/wildcat/assets/img/logos/teams/TEN.svg';
const washington = 'https://static.nfl.com/static/content/public/static/wildcat/assets/img/logos/teams/WAS.svg';

const matchups = [
  ['Washington', 'New York (NFC)', washington, newYorkNFC],
  ['New York (AFC)', 'New England', newYorkAFC, newEngland],
  ['Chicago', 'Minnesota', chicago, minnesota],
  ['Green Bay', 'Detroit', greenBay, detroit],
  ['Houston', 'Indianpolis', houston, indianapolis],
  ['Cleveland', 'Pittsburgh', cleveland, pittsburgh],
  ['Dallas', 'Philadelphia', dallas, philadelphia],
  ['San Francisco', 'Los Angeles (NFC)', sanFrancisco, losAngelesNFC],
  ['Oakland', 'Los Angeles (AFC)', oakland, losAngelesAFC],
  ['Kansas City', 'Denver', kansasCity, denver],
  ['Jacksonville', 'Tennessee', jacksonville, tennessee],
  ['New Orleans', 'Tampa Bay', newOrleans, tampaBay],
  ['Buffalo', 'Miami', buffalo, miami],
  ['Arizona', 'Seattle', arizona, seattle],
  ['Carolina', 'Atlanta', carolina, atlanta],
  ['Cincinnati', 'Baltimore', cincinnati, baltimore]
];

router.get('/', (req, res) => {
  return res.json(matchups);
});

module.exports = router;