const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const { auth } = require('firebase-admin')
require('dotenv').config()
const fs = require('fs')

//import routes

//app

const app = express()

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log('DB Connection Successfull!'))
  .catch((err) => {
    console.log(err)
  })

//middlewares

app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.json({ limit: '50mb' }))

//middlewares routes
fs.readdirSync('./routes').map((r) => app.use('/api', require('./routes/' + r))) // loop tr files

const port = process.env.PORT
app.listen(process.env.PORT || 8000, () => {
  console.log(`Backend server is running on port ${port}!`)
})
