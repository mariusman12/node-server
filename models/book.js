const mongoose = require('mongoose')

const { ObjectId } = mongoose.Schema

const bookSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      trim: true,
      unique: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true, // query the db based on slug
    },
    title: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
      text: true,
    },
    author: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
      text: true,
    },
    shortDescription: {
      type: String,
      required: true,
      maxlength: 32,
      text: true,
    },
    longDescription: {
      type: String,
      required: true,
      text: true,
    },
    pages: {
      type: Number,
      trim: true,
      required: true,
    },
    reviews: {
      type: Number,
      trim: true,
    },
    quantity: Number,
    rents: {
      type: Number,
      trim: true,
      default: 0,
    },
    images: {
      type: Array,
    },
    shipping: {
      type: String,
      enum: ['Yes', 'No'],
    },
    ratingTotal: {
      type: Number,
      trim: true,
    },
    nrRaitings: {
      type: Number,
      trim: true,
    },
    category: {
      type: String,
      ref: 'Category',
    },
    ratings: [
      {
        star: Number,
        postedBy: { type: ObjectId, ref: 'User' },
      },
    ],
  },
  { timestamps: true }
)

module.exports = mongoose.model('Book', bookSchema)
