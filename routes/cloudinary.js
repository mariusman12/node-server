const express = require('express')

const router = express.Router()

//middlewarse
const { authCheck, adminCheck } = require('../middlewares/auth')

// controllers

const { upload, remove } = require('../controllers/cloudinary')

//routes

router.post('/uploadimages', authCheck, adminCheck, upload)
router.post('/removeimage', authCheck, adminCheck, remove)

module.exports = router
