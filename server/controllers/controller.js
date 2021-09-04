const { User, Employee, Manager } = require('../models')
const {comparePass} = require('../helpers/bcrypt')
const {generateJwt} = require('../helpers/jwt')

class Controller {
  static async Login (req, res, next) {
    try {
      const { email, password } = req.body
      const user = await User.findOne({where: {email}})
      if(!user) throw { error: 'Wrong Email or Password', status: 400 }
      const pass = comparePass(user.password, password)
      if(!pass) throw { error: 'Wrong Email or Password', status: 400 }
      let access_token;
      if(user.userType == 'employee') {
        const employee = await Employee.findOne({where: {userId: user.id}})
        access_token = generateJwt({
          id: user.id,
          userType: user.userType,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          employeeId: employee.id,
          managerId: employee.managerId
        })
      } else {
        const manager = await Manager.findOne({where: {userId: user.id}})
        access_token = generateJwt({
          id: user.id,
          userType: user.userType,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          managerId: manager.id
        })
      }
      res.status(200).json({ access_token })
    } catch (error) {
      next(error)
    }
  }

  static async register (req, res, next) {
    try {
      const {firstName, lastName, email, userType, password, secretKey} = req.body
      const user = await User.create({firstName, lastName, userType, email, password})
      if(userType == 'employee') {
        const manager = await Manager.findOne({where: {secretKey}})
        await Employee.create({userId: user.id, managerId: manager.id})
      } else {
        await Manager.create({userId: user.id})
      }
      res.status(201).json({message: 'register success'})
    } catch(error) {
      next(error)
    }
  }

  static async getUser (req, res, next) {
    try {
      let data = {}
      if(req.user.userTpe === 'employee') {
        data = {name: `${req.user.firstName} ${req.user.lastName}`, email: req.user.email, userType: req.user.userType}
      } else {
        let manager = await Manager.findByPk(req.user.managerId)
        data = {name: `${req.user.firstName} ${req.user.lastName}`, email: req.user.email, userType: req.user.userType, secretKey: manager.secretKey}
      }
      res.status(200).json(data)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = Controller