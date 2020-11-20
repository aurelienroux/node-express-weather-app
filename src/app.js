const path = require('path')
const express = require('express')

const app = express()
const publicDirPath = path.join(__dirname, '..', '/public')

app.set('view engine', 'hbs')
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
  res.render('index', { title: 'my hbs title' })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'Aure'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    helpText: 'some help text'
  })
})

app.get('/weather', (req, res) => {
  res.send({
    location: 'Montreal',
    province: 'Quebec',
    forecast: 'cloudy'
  })
})

app.listen(3000, () => console.log('Server is up on port 3000')) // eslint-disable-line
