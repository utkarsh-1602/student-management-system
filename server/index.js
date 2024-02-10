require('dotenv').config()
const express = require('express')
const cors = require('cors')
const db = require('./database/db-connection')

// routes
const adminRoutes = require('./routes/adminRoutes')
const studentRoutes = require('./routes/studentRoutes')

const app = express()
const port = process.env.PORT || 3000;

const whitelist = [
  '*' // Allow requests from all origins, you can specify specific origins here if needed
];

app.use((req, res, next) => {
  const origin = req.get('referer');
  const isWhitelisted = whitelist.find((w) => origin && origin.includes(w));
  if (isWhitelisted) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
  }
  // Pass to next layer of middleware
  if (req.method === 'OPTIONS') res.sendStatus(200);
  else next();
});

const setContext = (req, res, next) => {
  if (!req.context) req.context = {};
  next();
};
app.use(setContext);

// Middleware to parse incoming JSON data
app.use(express.json());
app.use(cors())

// Mounting the routes
app.use('/admin', adminRoutes)
app.use('/student', studentRoutes)

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
