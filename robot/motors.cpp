#include "motors.h"

void init_motors(){
 pinMode(motorA1, OUTPUT);
 pinMode(motorA2, OUTPUT);
 pinMode(motorB1, OUTPUT);
 pinMode(motorB2, OUTPUT);
}

void moveForward() {
  digitalWrite(motorA1, HIGH);
  digitalWrite(motorA2, LOW);
  digitalWrite(motorB1, LOW);
  digitalWrite(motorB2, HIGH);
}

void moveBackward() {
  digitalWrite(motorA1, LOW);
  digitalWrite(motorA2, HIGH);
  digitalWrite(motorB1, HIGH);
  digitalWrite(motorB2, LOW);
}

void moveRight() {
  digitalWrite(motorA1, HIGH);
  digitalWrite(motorA2, LOW);
  digitalWrite(motorB1, HIGH);
  digitalWrite(motorB2, LOW);
}

void moveLeft() {
  digitalWrite(motorA1, LOW);
  digitalWrite(motorA2, HIGH);
  digitalWrite(motorB1, LOW);
  digitalWrite(motorB2, HIGH);
}

void stopMotors() {
  digitalWrite(motorA1, LOW);
  digitalWrite(motorA2, LOW);
  digitalWrite(motorB1, LOW);
  digitalWrite(motorB2, LOW);
}

void moveRobot(const char* direction){
  if (strcmp(direction, "up") == 0) {
      moveForward();
  } else if (strcmp(direction, "down") == 0) {
      moveBackward();
  } else if (strcmp(direction, "right") == 0) {
      moveRight();
  } else if (strcmp(direction, "left") == 0) {
      moveLeft();
  } else if (strcmp(direction, "stop") == 0) {
      stopMotors();
  } else {
      Serial.println("Comando de direção desconhecido.");
  }
}
