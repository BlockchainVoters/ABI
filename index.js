// mark - express
var express = require('express')
var app = express()

var port = process.env.PORT || 80

// mark - express-session / uuid
var session = require('express-session')
var uuid = require('uuid')

app.use(session({
  genid: function (req) {
    return uuid.v1()
  }
  , secret: 'vesquelecepeu'
  , resave: false
  , saveUninitialized: true
}))

// mark - body-parser
var body_parser = require('body-parser')
app.use(body_parser.urlencoded({
  extended: false
}))
app.use(body_parser.json())

var morgan = require('morgan')
app.use(morgan('dev'))

let decode = require('./routes/decoder')
app.use('/decode', decode)
let encode = require('./routes/encoder')
app.use('/encode', encode)

app.get('/', function (req, res) {
  res.json({
    status: 'Working at ' + port
    , message: 'API para codificação e decodificação de códigos ABI.'
    , date: Date.now()
  })
})

app.listen(port)
console.log({
  status: 'Working at ' + port
  , message: 'API para codificação e decodificação de códigos ABI.'
  , date: Date.now()
})
