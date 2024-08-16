const express = require('express')

const router = express.Router()

// import

const { testFunction } = require('../controllers/test')

router.get('/test', testFunction)

module.exports = router
