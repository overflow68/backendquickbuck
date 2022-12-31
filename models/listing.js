const mongoose = require('mongoose')

const ListingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a title for your listing'],
      maxlength: 50,
    },
    category: {
      type: String,
      required: [true, 'Please pick a category'],
      enum: ['Kids', 'Entertainment', 'Phones-Tablets', 'Agriculture','Animals','Sports','Fashion','Home','Tech','Vehicles','Real Estate','Services','Other'],
    },
    price: {
      type: Number,
      required: [true,'You must provide a price for your item']
    },
    description: {
        type: String,
        required:[true,"Provide a description of your item"],
        maxlength:200,
      },
      phoneNumber: {
        type: Number,
        required:[true,'Please provide a phone number so a potential buyer can contact you']
      },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user'],
    },
    image: {
      type: String,
      required:[true,"Provide images of the item"],
    },
    username: {
      type: String,
      required:[true,"Provide the username for the listing"],
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Listing', ListingSchema)