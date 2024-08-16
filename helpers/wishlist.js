exports.findWishlistByUserId = (wishlists, userId) => {
  return wishlists.find(el => {
    console.log('UserId: ', userId)
    console.log('Element userId: ', el['userId'])
    console.log('Are true: ', userId === el['userId'])
    return el.userId === userId
  })
}