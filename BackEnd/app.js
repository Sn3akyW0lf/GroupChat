const path = require('path');

const express = require('express');

const bodyParser = require('body-parser');

require('dotenv').config();

const sequelize = require('./util/database');

const User = require('./models/user');

const cors = require('cors');

const app = express();

app.use(cors());

const userRoutes = require('./routes/user');

app.use(express.json());

app.use(userRoutes);

async function start() {
    try{
        console.log('Trying Connection');

         let result = await sequelize.sync();
        //  let result = await sequelize.sync({ force: true });

         app.listen(process.env.PORT || 4000);
    } catch (err) {
        console.log('Error ---- ',err);
    }
}

start();