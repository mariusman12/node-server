const express = require('express')

const router = express.Router()

const { 
  createForSite,
  createForBook,
  getReviews,
  editReviews,
  getBookReviews,
} = require('../controllers/reviews')

router.post('/review/create-site', createForSite)
router.post('/review/create-book', createForBook)
router.get('/review/get/:bookId', getBookReviews)
router.post('/review/edit', editReviews)
router.get('/review/get/all', getReviews)

module.exports = router

