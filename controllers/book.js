const Book = require('../models/book')
const Category = require('../models/category')
const slugify = require('slugify')
const { shuffleArray, takeFirstElements  } = require('../helpers/arrays')

exports.create = async (req, res) => {
  try {
    req.body.slug = slugify(req.body.title)
    const category = await Category.findById(req.body.category)

    const newBook = {
      ...req.body,
      category: category.slug,
    }
    const savedBook = await new Book(newBook).save()

    res.json(savedBook)
  } catch (err) {
    res.status(400).send('Create book failed')
  }
}

exports.read = async (req, res) => {
  let books = await Book.find({})
  const categories = await Category.find({})
  let collections = []
  categories.map((category, index) =>
    collections.push({ index, category: category.slug, books: [] })
  )

  books.map((book) => {
    collections.map((collection) => {
      if (collection.category === book.category) {
        collection.books.push(book)
      }
    })
  })

  res.json(collections)
}

exports.getBookByName = async (req, res) => {
  let books = await Book.find({})
  const book = books.filter((book) => book.slug === req.params.slug)
  res.json(book)
}

exports.getBookById = async bookId => {
  return await Book.findById(bookId).exec()
}

exports.getLastAdded = async (req, res) => {
  const books = await Book.find({})

  const alteretedBooks = books.reverse().slice(0, 9)
  res.json(alteretedBooks)
}

exports.getFeatureBooks = async (req, res) => {
  const books = await Book.find({})
  const shuffleBooks = shuffleArray(books)
  const firstBooks = takeFirstElements(shuffleBooks, 10)
  
  res.json(firstBooks)
}

exports.getBooksByCategory = async (req, res) => {
  const category = req.params.category
  const books = await Book.find({ category })
  
  res.json(books)
}