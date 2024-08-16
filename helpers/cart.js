exports.addBook = (cartBooks, newBookId) => {
  return {
    books: [...cartBooks, newBookId]
  }
}
