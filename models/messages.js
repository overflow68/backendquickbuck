const mongoose = require("mongoose")

const messageSchema = mongoose.Schema({

    message:{
        type:String,
        required:[true,"You can't send an empty message!"],
        maxLength:150

    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide user'],
      },
      username: {
        type: String,
        required:[true,"Provide the username for the listing"],
      },
      to:{
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required:[true,"Specify who the message is for"]
      }
  

},{ timestamps: true })


module.exports = mongoose.model('Message',messageSchema)