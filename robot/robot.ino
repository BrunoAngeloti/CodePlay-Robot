#include "wifi.h"
#include "fingers.h"
#include "socketio.h"
#include "motors.h"

void setup()
{
  Serial.begin(115200);
  delay(250);
  init_wifi();
  init_motors();
  init_socket();
}

void loop()
{
  connection_socket();
  checkButton(); 
  getDistance();
  
  if(WiFi.status() != WL_CONNECTED) {
    Serial.println("Desconectado do WiFi, tentando reconectar...");
    //ESP.restart(); // Reinicia o ESP para reativar o WiFiManager se desconectado
  }
}
