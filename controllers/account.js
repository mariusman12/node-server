const Account = require('../models/account')
const { hashPassword, verifyPasswords } = require('../helpers/bcrypt')
const { accountExist, createCartHelper, createWishlistHelper } = require('../helpers/account')

exports.createAccount = async (req, res) => {
  try {
    const isAlreadyRegistered = await Account.findOne({email: req.body.email})

    const hashedPassword = await hashPassword(req.body.password)

    const newUser = {
      ...req.body,
      password: hashedPassword
    }
    
    if(isAlreadyRegistered) {
      res.status(402).send('Already registered!')
    }

    const savedUser = await new Account(newUser).save()
    
    const cart = await createCartHelper(savedUser['_id'])
    const wishlist = await createWishlistHelper(savedUser['_id'])
    
    cart && wishlist ? res.json(savedUser) : res.status(400).send('Register failed')
    
    } catch(e) {
      res.status(400).send('Something went wrong')
    }
}

exports.login = async (req, res) => {
  try {
    const account = await Account.findOne({ email: req.body.email }).exec()
    
    if(accountExist(account)) {
      await verifyPasswords(req.body.password, account.password) && res.json(account)
      
      res.status(400).send('Invalid password')
    } 
    else {
      res.status(400).send('Invalid inputs!')
    }
  }
  catch (e) {
    res.status(400).send('Something went wrong...')
  }
}