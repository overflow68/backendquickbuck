require('dotenv').config();
require('express-async-errors');
const express = require('express');
const AuthRouter = require('./Router/auth');
const ListingRouter = require('./Router/listings');
const connectDB = require('./db/connectDB');
const fileUpload = require('express-fileupload');
const cors = require('cors')
const cloudinary = require("cloudinary").v2
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.API_SECRET
})

var bodyParser = require('body-parser');



const app = express();
const errorMiddleware = require('./middleware/error-handler');

const { PORT } = process.env;

app.use(express.json());
app.use(express.static('./public'))
app.use(fileUpload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())


app.use('/api/v1/auth',AuthRouter);
app.use('/api/v1/listings',ListingRouter)
app.use(errorMiddleware);

app.listen(PORT, async () => {
  try {
    await connectDB(process.env.MONGO_URI);
  } catch (error) {
  }
  console.log(`Listening on port ${PORT}`);
});


const uploadImages = async(req,res,next)=>{
  temp_file_path = ""
  tmp.file((err, path, fd, cleanup) => {
      if (err) {
        console.error(`An error occurred while creating the temporary file: ${err}`);
      } else {
        console.log(`Successfully created the temporary file: ${path}`);
        temp_file_path = path
    
        // Write the image data to the temporary file.
        fs.writeFile(path, req.files.image.data, (writeErr) => {
          if (writeErr) {
            console.error(`An error occurred while writing to the temporary file: ${writeErr}`);
          } else {
            console.log(`Successfully added the image data to the temporary file`);
          }
        });
      }
      
    });
    const result = await cloudinary.uploader.upload(temp_file_path, {
      use_filename: true,
      folder: 'file-upload',
    })

    req.body.image = result.secure_url
    next()


  }