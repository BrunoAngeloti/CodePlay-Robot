#include "wifi.h"

String espUniqueID = "1";

WiFiManager wifiManager;

void init_wifi()
{
 wifiManager.autoConnect(("codeplayrobot_" + espUniqueID).c_str());

 Serial.println("Conectado ao WiFi");
 pinMode(D8, OUTPUT);
 digitalWrite(D8, HIGH);
}

void resetWifiManager(){
  wifiManager.resetSettings();
  digitalWrite(D8, LOW);
  ESP.restart();
}
