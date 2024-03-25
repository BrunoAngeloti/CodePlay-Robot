#include "fingers.h"

void init_LED(){
  pinMode(D8, OUTPUT);
}

void init_Button(){
  pinMode(D0, INPUT_PULLUP);
}



void changeLEDStatus(String d1){
  if(d1 == "1"){
    Serial.printf("LIGOU"); 
    digitalWrite(D8, HIGH);
  }else{
    Serial.printf("DESLIGOU"); 
    digitalWrite(D8, LOW);
  }
}

void checkButton() {
  static bool lastButtonState = HIGH; // O estado anterior do botão, HIGH significa não pressionado
  bool currentButtonState = digitalRead(D0); // Lê o estado atual do botão
  
  // Verifica se o botão foi pressionado (estado muda de HIGH para LOW)
  if (lastButtonState == HIGH && currentButtonState == LOW) {
    Serial.println("Botão pressionado, resetando as configurações do WiFi...");
    resetWifiManager();
  }
  
  lastButtonState = currentButtonState; // Atualiza o estado anterior do botão para a próxima verificação
}
