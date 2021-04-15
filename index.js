const { response } = require('express')
const express = require('express')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('build'))

let reminders = [
    {
        name: "Buy some eggs",
        timestamp: "2021-11-10T13:00:00.141Z",
        id: 1
      },
      {
        name: "Make an omelette",
        timestamp: "2021-11-11T08:00:00.141Z",
        id: 2
      },
      {
        name: "Wash dishes",
        timestamp: "2021-11-11T09:00:00.000Z",
        id: 3
      },
      {
        name: "Buy more eggs",
        timestamp: "2021-11-11T13:00:00.000Z",
        id: 4
      }
]

app.get('/api/reminders/:id', (req, res) => {
    const id = Number(req.params.id)
    const reminder = reminders.find(reminder => reminder.id === id)
    if (reminder) {
        res.json(reminder)
    } else {
        res.status(404).end()
    }
})

app.delete('/api/reminders/:id', (req, res) => {
    const id = Number(req.params.id)
    if (reminders.find(reminder => reminder.id === id)) {
        reminders = reminders.filter(reminder => reminder.id !== id)
        res.status(204).end()
    } else {
        res.status(404).end()
    }
})

app.get('/api/reminders', (req, res) => {
    res.json(reminders)
})

app.post('/api/reminders', (req, res) => {
    const reminder = req.body
    reminder.id = Math.floor(Math.random() * 1000000)
    
    if (reminders.find(rem => rem.name === reminder.name)) {
        return res.status(400).json({error: 'Reminder ' + reminder.name + ' already exists'})
    } else if (reminder.name === undefined || reminder.name === '') {
        return res.status(400).json({error: '"name" field is missing, or empty'})
    } else if (reminder.timestamp === undefined || reminder.timestamp === '') {
        return res.status(400).json({error: '"timestamp" field is missing, or empty'})
    } else {
        reminders = reminders.concat(reminder)
        res.json(reminder)
    }
})
  
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
