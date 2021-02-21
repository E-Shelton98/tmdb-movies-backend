// These import necessary modules and set some initial variables
require('dotenv').config()
const express = require('express')
const fetch = require('node-fetch')
const rateLimit = require('express-rate-limit')
var cors = require('cors')
const app = express()
const port = 3000

// Rate limiting - Goodreads limits to 1/sec, so we should too

// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html
app.set('trust proxy', 1);

const limiter = rateLimit({
  windowMs: 1000, // 1 second
  max: 1, // limit each IP to 1 requests per windowMs
})

//  apply to all requests
app.use(limiter)

// Allow CORS from any origin
app.use(cors())

// Routes

// Test route, visit localhost:3000 to confirm it's working
// should show 'Hello World!' in the browser
app.get('/', (req, res) => res.send('Hello World!'))

//TMDb discover route
app.get('/api/tmdb/discover', async (req, res) => {
  try {
    // This uses string interpolation to make our type query (ie. movie/tv) string.
    // It pulls the posted query param and reformats it for TMDb
    const typeString = req.query.type

    // It uses node-fetch to call the TMDb api, and reads the key from .env
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/${typeString}?sort_by=popularity.desc&api_key=${process.env.TMDB_API_KEY}`
    )
    const data = await response.json()

    return res.json({
      success: true,
      data,
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    })
  }
})

//TMDb search route
app.get('/api/tmdb/search', async (req, res) => {
  try {
    // This uses string interpolation to make our search query string
    // it pulls the posted query param and reformats it for TMDb, same for type.
    const typeString = req.query.type
    const searchString = `query=${req.query.query}`

    // It uses node-fetch to call the TMDb api, and reads the key from .env
    const response = await fetch(
      `https://api.themoviedb.org/3/search/${typeString}?api_key=${process.env.TMDB_API_KEY}&${searchString}`
    )
    const data = await response.json()
    

    return res.json({
      success: true,
      data,
    })
      
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    })
  }
})

//spin up the server, console log to verify.
app.listen(process.env.PORT || port)
