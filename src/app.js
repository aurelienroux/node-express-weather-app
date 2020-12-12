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
    name: 'Aroux',
    profile: 'https://github.com/aurelienroux',
    title: 'Weather'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    name: 'Aroux',
    profile: 'https://github.com/aurelienroux',
    title: 'About me'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    helpText:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    name: 'Aroux',
    profile: 'https://github.com/aurelienroux',
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

    return weatherSearch(
      latitude,
      longitude,
      (weatherErr, { temperature, feelslike, conditions, icon } = {}) => {
        if (weatherErr) return res.send({ error: weatherErr })

        return res.send({
          address: req.query.address,
          location,
          temperature,
          feelslike,
          conditions,
          icon
        })
      }
    )
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    errorMessage: 'Help article not found',
    name: 'Aroux',
    profile: 'https://github.com/aurelienroux',
    title: '404'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    errorMessage: 'Page not found',
    name: 'Aroux',
    profile: 'https://github.com/aurelienroux',
    title: '404'
  })
})

app.listen(port, () => {
  console.log(`Server is up on port ${port}`) // eslint-disable-line
})
