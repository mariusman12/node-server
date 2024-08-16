const express = require('express')

const router = express.Router()

//import

const { showUser } = require('../controllers/user')
router.get('/user', showUser)

module.exports = router
