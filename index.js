'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const { PORT, CLIENT_ORIGIN } = require('./config');
const { dbConnect } = require('./db-mongoose');
// const {dbConnect} = require('./db-knex');

const app = express();

app.use(
  morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev', {
    skip: (req, res) => process.env.NODE_ENV === 'test'
  })
);

app.use(
  cors({
    origin: CLIENT_ORIGIN
  })
);

const { BaseAPIObject, League } = require('espn-fantasy-football-api/dist/index-node.js');

BaseAPIObject.setCookies({ espnS2: 'AEB0X98F7d57qEMweNbe1Npdhnh043BkUSkJPSgvzRUqMzWBl44S5eu%2BZxvCjeTYSym2pZE4V2XjDMkMjY9z5Saq4k4KQXZHS6fIKzwkyREXmOqXOQTsQBazqseGTLggGk4ZKMufH4vLVM2R3%2F8A74SNMQNOOwMlS0UcrX2yAOGB1oa3pbfZUdCDJviSU96N10LuWYMayeLX%2FmUYekKCn9aTHzidVfhcxVJ6AdY5dA5PcLdSyiUhcyQVCUI%2F42vr28RAXRbBM6n524Lap%2BcWXMFloBrH1mll%2FujaNc%2Bxs56Fmw%3D%3D', SWID: '{C1D32052-229F-4214-ACA9-2615894B10E7}' }); // fire and forget

const league = new League({ leagueId:20220, seasonId:2018 });
league.read().then(() => console.log(league)); // Prints loaded league



// const { Boxscore, Scoreboard } = require('espn-fantasy-football-api');

// const leagueId = 20220;
// const seasonId = 2018;
// const scoringPeriodId = 10; // Some week

// Scoreboard.read({
//     params: { leagueId, seasonId, scoringPeriodId }
// }).then((scoreboard) => {
//     const boxscorePromises = scoreboard.matchups.map((matchup) => Boxscore.read({
//         params: { leagueId, seasonId, teamId: matchup.homeTeam.teamId, scoringPeriodId }
//     }));

//     return Promise.all(boxscorePromises)
// }).then((boxscores) => {
//     console.log(boxscores); // Prints all loaded Boxscores
// });



// function runServer(port = PORT) {
//   const server = app
//     .listen(port, () => {
//       console.info(`App listening on port ${server.address().port}`);
//     })
//     .on('error', err => {
//       console.error('Express failed to start');
//       console.error(err);
//     });
// }

// if (require.main === module) {
//   dbConnect();
//   runServer();
// }

module.exports = { app };
