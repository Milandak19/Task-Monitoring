if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const app = express()
const cors = require('cors')

const index = require('./routes/index')

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(index)

module.exports = app