require('dotenv').config();

const express = require('express');
const bodyparser = require('body-parser');
const logger = require('./bin/logger/logger');

const app = express();
const port = process.env.PORT || 3000;

// loading routes
const spotifyRoutes = require('./routes/spotify');

app.use(
  bodyparser.urlencoded({
    extended: true,
  }),
);

app.use(bodyparser.json());

// bind routes to application
app.use('/spotify', spotifyRoutes);

app.listen(port, () => {
  logger.info(`Express server started at port: ${port}`);
});
