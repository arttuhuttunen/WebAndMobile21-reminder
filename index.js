const { response } = require('express')
const express = require('express')
const cors = require('cors')
const app = express()
const Reminder = require('./models/reminder')

app.use(express.json())
app.use(cors())
app.use(express.static('build'))

app.get('/api/reminders/:id', (req, res) => {
    const id = Number(req.params.id)
    const reminder = Reminder
                        .find({ id: id })
    if (reminder) {
        res.json(reminder)
    } else {
        res.status(404).end()
    }
})

app.delete('/api/reminders/:id', (req, res) => {
    const id = Number(req.params.id)
    if (Reminder.find({ id: id })) {
        Reminder.deleteOne({ id: id })
        res.status(204).end()
    } else {
        res.status(404).end()
    }
})

app.get('/api/reminders', (req, res) => {
    Reminder
        .find({})
        .then(result => {
            console.log(result)
            res.json(result)
        })
    })

app.post('/api/reminders', (req, res) => {

    const reminder = new Reminder({
        name: req.body.name,
        timestamp: req.body.timestamp,
        id: Math.floor(Math.random() * 1000000)
    })

    reminder
        .save()
        .then(result => {
            res.json(result)    
        })
    
})
  
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
