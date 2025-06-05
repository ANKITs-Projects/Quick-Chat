const express = require('express')
const authRouter = require('./controllers/authController')



const app = express()

// middleware
app.use(express.json());
// use auth controller routers
app.use('/api/auth', authRouter);

module.exports =app