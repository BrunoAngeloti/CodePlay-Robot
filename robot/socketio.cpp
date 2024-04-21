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

void onFinishCommands(){
    DynamicJsonDocument doc(256);
    JsonArray array = doc.to<JsonArray>();

    // Adicionar o nome do evento
    array.add("finishCommands");

    // Adicionar payload, se necessário
    JsonObject payload = array.createNestedObject();
    payload["espID"] = "1"; // Ou a ID real do seu dispositivo ESP

    // Serializar e enviar
    String output;
    serializeJson(doc, output);
    socket.sendEVENT(output);
    Serial.println("Comandos finalizados enviados ao servidor.");
}


void processCommands(JsonArray commandsArray) {
    for (JsonObject command : commandsArray) {
        const char* commandId = command["id"];
        const char* data = command["data"];

        if (strcmp(commandId, "move_forward") == 0) {
            moveForwardCentimeters(atoi(data));
            
        } else if (strcmp(commandId, "move_back") == 0) {
            moveBackwardCentimeters(atoi(data));
            
        } else if (strcmp(commandId, "move_right") == 0) {
           moveRightDegrees(atoi(data));

        } else if (strcmp(commandId, "move_left") == 0) {
           moveLeftDegrees(atoi(data));
           
        } else if (strcmp(commandId, "wait") == 0) {
           waitForSeconds(atoi(data));
           
        } else {
            Serial.println("Comando desconhecido");
        }
    }
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

            if (eventName == "commands") {
              JsonArray commandsArray = array[1].as<JsonArray>();
              processCommands(commandsArray);
              onFinishCommands();
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
