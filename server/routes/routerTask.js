const router = require('express').Router()
const ControllerTask = require('../controllers/controllerTask')
const authorization = require('../middlewares/authorization')

router.get('/', ControllerTask.getTask)
router.use(authorization)
router.post('/', ControllerTask.postTask)
router.put('/:id', ControllerTask.putTask)
router.patch('/:id', ControllerTask.patchTask)
router.delete('/:id', ControllerTask.destroyTask)

module.exports = router