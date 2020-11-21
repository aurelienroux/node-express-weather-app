const path = require('path')
const express = require('express')

const app = express()

// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)

// Setup static directory to serve
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
