const Listing = require('../models/listing')
const {BadRequestError, NotFoundError} = require('../errors/index')


const createListing = async (req, res)=>{
    const {userId,username} = req.user
    try {
        const newListing = await Listing.create({createdBy:userId,username:username, ...req.body})
    res.status(200).json(newListing)
    } catch (error) {
        res.status(420).json(error)
        console.log(error)
    }
    
}

const getAllListings = async (req, res)=>{
    const {category, createdBy, price,title} = req.query
    const {userId}= req.user || 1;
    let queryObject = {}
    if (category){
        queryObject.category = category;
    }
    if (title){
        queryObject.title = { "$regex": title, "$options": "i" };
    }
    if (createdBy){
        queryObject.createdBy = createdBy
    }
    if (price){
        const operatorMap = {
            '>': '$gt',
            '=': '$eq',
            '<': '$lt',
          };
          const regex = />|>=|=|<|<=/gi
          const replaced = price.replace(regex,(match)=> ` ${operatorMap[match]} `)
          queryObject.price = {$gte:replaced.split(' ')[2] || 1,$lte:replaced.split(' ')[4] || 1000000}

    }
    
    try {
        const result = await Listing.find(queryObject)
        res.status(200).json({result})
    } catch (error) {
        throw new BadRequestError("Query not supported")
        
    }

    
    
}

const getSingleListing = async (req, res)=>{
    const {params:{id}} = req

    if(!id){
        throw new BadRequestError("Please provide an id.")
    }
    const listing = await Listing.findById({_id:id})
    if(!listing){
        throw new NotFoundError(`The listing with id ${id} does not exist`)
    }
    res.status(200).json({listing})
    console.log(listing)

}

const editListing = async(req, res)=>{
    const {userId} = req.user
    const{ price, description, phoneNumber } = req.body
    if (!price || !description || !phoneNumber){
        throw new BadRequestError("The fields can't be left blank.")
    }

    
        const listing = await Listing.findOneAndUpdate({ _id: req.params.id,createdBy:userId},
            req.body,
            { new: true, runValidators: true })
            if (!listing){
                throw new NotFoundError("The listing you're trying to update does not exist or it doesn't belong to you.")
            }
        res.status(200).json({listing,msg:"Listing updated successfully"})
   
    
}

const deleteListing = async(req, res)=>{
    const {params:{id}} = req
    const {userId} = req.user

    if(!id){
        throw new BadRequestError("Please provide an id.")
    }
    const listing = await Listing.deleteOne({_id:id, createdBy:userId})
    if(!listing){
        throw new NotFoundError(`The listing with id ${id} does not exist`)
    }
    res.status(200).json({msg:`The listing with the id ${id} was deleted successfully`})
}

module.exports = {createListing,getAllListings,getSingleListing,editListing,deleteListing}

