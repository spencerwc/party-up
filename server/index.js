const express = require('express');
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

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
