const express = require("express")
const Router = express.Router()
const {sendMessage,getMessages,getConvos} = require('../controllers/messages')
const authentication = require('../middleware/authentication')

Router.route('/send').post(authentication,sendMessage)
Router.route('/:receiver').get(authentication,getMessages)
Router.route('/get/convos').get(authentication,getConvos)


module.exports = Router