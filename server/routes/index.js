const router = require('express').Router()
const Controller = require('../controllers/controller')
const ControllerTask = require('../controllers/controllerTask')

router.post('/login', Controller.Login)
router.post('/register', Controller.register)
router.get('/task', ControllerTask.getTask)
router.post('/task', ControllerTask.postTask)
router.put('/task/:id', ControllerTask.putTask)
router.patch('/task/:id', ControllerTask.patchTask)
router.delete('/task/:id', ControllerTask.destroyTask)

module.exports = router