const express = require('express');

const router = express.Router();

const arizona = 'https://static.nfl.com/static/content/public/static/wildcat/assets/img/logos/teams/ARI.svg';
const atlanta = 'https://static.nfl.com/static/content/public/static/wildcat/assets/img/logos/teams/ATL.svg';
const baltimore = 'https://static.nfl.com/static/content/public/static/wildcat/assets/img/logos/teams/BAL.svg';
const buffalo = 'https://content.sportslogos.net/logos/7/149/thumbs/n0fd1z6xmhigb0eej3323ebwq.gif';
const carolina = 'http://content.sportslogos.net/logos/7/174/thumbs/f1wggq2k8ql88fe33jzhw641u.gif';
const chicago = 'http://content.sportslogos.net/logos/7/169/thumbs/364.gif';
const cincinnati = 'http://content.sportslogos.net/logos/7/154/thumbs/403.gif';
const cleveland = 'http://content.sportslogos.net/logos/7/155/thumbs/15578552015.gif';
const dallas = 'http://content.sportslogos.net/logos/7/165/thumbs/406.gif';
const denver = 'http://content.sportslogos.net/logos/7/161/thumbs/9ebzja2zfeigaziee8y605aqp.gif';
const detroit = 'http://content.sportslogos.net/logos/7/170/thumbs/17013982017.gif';
const greenBay = 'http://content.sportslogos.net/logos/7/171/thumbs/dcy03myfhffbki5d7il3.gif';
const houston = 'http://content.sportslogos.net/logos/7/157/thumbs/570.gif';
const indianapolis = 'http://content.sportslogos.net/logos/7/158/thumbs/593.gif';
const jacksonville = 'http://content.sportslogos.net/logos/7/159/thumbs/15988562013.gif';
const kansasCity = 'http://content.sportslogos.net/logos/7/162/thumbs/857.gif';
const losAngelesAFC = 'http://content.sportslogos.net/logos/7/6446/thumbs/644624152017.gif';
const losAngelesNFC = 'http://content.sportslogos.net/logos/7/5941/thumbs/594179532017.gif';
const miami = 'http://content.sportslogos.net/logos/7/150/thumbs/15041052013.gif';
const minnesota = 'http://content.sportslogos.net/logos/7/172/thumbs/17227042013.gif';
const newEngland = 'http://content.sportslogos.net/logos/7/151/thumbs/y71myf8mlwlk8lbgagh3fd5e0.gif';
const newOrleans = 'http://content.sportslogos.net/logos/7/175/thumbs/907.gif';
const newYorkNFC = 'http://content.sportslogos.net/logos/7/166/thumbs/919.gif';
const newYorkAFC = 'http://content.sportslogos.net/logos/7/152/thumbs/v7tehkwthrwefgounvi7znf5k.gif';
const oakland = 'http://content.sportslogos.net/logos/7/163/thumbs/g9mgk6x3ge26t44cccm9oq1vl.gif';
const philadelphia = 'http://content.sportslogos.net/logos/7/167/thumbs/960.gif';
const pittsburgh = 'http://content.sportslogos.net/logos/7/156/thumbs/970.gif';
const sanFrancisco = 'http://content.sportslogos.net/logos/7/179/thumbs/17994552009.gif';
const seattle = 'http://content.sportslogos.net/logos/7/180/thumbs/pfiobtreaq7j0pzvadktsc6jv.gif';
const tampaBay = 'http://content.sportslogos.net/logos/7/176/thumbs/17636702014.gif';
const tennessee = 'http://content.sportslogos.net/logos/7/160/thumbs/1053.gif';
const washington = 'http://content.sportslogos.net/logos/7/168/thumbs/im5xz2q9bjbg44xep08bf5czq.gif';

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