const path = require('path');

const express = require('express');

const bodyParser = require('body-parser');

require('dotenv').config();

const sequelize = require('./util/database');

const User = require('./models/user');
const Message = require('./models/message');

const cors = require('cors');

const app = express();

app.use(cors({
    origin: 'null',
    methods: ['GET', 'POST']
}));

const userRoutes = require('./routes/user');
const messageRoutes = require('./routes/message');

app.use(express.json());

app.use(userRoutes);
app.use('/message', messageRoutes);

User.hasMany(Message);
Message.belongsTo(User);

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