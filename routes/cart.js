const express = require('express')

const router = express.Router()

//middlewarse
const { authCheck, adminCheck } = require('../middlewares/auth')

// import

const {
  createCart,
  addNewBook,
  getAllCarts,
  deleteBook,
  getCart,
  order,
  getAllHistory,
} = require('../controllers/cart')

//routes

router.get('/cart/new/:userId', createCart)
router.post('/cart/add-new-book', addNewBook)
router.get('/cart/all', getAllCarts)
router.post('/cart/delete', deleteBook)
router.get('/cart/get/:userId', getCart)
router.post('/cart/order', order)
router.get('/cart/get-history/:userId', getAllHistory)

module.exports = router
