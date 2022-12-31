const Express = require("express")
const authentication = require("../middleware/authentication")
const {
    createListing,
    getAllListings,
    getSingleListing,
    editListing,
    deleteListing} = require('../controllers/listings')
    const {uploadImages,getImages} = require('../controllers/uploadImg')
const Router = Express.Router()

Router.route('/').get(getAllListings).post(authentication,uploadImages,createListing)
Router.route('/getimg/:name').get(getImages)
Router.route('/:id').get(getSingleListing).patch(authentication,editListing).delete(authentication,deleteListing)

module.exports = Router