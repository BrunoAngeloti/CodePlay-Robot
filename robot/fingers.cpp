#include "fingers.h"

void init_LED(){
  pinMode(D8, OUTPUT);
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
