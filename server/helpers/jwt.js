const jwt = require('jsonwebtoken')

const generateJwt = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET)
}

const verifyJwt = (access_token) => {
  return jwt.verify(access_token, process.env.JWT_SECRET)
}

module.exports = {
  generateJwt,
  verifyJwt
}