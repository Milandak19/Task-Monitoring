const { Task } = require('../models')
const { verifyJwt } = require('../helpers/jwt')

module.exports = class ControllerTask {
  static async getTask(req,res,next) {
    try {
      const user = verifyJwt(req.headers.access_token)
      let task;
      if(user.userType === 'employee') {
        task = await Task.findAll({where: {employeeId: user.employeeId}})
        res.status(200).json(task)
      } else if(user.userType == 'manager') {
        task = await Task.findAll({where: {managerId: user.managerId}})
        res.status(200).json(task)
      }
    } catch (error) {
      next(error)
    }
  }

  static async postTask(req,res,next) {
    try {
      const user = verifyJwt(req.headers.access_token)
      const {task, status} = req.body
      await Task.create({task, employeeId: user.employeeId, managerId: user.managerId, status})
      res.status(201).json({message: 'create task success!'})
    } catch (error) {
      next(error)
    }
  }
}