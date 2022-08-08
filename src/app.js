const express = require('express');
const cors = require('cors');

const { User } = require('./models/User');
const { Movie } = require('./models/Movie');
const { UserWatchlist } = require('./models/UserWatchlist');

const app = express();

app.use(express.json());
app.use(cors());

(async () => {
  await User.sync({ alter: true });
  await Movie.sync({ alter: true });
  await UserWatchlist.sync({ alter: true });
})();

module.exports = { app };
