const Category = require('../models/category')
const slugify = require('slugify')

exports.create = async (req, res) => {
  try {
    const { name } = req.body
    const category = await new Category({ name, slug: slugify(name) }).save()
    res.json(category)
  } catch (err) {
    res.status(400).send('Create category failed')
  }
}
exports.list = async (req, res) => {
  res.json(await Category.find({}).sort({ createdAt: -1 }).exec()) // created -1 lasted category created
}
exports.read = async (req, res) => {
  let category = await Category.findOne({ slug: req.params.slug }).exec() // read only one category
  res.json(category)
}
exports.update = async (req, res) => {
  const { name } = req.body
  try {
    const updated = await Category.findOneAndUpdate(
      { slug: req.params.slug }, // update by slug
      { name, slug: slugify(name) }, // update the name with the new name and recreate the slug
      { new: true }
    )
    res.json(updated)
  } catch (err) {
    res.status(400).send(' Category update failed')
  }
}
exports.remove = async (req, res) => {
  try {
    const deleted = await Category.findOneAndDelete({ slug: req.params.slug }) // get the deleted one and delete it
    res.json(deleted) // sended
  } catch (err) {
    res.status(400).send('Delete category failed')
  }
}
