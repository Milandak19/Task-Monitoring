const router = require('express').Router()
const Controller = require('../controllers/controller')
const authentication = require('../middlewares/authentication')
const routerTask = require('./routerTask')

router.post('/login', Controller.Login)
router.post('/register', Controller.register)
router.use(authentication)
router.use('/task', routerTask)

module.exports = router