const PORT = process.env.PORT || 4000;
const io = require("socket.io")(PORT, {
  cors: {
    origin: "*",
  },
});

// Dicionário para associar ID do ESP com ID do Cliente
let espClients = {};

io.on("connection", (socket) => {
  console.log("USUÁRIO CONECTADO: " + socket.id);

  socket.on("requestEspList", () => {
    // Envie de volta a lista de ESPs para o solicitante
    socket.emit("espListResponse", espClients);
  });

  socket.on("registerESP", (data) => {
    const espId = data.espID;
    espClients[espId] = socket.id;
    console.log(`ESP ${espId} registrado com o socket ID ${socket.id}`);

    socket.emit("espRegistered", { espId, clientId: socket.id });
  });

  socket.on("data", (data) => {
    const { espId, ...payload } = data;
    const clientId = espClients[espId];
    if (clientId) {
      io.to(clientId).emit("info", payload);
    } else {
      console.log(`ESP ID ${espId} não encontrado.`);
    }
  });

  socket.on("controlDirection", (data) => {
    const { espId, direction } = data;

    console.log(`Direção ${direction} recebida do ESP ${espId}`);

    if (espId) {
      io.to(espId).emit("controlDirection", { direction });
    } else {
      console.log(`ESP ID ${espId} não encontrado.`);
    }
  });

  socket.on("disconnect", () => {
    const espId = Object.keys(espClients).find(
      (key) => espClients[key] === socket.id
    );
    if (espId) {
      delete espClients[espId];
      console.log(`Associação ESP ${espId} removida.`);
    }
    console.log("USUÁRIO DESCONECTADO: " + socket.id);
  });
});
