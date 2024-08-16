const bcrypt = require('bcrypt')

exports.hashPassword = async passport => {
  const salt = await bcrypt.genSalt(10)
  
  return await bcrypt.hash(passport, salt)
}

exports.verifyPasswords = async (password, hashedPassword) => await bcrypt.compare(password, hashedPassword)