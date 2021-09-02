const bcrypt = require('bcrypt')

function hashPass(password) {
  return bcrypt.hashSync(password, 10)
}

function comparePass(hashedPass, password) {
  return bcrypt.compareSync(password, hashedPass)
}

module.exports = {
  hashPass,
  comparePass
}