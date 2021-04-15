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



if (process.argv.length > 2) {
    const reminder = new Reminder({
        name: process.argv[2],
        timestamp: process.argv[3],
        id: Math.floor(Math.random() * 1000000)
    })
    
    reminder
        .save()
        .then(result => {
            console.log('Added reminder "' + result.name + '" at ' + reminder.timestamp + ' to the reminder database')
            mongoose.connection.close()
        })
} else {
    console.log('Reminders:')
    Reminder
        .find({})
        .then(result => {
            result.forEach(reminder => {
            console.log(reminder.name + ', ' + reminder.timestamp)
            })
            mongoose.connection.close()
        })
}

