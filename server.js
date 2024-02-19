const http = require('http')

const server = http.createServer((req, res) => {

})
const io = require('socket.io')(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'] // Укажите методы, которые вы хотите разрешить
    }
});

const activeUsers = {}

const removeUser = (userID) => {
    delete activeUsers[userID]
}

const isUsernameAvailable = (username) => {
    let usernames = Object.values(activeUsers);
    if (usernames.includes(username)) {
        return false
    } else {
        return true
    }
}


io.on('connection', (socket) => {
    const username = socket.handshake.query.username
    if (isUsernameAvailable(username)) {
        activeUsers[String(socket.id)] = username
        socket.emit('warn', { code: 'success', message: `Добро пожаловать, ${username} <3` })
        console.log(`User ${username} with ID: ${socket.id} connected!`)
    } else {
        socket.emit('warn', { code: 'error', message: `Никнейм уже занят, выбери другой :(` })
        socket.disconnect(true);
    }
    socket.on("disconnect", () => {
        console.log(`User ${socket.handshake.query.username} ${socket.id} disconnected!`)
        removeUser(socket.id)
    })
})

const PORT = 3333;
server.listen(PORT, () => {
    console.log(`Server is running on port - ${PORT}`)
})