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
        tmp.file((err, path, fd, cleanup) => {
            if (err) {
              console.error(`An error occurred while creating the temporary file: ${err}`);
            } else {
              console.log(`Successfully created the temporary file: ${path}`);
          
              // Write the image data to the temporary file.
              fs.writeFile(path, req.files.image.data, (writeErr) => {
                if (writeErr) {
                  console.error(`An error occurred while writing to the temporary file: ${writeErr}`);
                } else {
                  console.log(`Successfully added the image data to the temporary file`);
          
                  cloudinary.uploader.upload(path)
                  .then(function(image) {
                    // Set req.body.image to the secure URL of the image
                    req.body.image = image.secure_url;
                    res.status(200).json({pic:image.secure_url})
                  })
                  .catch(function(error) {
                    console.log(error);
                  });
                  
                }
              });
            }
          });
        }
    




module.exports = {uploadImages}



