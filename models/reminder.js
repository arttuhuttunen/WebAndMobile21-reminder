const mongoose = require('mongoose')

if ( process.env.NODE_ENV !== 'production' ) {
    require('dotenv').config()
}

const url = process.env.MONGO_URL
mongoose.connect(url)

const Reminder = mongoose.model('Reminder', {
    name: String,
    timestamp: String,
    id: Number
  })

  module.exports = Reminder