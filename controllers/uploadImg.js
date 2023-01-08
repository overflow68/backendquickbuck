const path = require("path")
const uniqid = require('uniqid')
const cloudinary = require('cloudinary').v2
const {BadRequestError} = require('../errors')
const fs = require('fs');
const tempDir = require('os').tmpdir();
const tmp = require('tmp')



const uploadImagesOld = async(req,res,next)=>{
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

    const uploadImages = async(req,res,next)=>{
        
                    res.status(200).json({pic:"pac"})
                 
        }
    




module.exports = {uploadImages}



