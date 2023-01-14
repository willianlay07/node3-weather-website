const path      = require('path')
const express   = require('express')
const hbs       = require('hbs')
const geocode   = require('./utils/geocode')
const forecast  = require('./utils/forecast')

//console.log(__dirname)
//console.log(__filename)
//console.log(path.join(__dirname, '../public'))

const app       = express()
const port      = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath   = path.join(__dirname, '../public')
const viewsPath             = path.join(__dirname, '../templates/views')
const partialPath           = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

// Setup static directory to serve.
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Wai Mead'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Wai Hein'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Wai Hlyan'
    })
})



// Route
/*
app.get('', (req, res) => {
    res.send('<h1>Hello Express JS!</h1>')
})
*/

/*
app.get('/help', (req, res) => {
    /*
    res.send({
        name: 'Wai',
        age: 33
    })
    //

    res.send([
        {
            name: 'Sarah'
        },
        {
            name: 'Wai'
        }
    ])
})

app.get('/about', (req, res) => {
    res.send('<h1>About</h1>')
})
*/

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    
    geocode(req.query.address, (error, {lat, lon, loc} = {}) => {
        if(error) {
            return res.send({
                error: error
            })
        }

        forecast(lat, loc, (error, forecastData) => {
            if(error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                loc,
                address: req.query.address
            })
        })
    })

    
    // res.send({
    //   forecast: 'It is snowing',
    //     location: 'Philadelphia',
    //     address: req.query.address
    // })
})

app.get('/products', (req, res) => {
    //console.log(req.query)
    //console.log(req.query.search)

    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

// 404 for Help
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Wai',
        errorMessage: 'Help article not found!'
    })
})

// For 404 for Any
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Wai',
        errorMessage: 'Page not found!'
    })
})

// Start the server
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})