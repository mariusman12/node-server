const mongoose = require('mongoose')

const { ObjectId } = mongoose.Schema

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      required: true,
      index: true,
    },
    role: {
      type: String,
      default: 'subscriber',
    },
    cart: {
      type: Array,
      default: [],
    },
    address: String,
    // wishlist: [{type:ObjectId, ref: 'Product'}],
  },
  { timestamps: true }
) // timestamps:true de fiecare data cand faci un user nou se autopopuleaza singura db

module.exports = mongoose.model('User', userSchema)
