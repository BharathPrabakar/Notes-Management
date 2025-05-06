const express = require('express');
const morgan = require('morgan');
const connectDb = require('./configs/db.config');
const usersRouter = require('./routes/users.routes');
const authRouter = require('./routes/auth.routes');
const contentRouter = require('./routes/content.routes');

const app = express();
require('dotenv').config();
// const cors = require('cors');

app.set('view engine', 'ejs');
app.set('views', './src/views');

// middle wares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static('public'));

connectDb();
// routes
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/content',contentRouter);

module.exports = app;