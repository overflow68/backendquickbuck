const Express = require("express")
const {register,login} = require('../controllers/auth')
const Router = Express.Router()

Router.route('/register').post(register)
Router.route('/login').post(login)

module.exports = Router