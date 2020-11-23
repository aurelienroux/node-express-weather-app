require('dotenv').config()
const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const weatherSearch = require('./utils/weatherSearch')

const app = express()
const port = process.env.PORT || 3000

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

  return geocode(req.query.address, (geoErr, { latitude, longitude, location } = {}) => {
    if (geoErr) return res.send({ error: geoErr })

    return weatherSearch(latitude, longitude, (weatherErr, { temperature, feelslike, conditions } = {}) => {
      if (weatherErr) return res.send({ error: weatherErr })

      return res.send({
        address: req.query.address,
        location,
        temperature,
        feelslike,
        conditions
      })
    })
  })
})

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'must send search'
    })
  }

  console.log(req.query) // eslint-disable-line
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

app.listen(port, () => {
  console.log(`Server is up on port ${port}`) // eslint-disable-line
})
