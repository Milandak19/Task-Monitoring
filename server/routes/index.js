const router = require('express').Router()
const Controller = require('../controllers/controller')

router.post('/login', Controller.Login)
router.post('/register', Controller.register)

module.exports = router