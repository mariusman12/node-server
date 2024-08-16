const express = require('express')

const router = express.Router()

//middlewarse
const { authCheck, adminCheck } = require('../middlewares/auth')

// import

const {
  create,
  read,
  getBookByName,
  getBooksByCategory,
  getLastAdded,
  getFeatureBooks,
} = require('../controllers/book')

//routes

router.post('/book', authCheck, adminCheck, create)
router.get('/books', read)
router.get('/book/:slug', getBookByName)
router.get('/books/getByCategory/:category', getBooksByCategory)
router.get('/books/lastAdded', getLastAdded)
router.get('/books/feature-books', getFeatureBooks)

module.exports = router
