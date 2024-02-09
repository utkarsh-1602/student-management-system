require('dotenv').config()
const express = require('express')
const cors = require('cors')
const db = require('./database/db-connection')

// routes
const adminRoutes = require('./routes/adminRoutes')
const studentRoutes = require('./routes/studentRoutes')

const app = express()
const port = process.env.PORT || 3000;

// Middleware to parse incoming JSON data
app.use(express.json());
app.use(cors())


// Mounting the routes
app.use('/admin', adminRoutes)
app.use('/student', studentRoutes)

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});