const express = require('express')
const app = express()
const consola = require('consola')
const request = require('request-promise')
const parse = require('./controllers/main.parser')
// let fetchJsonp = require('fetch-jsonp')
// import fetchJsonp from './node_modules/fetch-jsonp/build/fetch-jsonp'



// request(options)
//     .then(result => console.log(result))




async function start () {

    // Listen the server
    let host = 'localhost'
    let port = '5000'
    
    // const options = {
    //     method: 'GET',
    //     uri: 'https://api.vk.com/method/messages.getDialogs?v=5.41&access_token=d7e17e6549d51abcad291223fc3b2dc4493eac3ae39ae67ff9c96aceec3960e462710b2186efa3cd51f90&count=10&offset=0',
    //     json: true,
    // }

    // app.get('/:app', (req, res) => {
    //     console.log('req', req.body)
    //     request(options)
    //         .then(result => console.log(result))
    // })

    app.get('/:app', (req, res) => {
        parse()
        res.json('Kept u waiting, hur?')
    })

    app.use(express.static(__dirname + '/static'))
    // app.use('/static', express.static('static'));
    app.listen(port, host, () => {
      consola.ready({
        message: `Server listening on http://${host}:${port}`,
        badge: true
      })
    })
    
  }
  start()