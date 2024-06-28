const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');
const connectDB = require('./config/database');

dotenv.config();

// Database connection
connectDB();

// Express app
const app = express();

// Body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Express session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// Set EJS as templating engine
app.set('view engine', 'ejs');

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/apps', require('./routes/apps'));
app.use('/admin', require('./routes/admin'));
app.use('/jettons', require('./routes/jettons'));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
