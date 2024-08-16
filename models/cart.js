const mongoose = require('mongoose')

const { ObjectId } = mongoose.Schema

const booksSchema = new mongoose.Schema({
  type: 'String',
})

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      trim: true,
      unique: true,
    },
    books: {
      type: [String],
    },
    price: {
      type: String,
    }
  }
)

module.exports = mongoose.model('Cart', cartSchema)