const request   = require('request')

/*
const geocode   = (address, callback) => {
    const mapBoxUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoid2lsbGlhbmxheTA3IiwiYSI6ImNsYzhpa3Z6YTF3eWEzeHBwMXk2eDZvdTUifQ.p_yhj7jj6_PdVjs1B7M1ZQ&limit=1'

    request({url: mapBoxUrl, json: true}, (error, response) => {
        if(error) {
            callback('Unable to connect to the Mapbox!', undefined)
        } else if(response.body.features.length === 0) {
            callback('Unable to find location Name! Try another search!', undefined)
        } else {
            callback(undefined, {
                lat: response.body.features[0].center[1],
                lon: response.body.features[0].center[0],
                loc: response.body.features[0].place_name
            })
        }
    })
}
*/

// Destructing
const geocode   = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoid2lsbGlhbmxheTA3IiwiYSI6ImNsYzhpa3Z6YTF3eWEzeHBwMXk2eDZvdTUifQ.p_yhj7jj6_PdVjs1B7M1ZQ&limit=1'

    request({url, json: true}, (error, { body }) => {
        if(error) {
            callback('Unable to connect to the Mapbox!', undefined)
        } else if(body.features.length === 0) {
            callback('Unable to find location Name! Try another search!', undefined)
        } else {
            callback(undefined, {
                lat: body.features[0].center[1],
                lon: body.features[0].center[0],
                loc: body.features[0].place_name
            })
        }
    })
}

module.exports  = geocode