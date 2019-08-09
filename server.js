const express = require('express');
require('dotenv').config()
const bodyParser = require('body-parser');
const passport = require('passport');
const chalk = require('chalk');
const { morganConfig } = require('./config/morganConfig');
const port = process.env.PORT || 5000;
const app = express();

// Bodyparser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Morgan
app.use(morganConfig);

// Passport middleware
app.use(passport.initialize());

// Passport config
require('./config/passport')(passport);

// Routes
require('./routes/api/users')(app);
require('./routes/api/transactions')(app);
require('./routes/api/categories')(app);
require('./routes/api/auth')(app);

// Models
const db = require("./models");

db.sequelize.sync().then(() => {
    app.listen(port, () => console.log(`Server running on port ${chalk.green.bold(port)}!`));
});