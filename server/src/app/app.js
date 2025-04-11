require('dotenv').config()
const express = require('express')
const app = express();

const cors = require('cors');
const axios = require('axios');
const { userRouter } = require('../routers/users/user-router');
const { aiRouter } = require('../routers/project/AiRouter');

app.use(express.json());

app.use(cors({
    origin : '*',
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    credentials: true
}));


// * initialize usestate
// const sessionCache = new NodeCache({ stdTTL : 300 }); // * user state expires in 300mins

app.get('/test-endpoint', (req,res) => {
    return res.status(200).json({
        msg : "Hello...welcome to project ai endpoint",
    })
})

app.use('/', userRouter);
// app.use('/', aiRouter);


module.exports = { app }