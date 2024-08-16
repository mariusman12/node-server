const { getBookById } = require('../controllers/book')
const { isEmpty } = require('lodash')

exports.getBooksById = async booksIds => !isEmpty(booksIds) ?
    await Promise.all(booksIds.map(async bookId => await getBookById(bookId))) : []
