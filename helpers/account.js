const { createCart } = require('../controllers/cart')
const { createWishlist } = require('../controllers/wishlist')

exports.accountExist = account => account !== {}

exports.createCartHelper = async userId => {
  const cart = await createCart(userId)
  
  return cart ? cart : null
}

exports.createWishlistHelper = async userId => {
  const wishlist = await createWishlist(userId)
  
  return wishlist ? wishlist : null
}