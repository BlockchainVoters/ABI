var abi = require('ethereumjs-abi')

var express = require('express')
var router = express.Router()

router.get('/data', function (req, res) {

  let type = req.query.type.split(',')
  let data = req.query.data

  if ((!type || !data) || (type == null || data == null) || (type == undefined || data == undefined)) {
    let response = {
      success: false
      , decoded: null
    }
    res.json(response)
    return
  }

  let decoded = abi.rawDecode(type, new Buffer(data, 'hex'))

  var d = []
  for (var i = 0; i < decoded.length; i++) {
    if (type[i] != 'string') {
      d[i] = decoded[i].toString()
    } else {
      d[i] = decoded[i]
    }
  }

  let response = {
    success: true
    , decoded: d
  }
  res.json(response)
})

module.exports = router
