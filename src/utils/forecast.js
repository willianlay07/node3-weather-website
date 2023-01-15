const request   = require('request')

/*
const forecast  = (lat, lon, callback) => {
    const url       = 'http://api.weatherstack.com/current?access_key=869e3a9f313338e095808245296b2436&query=' + lat + ',' + lon + '&units=f'

    request({url: url, json: true}, (error, response) => {
        if(error) {
            callback('Unable to connect to the Weather Service!', undefined)
        } else if(response.body.error) {
            callback('Unable to find location!', undefined)
        } else {
            callback(undefined, {
                desc: response.body.current.weather_descriptions[0],
                temp: response.body.current.temperature,
                feel: response.body.current.feelslike
            })
        }
    })
}
*/

// Destructing
const forecast  = (lat, lon, callback) => {
    const url       = 'http://api.weatherstack.com/current?access_key=869e3a9f313338e095808245296b2436&query=' + lat + ',' + lon + '&units=f'

    request({url, json: true}, (error, { body }) => {
        if(error) {
            callback('Unable to connect to the Weather Service!', undefined)
        } else if(body.error) {
            callback('Unable to find location!', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions + '. It is currently ' + body.current.temperature + ' degress out. There is a ' + body.current.precip + '% chance of rain. The humidity ' + body.current.humidity + '%.')
            /*
            callback(undefined, {
                desc: body.current.weather_descriptions[0],
                temp: body.current.temperature,
                feel: body.current.feelslike
            })
            */
        }
    })
}


module.exports  = forecast


