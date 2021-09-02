const router = require('express').Router()
const Controller = require('../controllers/controller')
const ControllerTask = require('../controllers/controllerTask')

router.post('/login', Controller.Login)
router.post('/register', Controller.register)
router.get('/task', ControllerTask.getTask)
router.post('/task', ControllerTask.postTask)

module.exports = router