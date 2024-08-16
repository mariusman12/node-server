const Cart = require('../models/cart')
const HistoryCart = require('../models/cart-history')
const { addBook } = require('../helpers/cart')
const { removeElementFromArray } = require('../helpers/arrays')
const { getBooksById } = require('../helpers/books')

exports.createCart = async (userId) => {
  try {
    const newCart = {
      userId,
      books: [],
      price: '23',
    }

    return await new Cart(newCart).save()
  } catch(e) {
    return null
  }
  
}

createCartFunction = async (userId) => {
  try {
    const newCart = {
      userId,
      books: [],
      price: '23',
    }

    return await new Cart(newCart).save()
  } catch(e) {
    return null
  }
}

exports.getAllCarts = async (req, res) => {
  const cart = await Cart.find({})
  
  res.json(cart)
}

exports.addNewBook = async (req, res) => {
  const userId = req.body.userId
  const cart = await Cart.findOne({userId}).exec()
  const cartBooks = cart.books
  
  const updCart = addBook(cartBooks, req.body.bookId)
  const filter = { userId }
  
  await Cart.findOneAndUpdate(filter, updCart)
  const updatedCart = await Cart.findOne({ userId })
  const books = await getBooksById(updatedCart.books)
  const response = {
    ...updatedCart['_doc'],
    books,
  }
  
  res.json(response)
}


exports.deleteBook = async (req, res) => {
  const userId = req.body.userId
  const bookId = req.body.bookId
  console.log('Body: ', req.body)
  
  const cart = await Cart.findOne( { userId })
  
  const updBooks = {
    books: removeElementFromArray(cart.books, bookId)
  }
  const filter = { userId }  
  
  await Cart.findOneAndUpdate(filter, updBooks)
  const updatedCart = await Cart.findOne({ userId })
  const books = await getBooksById(updatedCart.books)
  const response = {
    ...updatedCart['_doc'],
    books,
  }
  
  res.json(response)
}

exports.getCart = async (req, res) => {
  console.log(req.body)
  const userId = req.params.userId
  const cart = await Cart.findOne({ userId })
  console.log('Cart: ', cart)
  const books = await getBooksById(cart.books)
  const response = {
    ...cart['_doc'],
    books,
  }
  
  console.log('Response: ', response)
  
  return (res.json(response))  
}

exports.order = async (req, res) => {
  try {
    const userId = req.body.userId
    const cart = await Cart.findOne({userId})

    const historyCart = {
      userId: cart.userId,
      price: cart.price,
      books: [ ...cart.books ]
    }
    
    const savedHistoryCart = await new HistoryCart(historyCart).save()
    await Cart.findOneAndDelete({ userId })
    const newCart = await createCartFunction(userId)

    res.json(newCart)
  } catch(er) {
    res.status(400).send('error')
  }
}

exports.getAllHistory = async (req, res) => {
  const userId = req.params.userId
  const cartHistories = await HistoryCart.find({ userId })
  
  res.json(cartHistories)
}