const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const bodyParser = require('body-parser');

require('dotenv').config();

const sequelize = require('./util/database');
const formatMessage = require('./util/message');

const User = require('./models/user');
const Message = require('./models/message');

const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
    cors: {
        origin: 'null'
    }
});

app.use(cors({
    origin: 'null',
    methods: ['GET', 'POST']
}));

const userRoutes = require('./routes/user');
const messageRoutes = require('./routes/message');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(userRoutes);
app.use('/message', messageRoutes);

User.hasMany(Message);
Message.belongsTo(User);

const botName = 'Chat Bot';


io.on('connection', socket => {
    console.log('Client Connected');

    socket.emit('message', formatMessage(botName, 'You have Joined the Chat'));
    socket.broadcast.emit('message', formatMessage(botName, 'A New User has Joined the Chat'));

    socket.on('chat-message', message => {
        console.log('message', message);
        console.log(formatMessage(message.username, message.msg));
        io.emit('message', formatMessage(message.username, message.msg));
    });

    socket.on('disconnect', () => {
        console.log('Client Disconnected');
    });
});

const PORT = process.env.PORT || 4000;
async function start() {
    try{
        // console.log('Trying Connection');

         let result = await sequelize.sync();
        //  let result = await sequelize.sync({ force: true });

         server.listen(PORT, () => {
             console.log(`Server Listening on Port ${PORT}`);
         });
    } catch (err) {
        console.log('Error ---- ',err);
    }
}

start();