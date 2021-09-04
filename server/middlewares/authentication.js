const { verifyJwt } = require('../helpers/jwt')
const { User } = require('../models')

const authentication = (req, res, next) => {
  try {
    let access_token = req.headers.access_token
    let decoded = verifyJwt(access_token);

    User.findByPk(decoded.id)
      .then(data => {
        req.user = decoded
        next()
      })
      .catch(err => {
        throw { error: 'Invalid Email or Password', status: 401 }
      })
  } catch (err) {
    next(err)
  }
}

module.exports = authentication