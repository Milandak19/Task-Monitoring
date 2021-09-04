const { Task, User, Employee } = require('../models')

module.exports = class ControllerTask {
  static async getTasks(req,res,next) {
    try {
      const user = req.user
      let task;
      let employee= [];
      let resss = []
      if(user.userType === 'employee') {
        task = await Task.findAll({where: {employeeId: user.employeeId}, order: [['id', 'ASC']]})
        res.status(200).json(task)
      } else if(user.userType == 'manager') {
        task = await Task.findAll({where: {managerId: user.managerId}, order: [['id', 'ASC']]})
        for (let i = 0; i < task.length; i++) {
          let temp = await Employee.findAll({where: {id: task[i].employeeId}, include: [User]})
          employee.push({
            ...task[i].dataValues,
            name: `${temp[0].User.firstName} ${temp[0].User.lastName}`,
          })
        }
        console.log(employee)
        res.status(200).json(employee)
      }
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  static async getTask(req,res,next) {
    try {
      const task = await Task.findByPk(req.params.id)
      if(!task) throw {error: 'Task not found!', status: 400}
      res.status(200).json(task)
    } catch (error) {
      next(error)
    }
  }

  static async postTask(req,res,next) {
    try {
      const user = req.user
      const {task, status} = req.body
      await Task.create({task, employeeId: user.employeeId, managerId: user.managerId, status})
      res.status(201).json({message: 'create task success!'})
    } catch (error) {
      next(error)
    }
  }

  static async putTask(req,res,next) {
    try {
      const {task, status} = req.body
      const id = req.params.id
      const editedTask = await Task.update(
        {task, status},
        {
          where: {id}, 
          returning: true
        })
      if(editedTask[1].length === 0) throw {error: 'Task not found!', status: 400}
      res.status(200).json(editedTask[1][0])
    } catch (error) {
      next(error)
    }
  }

  static async patchTask(req,res,next) {
    try {
      const {status} = req.body
      const id = req.params.id
      const editedStatusTask = await Task.update({status}, {where: {id}, returning: true})
      if(editedStatusTask[1].length === 0) throw {error: 'Task not found!', status: 400}
      res.status(200).json(editedStatusTask[1][0])
    } catch (error) {
      next(error)
    }
  }

  static async destroyTask(req,res,next) {
    try {
      const id = req.params.id
      const deletedTask = await Task.destroy({where: {id}})
      if(!deletedTask) throw {error: 'Task not found!', status: 400}
      res.status(200).json({message: 'delete task success!'})
    } catch (error) {
      next(error)
    }
  }
}