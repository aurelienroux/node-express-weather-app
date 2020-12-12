const request = require('request')

const weatherSearch = (latitude, longitude, callback) => {
  const weatherUrl = `http://api.weatherstack.com/current?access_key=${process.env.WEATHER_API_KEY}&query=${latitude},${longitude}`

  request({ url: weatherUrl, json: true }, (err, { body } = {}) => {
    if (err) {
      callback('Unable to connect to forecast service', undefined)
    } else if (body.error) {
      callback('Unable to find weather location', undefined)
    } else {
      callback(undefined, {
        temperature: body.current.temperature,
        feelslike: body.current.feelslike,
        conditions: body.current.weather_descriptions[0],
        icon: body.current.weather_icons[0]
      })
    }
  })
}

module.exports = weatherSearch
