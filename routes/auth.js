const express = require('express')

const router = express.Router()

//middlewarse
const { authCheck, adminCheck } = require('../middlewares/auth')

// import

const { createOrUpdateUser, currentUser } = require('../controllers/auth')

router.post('/create-or-update-user', authCheck, createOrUpdateUser) // avem ruta / middelware / functia

router.post('/current-user', authCheck, currentUser)

router.post('/current-admin', authCheck, adminCheck, currentUser)


module.exports = router
