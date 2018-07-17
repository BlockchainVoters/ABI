var abi = require('ethereumjs-abi')

var express = require('express')
var router = express.Router()

router.get('/data', function (req, res) {

  let type = req.query.type.split(',')
  let data = req.query.data.split(',')

  if ((!type || !data) || (type == null || data == null) || (type == undefined || data == undefined)) {
    let response = {
      success: false
      , decoded: null
    }
    res.json(response)
    return
  }

  let encoded = abi.rawEncode(type, data)

  let response = {
    success: true
    , encoded: encoded.toString()
  }
  res.json(response)
})

module.exports = router
