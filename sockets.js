const socketIO = require('socket.io');

module.exports = function (server, corsOptions) {
  const io = socketIO(server, {
    cors: corsOptions,
  });

  function isAnyOtherUserInRoom(roomId) {
    const room = io.sockets.adapter.rooms.get(roomId);
    if (room) {
      return true 
    }
    return false;
  }

 
  
  io.on('connection', (socket) => {
    console.log("user connected "+socket.id)
   
    socket.on('disconnect', () => {
        console.log('A user disconnected:', socket.id);
      });

    socket.on('checkOtherUserInRoom', (roomId) => {
      const otherUserConnected = isAnyOtherUserInRoom(roomId);
      socket.emit('otherUserInRoomStatus', otherUserConnected);
    });

    socket.on('joinRoom',(roomId)=>{
      console.log("a user joined room "+roomId)
        socket.join(roomId);
    })
    socket.on('sendMsg',(roomId,message,sender)=>{
      console.log("received",roomId, message,sender)
        io.to(roomId).emit('receive-message', { sender: sender, message })
    })
  });
};