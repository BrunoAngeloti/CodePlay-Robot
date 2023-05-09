#include "socketio.h"
#include "fingers.h"


SocketIOclient socket;

void init_socket(){
  socket.begin("000.000.00.000", 4000, "/socket.io/?EIO=4");

  socket.onEvent(socketIOEvent);
  Serial.println("Configurado o socket.io");
  delay(500);
}

void connection_socket(){
  socket.loop();
}


void socketIOEvent(socketIOmessageType_t type, uint8_t * payload, size_t length) {
    /*TRANSFORMAR PARA OBJETO E CONSEGUIR USAR NO ESP*/
    /*String text = String((char *)&payload[0]);
    String objeto = text.substring(8, text.length()-1);
    DynamicJsonDocument doc(1024);
    deserializeJson(doc, objeto);
    JsonObject obj = doc.as<JsonObject>();*/

    switch(type) {
        case sIOtype_DISCONNECT:
            Serial.printf("[IOc] Desconectado!\n");
            break;
        case sIOtype_CONNECT:
            Serial.printf("[IOc] Conectado ao url: %s\n", payload);

            socket.send(sIOtype_CONNECT, "/");
            break;
        case sIOtype_EVENT:
            // evento é chamado aqui
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


// envia uma mensagem para o servidor via socket
void send_socket(String info){

  DynamicJsonDocument doc(1024);
  JsonArray array = doc.to<JsonArray>();

  array.add("newinfo");

  // add payload (parameters) for the event
  JsonObject param1 = array.createNestedObject();
  param1["now"] = info;

  // JSON to String (serializion)
  String output;
  serializeJson(doc, output);

  // Send event
  socket.sendEVENT(output);
}

// Recebe algo do servidor
void event(const char *payload, size_t length){
  Serial.printf("got message: %s\n", payload);
}