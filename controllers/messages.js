const Message = require('../models/messages')

const sendMessage = async(req,res)=>{
    const {userId,username} = req.user
    const {receiver,message} = req.body
        const Input = await Message.create({message:message,createdBy:userId,username:username,to:receiver})
    res.status(200).json({Input})
    

}
           
const getMessages = async(req,res)=>{
    const {receiver} = req.params
    const {userId} = req.user
    
 const received = await Message.find({createdBy:receiver,to:userId})
 const sent = await Message.find({createdBy:userId,to:receiver})
 const mixedMessages = received.concat(sent).sort((a,b)=>a.createdAt.getTime()-b.createdAt.getTime())
 res.status(200).json({mixedMessages})

}

const getConvos = async(req,res)=>{
    const {userId} = req.user
    const convos =[]
    const rawConvos = await Message.find({to:userId})

    rawConvos.forEach(item=>{
        convos.push([item.username,item.createdBy])
    })
    const arrConvos = convos.filter(( t={}, a=> !(t[a]=a in t) ))
    const finalConvos = []
    arrConvos.forEach(item =>{
        const [username,id] = item
        finalConvos.push({username,id})
    })
    res.status(200).json(finalConvos)
}

module.exports = {sendMessage,getMessages,getConvos}