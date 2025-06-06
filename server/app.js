const express = require('express')
const authRouter = require('./controllers/authController')
const userRouter = require('./controllers/userController')



const app = express()

// middleware
app.use(express.json());
// use auth controller routers
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

module.exports =app