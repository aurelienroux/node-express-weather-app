const request = require('request')

const geocode = (address, callback) => {
  const geocodeUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=${process.env.MAPBOX_API_KEY}&limit=1`

  request({ url: geocodeUrl, json: true }, (err, { body } = {}) => {
    if (err) {
      callback('Unable to connect to geocode service', undefined)
    } else if (body.features.length === 0) {
      callback('Unable to find location, please try again', undefined)
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name
      })
    }
  })
}

module.exports = geocode
