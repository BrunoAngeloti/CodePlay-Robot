#include "wifi.h"

String espUniqueID = "1";

void init_wifi()
{
 WiFiManager wifiManager;
 //wifiManager.resetSettings();
 wifiManager.autoConnect(("codeplayrobot_" + espUniqueID).c_str());

 Serial.println("Conectado ao WiFi");
}
