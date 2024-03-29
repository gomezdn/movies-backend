require('dotenv').config();

const { app } = require('./src/app');

const { userWatchlist } = require('./src/routes/userWatchlist');
const { auth } = require('./src/routes/auth');

app.use('/userWatchlists', userWatchlist);
app.use('/auth', auth);

app.listen(4000);
