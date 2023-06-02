import {io} from 'socket.io-client'


export const createSocket = (userId) => io('http://localhost:3000/', {
    query: {
        id: userId
    }
})
export const sendMessage = (socket, data) => {
    socket.emit('chat', data)
}

export const joinSocket = (socket, userId) => {
    socket.emit('join', {
        id: userId
    })
}