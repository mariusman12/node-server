const express = require('express')

const router = express.Router()

const { 
  createAccount,
  login
} = require('../controllers/account')

router.post('/account/create', createAccount)
router.post('/account/login', login)

module.exports = router