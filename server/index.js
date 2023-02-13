const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const port = 5000
const mongoUrl = "mongodb://localhost:27017/messaging-app"
const userRoutes = require('./routes/userRoutes')

const app = express()
require("dotenv").config

app.use(cors())
app.use(express.json())
app.use('/api/auth', userRoutes)

mongoose.set('strictQuery', true)
mongoose.connect(mongoUrl,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("MongoDB Connection Successful");
}).catch(err=>{
    console.log(err.message);
})

const server = app.listen(port, ()=>{
    console.log("Server running at port ", port);
})