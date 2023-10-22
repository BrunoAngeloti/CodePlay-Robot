#include "socketio.h"
#include "fingers.h"
#include <ArduinoJson.h>

SocketIOclient socket;

// inicializa o socket.io-client
void init_socket()
{
  socket.begin("192.168.15.86", 4000, "/socket.io/?EIO=4");

  socket.onEvent(socketIOEvent);
  Serial.println("Configurado o socket.io");
  delay(500);
}

void connection_socket()
{
  socket.loop();
}


void socketIOEvent(socketIOmessageType_t type, uint8_t * payload, size_t length) {
    String text = String((char *)&payload[0]);
    String onoff = text.substring(8, text.length()-1);
    
    switch(type) {
        case sIOtype_DISCONNECT:
            Serial.printf("[IOc] Desconectado!\n");
            break;
        case sIOtype_CONNECT:
            Serial.printf("[IOc] Conectado ao url: %s\n", payload);
            socket.send(sIOtype_CONNECT, "/");
            break;
        case sIOtype_EVENT:
            Serial.printf("[IOc] get event: %s\n", payload); 
            changeLEDStatus(onoff);
            break;
        case sIOtype_ACK:
            Serial.printf("[IOc] get ack: %u\n", length);
            hexdump(payload, length);
            break;
        case sIOtype_ERROR:
            Serial.printf("[IOc] get error: %u\n", length);
            hexdump(payload, length);
            break;
        case sIOtype_BINARY_EVENT:
            Serial.printf("[IOc] get binary: %u\n", length);
            hexdump(payload, length);
            break;
        case sIOtype_BINARY_ACK:
            Serial.printf("[IOc] get binary ack: %u\n", length);
            hexdump(payload, length);
            break;
    }
}


// Recebe algo do servidor
void event(const char *payload, size_t length)
{
  Serial.printf("got message: %s\n", payload);
}
