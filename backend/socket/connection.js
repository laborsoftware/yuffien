const io = require('socket.io')
let socketServer = null

module.exports = (app, server) => {
    if (socketServer) return socketServer

    socketServer = io(server)
    socketServer.on('connection', socket => {
        console.log('a user connect')

        socket.on('join', id => {
            socket.join(id)
        })

        socket.on('information', data => {
            const id = data._id || data.id
            socketServer.to(id).emit('information', data)
        })
    })
    return socketServer
}