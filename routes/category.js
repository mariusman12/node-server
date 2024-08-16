const express = require('express')

const router = express.Router()

//middlewarse
const { authCheck, adminCheck } = require('../middlewares/auth')

// import

const {
  create,
  read,
  update,
  remove,
  list,
} = require('../controllers/category')

//routes

router.post('/category', authCheck, adminCheck, create)
router.get('/categories', list) // all categories
router.get('/category/:slug', read) // read in function of the slug ex: comedy/HAHAHA book
router.put('/category/:slug', authCheck, adminCheck, update)
router.delete('/category/:slug', authCheck, adminCheck, remove)

module.exports = router
