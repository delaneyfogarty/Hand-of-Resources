const express = require('express');
const path = require('path');
const app = express();

// Built in middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// App routes
app.use('/flowers', require('./controllers/flowers'));
app.use('/gemstones', require('./controllers/gemstones'));
app.use('/cats', require('./controllers/cats'));
app.use('/zodiacs', require('./controllers/zodiacs'));
app.use('/family', require('./controllers/family'));

// Error handling & 404 middleware for when
// a request doesn't match any app routes
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
