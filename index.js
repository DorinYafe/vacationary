const express = require('express');
const http = require('http');

// const usersController = require('./controllers/usersController');
// const vacationsController = require('./controllers/vacationsController');

// const fileUpload = require('express-fileupload');

const socketIO = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const PORT = process.env.PORT || 3001;
const cors = require('cors');

// app.use(fileUpload());
app.use(cors());
// app.use(express.static('uploads'));
app.use(express.json());

// app.use('/users', usersController);
// app.use('/vacations', vacationsController);

const listener = app.listen(PORT, () => {
    console.log(`Server starts on ${PORT} at ${new Date()} `)
});

global.socketServer = socketIO(listener);