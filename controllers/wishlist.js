const Wishlist = require('../models/wishlist')
const { getBooksById } = require('../helpers/books')
const { findWishlistByUserId } = require('../helpers/wishlist')
const { 
  addNewBookInArray,
  removeElementFromArray,
} = require('../helpers/arrays')

exports.getUserWishlist = async (req, res) => {
  const userId = req.params.userId
  const wishlists = await Wishlist.find({}).exec()
  const wishlist = findWishlistByUserId(wishlists, userId)
  console.log('Wishlist: ', wishlist)
  
  if(wishlist) {
    const books = await getBooksById(wishlist.books)

    return (res.json(books))
  }
  
  return( res.json(null))
}

exports.createWishlist = async (userId) => {
  try {
    const newWishlist = {
      userId,
      books: []
    }
    console.log('New wishlist: ', newWishlist)
    
    return await new Wishlist(newWishlist).save()
  } catch(e) {
    return null
  }
}

exports.addNewBook = async (req, res) => {
  try {
    const userId = req.body.userId
    const bookId = req.body.bookId
    const wishlist = await Wishlist.findOne({ userId: userId }).exec()
    const updatedList = addNewBookInArray(wishlist.books, bookId)
    console.log('UpdatedList: ', updatedList)
    await Wishlist.findOneAndUpdate({userId}, updatedList)
    const newWishlist = await Wishlist.find({userId})

    res.json(newWishlist)
  } catch(e) {
    res.status(402).send('Something went wrong')
  }
}

exports.removeBook = async (req, res) => {
  const userId = req.body.userId
  const bookId = req.body.bookId
  const wishlist = await Wishlist.findOne({ userId })
  const updatedWishlistBooks = removeElementFromArray(wishlist.books, bookId)
  
  await Wishlist.findOneAndUpdate({ userId }, { books: updatedWishlistBooks })
  const updatedWishlist = await Wishlist.findOne({ userId })
  const response = await getBooksById(updatedWishlist.books)
  
  res.json(response)
}