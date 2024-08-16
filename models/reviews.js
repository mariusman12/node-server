const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    rating: {
      type: Number,
    },
    isBookReview: {
      type: Boolean,
      default: false
    },
    bookId: {
      type: String,
      default: null
    },
    reviewContent: {
      type: String,
      default: null
    }
  }
)

module.exports = mongoose.model('Review', reviewSchema)