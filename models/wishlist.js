const mongoose = require('mongoose')

const wishlistSchema = new mongoose.Schema({
  userId: {
    type: String,
    unique: true,
  },
  books: {
    type: [String]
  }
})

module.exports = mongoose.model('Wishlist', wishlistSchema)