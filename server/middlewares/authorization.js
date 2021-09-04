const { User } = require('../models/')

const authorization = (req, res, next) => {
  const idUser = req.user.id
  User.findByPk(+idUser)
    .then(data => {
      if (!data) {
        throw { error: 'Invalid Token', status: 401 }
      }
      else if (data.userType !== 'employee') {
        throw { error: 'Unauthorized', status: 403}
      }
      next()
    })
    .catch(err => {
      next(err)
    })
}

module.exports = authorization