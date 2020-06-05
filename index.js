const express = require('express')
const app = express()
const consola = require('consola')
const request = require('request-promise')
const parse = require('./controllers/main.parser')


async function start () {

    // Listen the server
    let host = 'localhost'
    let port = '5000'

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