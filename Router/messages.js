const express = require("express")
const Router = express.Router()
const {sendMessage,getMessages} = require('../controllers/messages')
const authentication = require('../middleware/authentication')

Router.route('/send').post(authentication,sendMessage)
Router.route('/').get(authentication,getMessages)


module.exports = Router