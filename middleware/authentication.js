const { UnauthenticatedError } = require('../errors')
const jwt = require("jsonwebtoken")

const authentication = (req,res,next) =>{
    const authHeaders = req.headers.authorization
    if (!authHeaders || !authHeaders.startsWith("Bearer ")){
        throw new UnauthenticatedError("Invalid authentication")
    }
    const token = req.headers.authorization.split(" ")[1];

    try {
        const payload = jwt.verify(token,process.env.JWT_SECRET)
        req.user = {userId: payload.userId, username: payload.username}
    } catch (error) {
        throw new UnauthenticatedError("Authentication invalid")
        
    }

    next()
}

module.exports = authentication