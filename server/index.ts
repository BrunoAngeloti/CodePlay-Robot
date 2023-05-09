// server
const PORT = process.env.PORT || 4000

const io = require('socket.io')(PORT, {
    cors: {
        origin: '*'
    }
});

let lastData = {}

io.on("connection", socket => {
    console.log("USUARIO: " + socket.id);

    socket.on('data', data => {
        console.log(data)
    })

    socket.on("disconnect", () => {
        console.log("USUARIO DESCONECTADO: " + socket.id);
    });
});