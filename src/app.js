const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()

// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
  res.render('index', {
    name: 'Aure',
    title: 'Weather'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    name: 'Aure',
    title: 'About me'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    helpText: 'some help text',
    name: 'Aure',
    title: 'Help'
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address'
    })
  }

  return res.send({
    forecast: 'cloudy',
    location: req.query.address
  })
})

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'must send search'
    })
  }

  console.log(req.query)
  return res.send({
    products: ['Luigi mansion']
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    errorMessage: 'Help article not found',
    name: 'Aure',
    title: '404'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    errorMessage: 'Page not found',
    name: 'Aure',
    title: '404'
  })
})

app.listen(3000, () => console.log('Server is up on port 3000')) // eslint-disable-line
