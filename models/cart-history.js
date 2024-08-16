const mongoose = require('mongoose')

const cartHistorySchema = new mongoose.Schema({
  userId: {
    type: String,
    unique: true,
  },
  books: {
    type: [String]
  },
  price: {
    type: String,
  }
})

module.exports = mongoose.model('HistoryCart', cartHistorySchema)