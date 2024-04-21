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

  socket.on("robotSelected", (data) => {
    const { espId } = data;
    console.log(`Robô ${espId} selecionado pelo usuário.`);
    socket.join(espId);
  });

  socket.on("registerESP", (data) => {
    const espId = data.espID;
    espClients[espId] = socket.id;
    console.log(`ESP ${espId} registrado com o socket ID ${socket.id}`);

    socket.emit("espRegistered", { espId, clientId: socket.id });
  });

  socket.on("finishCommands", (data) => {
    const espId = data.espID;
    const clientId = espClients[espId];

    if (clientId) {
      console.log(
        `Notificando conclusão de comandos para o cliente com ID: ${clientId}`
      );
      io.to(clientId).emit("commandsCompleted", {
        message: "Comandos finalizados.",
      });
    } else {
      console.log(
        `ESP ID ${espId} não encontrado ao tentar finalizar comandos.`
      );
    }
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

  socket.on("executeCommands", (data) => {
    const { espId, commands } = data;

    io.to(espId).emit("commands", commands);

    console.log(`Comandos enviados para ESP com ID ${espId}:`, commands);
  });
});
