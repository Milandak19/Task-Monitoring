const { User } = require('../models')
const {comparePass} = require('../helpers/bcrypt')
const {generateJwt} = require('../helpers/jwt')

class Controller {
  static Login (req, res, next) {
    const { email, password } = req.body
    User.findOne({where: {email}})
    .then(user => {
      if(!user) throw { error: 'Wrong Email or Password', status: 400 }
      const pass = comparePass(user.password, password)
      if(!pass) throw { error: 'Wrong Email or Password', status: 400 }
      const access_token = generateJwt({
        id: user.id,
        userType: user.userType,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      })
      res.status(200).json({ access_token })
    })
    .catch(error => {
      next(error)
    })
  }

  static register (req, res, next) {
    const {firstName, lastName, email, userType, password} = req.body
    User.create({firstName, lastName, userType, email, password})
    .then(data => {
      res.status(201).json({message: 'Register Success'})
    })
    .catch(error => {
      next(error)
    })
  }
}

module.exports = Controller