#include "socketio.h"
#include "fingers.h"
#include "motors.h"
#include <ArduinoJson.h>

SocketIOclient socket;

// inicializa o socket.io-client
void init_socket()
{
  socket.begin("192.168.15.86", 4000, "/socket.io/?EIO=4");
  socket.onEvent(socketIOEvent);

  Serial.println("Configurado o socket.io");
  delay(1000); 
}

void connection_socket()
{
  socket.loop();
}

void onConnected(){
  DynamicJsonDocument doc(1024);
  JsonArray array = doc.to<JsonArray>();

  // Adicionar o nome do evento
  array.add("registerESP");

  // Adicionar payload (parâmetros) para o evento
  JsonObject param1 = array.createNestedObject();
  param1["espID"] = "1";

  // JSON para String (serialização)
  String output;
  serializeJson(doc, output);

  // Enviar evento
  socket.sendEVENT(output);
  Serial.println(output);
}

void socketIOEvent(socketIOmessageType_t type, uint8_t * payload, size_t length) {
    switch(type) {
        case sIOtype_DISCONNECT:
            Serial.printf("[IOc] Disconnected!\n");
            break;
        case sIOtype_CONNECT:
            Serial.printf("[IOc] Connected to url: %s\n", payload);
            
            // join default namespace (no auto join in Socket.IO V3)
            socket.send(sIOtype_CONNECT, "/");
            onConnected();
            break;
        case sIOtype_EVENT: {
            Serial.printf("[IOc] get event: %s\n", payload);

            DynamicJsonDocument doc(1024);

            deserializeJson(doc, payload);

            JsonArray array = doc.as<JsonArray>();

            String eventName = array[0].as<String>();
        
            if (eventName == "controlDirection") {
              const char* direction = array[1]["direction"];
              moveRobot(direction);
            }
                 
            break;
        }
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
