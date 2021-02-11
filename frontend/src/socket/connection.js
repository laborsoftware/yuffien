import io from 'socket.io-client'
let socket = null

export default () => {
    if (socket) return socket

    socket = io('http://localhost:1111', {
        transports: ['websocket', 'polling', 'flashsocket']
    })
    return socket
}