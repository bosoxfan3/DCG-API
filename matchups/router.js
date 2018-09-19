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
  ['Jets', 'Browns', newYorkAFC, cleveland],
  ['Bengals', 'Panthers', cincinnati, carolina],
  ['Saints', 'Falcons', newOrleans, atlanta],
  ['Titans', 'Jaguars', tennessee, jacksonville],
  ['Broncos', 'Ravens', denver, baltimore],
  ['Bills', 'Vikings', buffalo, minnesota],
  ['49ers', 'Chiefs', sanFrancisco, kansasCity],
  ['Colts', 'Eagles', indianapolis, philadelphia],
  ['Raiders', 'Dolphins', oakland, miami],
  ['Giants', 'Texans', newYorkNFC, houston],
  ['Packers', 'Redskins', greenBay, washington],
  ['Chargers', 'Rams', losAngelesAFC, losAngelesNFC],
  ['Bears', 'Cardinals', chicago, arizona],
  ['Cowboys', 'Seahawks', dallas, seattle],
  ['Patriots', 'Lions', newEngland, detroit],
  ['Steelers', 'Buccaneers', pittsburgh, tampaBay]
];

router.get('/', (req, res) => {
  return res.json(matchups);
});

module.exports = router;