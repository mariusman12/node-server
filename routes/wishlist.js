const express = require('express')

const router = express.Router()

const {
  addNewBook,
  getUserWishlist,
  removeBook
} = require('../controllers/wishlist')

router.get('/wishlist/get/:userId', getUserWishlist)
router.post('/wishlist/add', addNewBook)
router.post('/wishlist/remove', removeBook)

module.exports = router