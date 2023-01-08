const Express = require("express")
const authentication = require("../middleware/authentication")
const {
    createListing,
    getAllListings,
    getSingleListing,
    editListing,
    deleteListing} = require('../controllers/listings')
    const {uploadImages} = require('../controllers/uploadImg')
const Router = Express.Router()

Router.route('/').get(getAllListings).post(authentication,createListing)
Router.route('/uploadimg').post(uploadImages)
Router.route('/:id').get(getSingleListing).patch(authentication,editListing).delete(authentication,deleteListing)

module.exports = Router