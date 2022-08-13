require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');

const userRoutes = require('./routes/users');
const partyRoutes = require('./routes/parties');
const groupRoutes = require('./routes/groups');

const PORT = process.env.PORT || 8888;

const app = express();

app.use(express.json());

app.use(logger('dev'));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/parties', partyRoutes);
app.use('/api/groups', groupRoutes);

// Connect to MongoDB
mongoose
    .connect(process.env.DB_URI)
    .then(() => {
        // Once connected, start the server
        app.listen(PORT, () => {
            console.log(`Listening on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error(error);
    });
