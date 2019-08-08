const express = require('express');
require('dotenv').config()
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');
const chalk = require('chalk');
const { morganConfig } = require('./config/morganConfig');

const port = process.env.PORT || 5000;
const app = express();

// Bodyparser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// morgan logging
app.use(morganConfig);

// Passport middleware
app.use(passport.initialize());

// Passport config
require('./config/passport')(passport);

// Use Routes
require('./routes/api/users')(app);
require('./routes/api/transactions')(app);
require('./routes/api/categories')(app);

// models
const db = require("./models");

db.sequelize.sync().then(() => {

    // starting app
    // app.get("*", (req, res) => {
    //     res.sendFile(path.join(__dirname, "./client/build/index.html"));
    // });

    app.listen(port, () => console.log(`Server running on port ${chalk.green.bold(port)}!`));
});


