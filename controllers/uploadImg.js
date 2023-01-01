const path = require("path")
const uniqid = require('uniqid')
const {BadRequestError} = require('../errors')


const uploadImages = async(req,res,next)=>{
    if(!req.files){
        throw new BadRequestError("No files attached")
    }
    const {image} = req.files;
    const newName = uniqid()+'.jpg'
    const imagePath = path.join(__dirname,'../public/')
    const maxSize = 1024 * 1024;
   
        if (image.mimetype.startsWith("image") && image.size < maxSize){
            await image.mv(imagePath+newName)
            req.body.image = newName
       
        }

    next()
    }
    


const getImages = async (req,res, next)=>{
    var options = {
        root: path.join(__dirname, '../public'),
        dotfiles: 'deny',
        headers: {
          'x-timestamp': Date.now(),
          'x-sent': true
        }
      }
    
      var fileName = req.params.name
      res.sendFile(fileName, options)
}

module.exports = {uploadImages,getImages}



