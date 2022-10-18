const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

mongoose.connect('mongodb://localhost/Talkvalley', () => {
    console.log("Connected to DB")
})

const app = express()

const routes = require('./src/Routes/routes')
app.use(express.json())

app.use(cors())

app.use('/', routes)

app.listen(3500, () => {
    console.log("Server started at port 3500")
})