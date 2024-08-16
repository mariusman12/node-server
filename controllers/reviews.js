const Review = require('../models/reviews')

exports.createForSite = async (req, res) => {
  try {
    const newReview = {...req.body}

    const savedReview = await new Review(newReview).save()
    
    res.json(savedReview)
  }
  catch (err) {
    res.status(400).send('failed')
  }
}

exports.createForBook = async (req, res) => {
  try {
    console.log('Create book: ', req.body)
    
    const newReview = {
      ...req.body,
      isBookReview: true,
    }
    
    const savedReview = await new Review(newReview).save()
    
    res.json(savedReview)
  }
  catch (err) {
    res.status(400).send('failed')
  }
}

exports.getBookReviews = async (req, res) => {
  console.log(req.params)
  const reviews = await Review.find({ bookId: req.params.bookId })
  
  res.json(reviews)
}

exports.getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({isBookReview: false})

    res.json(reviews)
  } catch(er) {
    res.status(400).send(er)
  }
}

exports.editReviews = async (req, res) => {
  console.log(req.body)
  const newReview = {
    ...req.body
  }
  console.log('New review: ', newReview)
  const filter = { _id: req.body._id }
  
  await Review.findOneAndUpdate(filter, newReview)
  const updatedReview = await Review.find({ _id: req.body._id })
  
  res.json(updatedReview)
}