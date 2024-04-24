#include "motors.h"

#define TRIG_PIN 6  // Exemplo de pinos GPIO, ajuste para sua configuração
#define ECHO_PIN 7

void init_motors(){
 pinMode(motorA1, OUTPUT);
 pinMode(motorA2, OUTPUT);
 pinMode(motorB1, OUTPUT);
 pinMode(motorB2, OUTPUT);
}

void moveForward() {
  Serial.println("Andando para frente");
  digitalWrite(motorA1, HIGH);
  digitalWrite(motorA2, LOW);
  digitalWrite(motorB1, LOW);
  digitalWrite(motorB2, HIGH);
}

void moveBackward() {
  Serial.println("Andando para tras");
  digitalWrite(motorA1, LOW);
  digitalWrite(motorA2, HIGH);
  digitalWrite(motorB1, HIGH);
  digitalWrite(motorB2, LOW);
}

void moveRight() {
  Serial.println("Andando para a direita");
  digitalWrite(motorA1, LOW);
  digitalWrite(motorA2, HIGH);
  digitalWrite(motorB1, LOW);
  digitalWrite(motorB2, HIGH);
}

void moveLeft() {
  Serial.println("Andando para a esquerda");
  digitalWrite(motorA1, HIGH);
  digitalWrite(motorA2, LOW);
  digitalWrite(motorB1, HIGH);
  digitalWrite(motorB2, LOW);
}

void stopMotors() {
  Serial.println("Parei");
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

void moveForwardCentimeters(int cent) {
  // Supondo que o robô percorra 2 cm em 1 segundo, se ele percorre mais, diminua este valor.
  float secondsPerCentimeter = 0.5; // Esta é uma estimativa, ajuste-a conforme a calibração.
  int timeToMove = cent * secondsPerCentimeter * 1000; // Tempo em milissegundos
  moveForward();
  delay(timeToMove);
  stopMotors();
}

void moveBackwardCentimeters(int cent) {
  float secondsPerCentimeter = 0.5; // Ajuste este valor também
  int timeToMove = cent * secondsPerCentimeter * 1000; // Tempo em milissegundos
  moveBackward();
  delay(timeToMove);
  stopMotors();
}

void moveRightDegrees(int deg) {
  float secondsPer90Degrees = 2.0; // Tempo para 90 graus, ajuste conforme necessário
  float timeToTurn = (deg / 90.0) * secondsPer90Degrees * 1000; // Tempo em milissegundos
  moveRight();
  delay(static_cast<int>(timeToTurn)); // Converte o tempo de flutuante para inteiro
  stopMotors();
}

void moveLeftDegrees(int deg) {
  float secondsPer90Degrees = 2.0; // Ajuste este valor também
  float timeToTurn = (deg / 90.0) * secondsPer90Degrees * 1000; // Tempo em milissegundos
  moveLeft();
  delay(static_cast<int>(timeToTurn)); // Converte o tempo de flutuante para inteiro
  stopMotors();
}

void waitForSeconds(int second){
  int timeToWait = second * 1000;
  stopMotors();
  delay(timeToWait);
}

void setupUltrasonic() {
  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);
}

float getDistance() {
  digitalWrite(TRIG_PIN, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);
  
  float duration = pulseIn(ECHO_PIN, HIGH);
  float distance = duration * 0.034 / 2; // Velocidade do som em cm/us dividido por 2 (ida e volta)
  Serial.println(distance);
  return distance;
}

void moveForwardUntilObstacle(float maxDistance) {
  while (true) {
    float distance = getDistance();
    Serial.println(distance);
    if (distance <= maxDistance || distance == 0) {
      stopMotors();
      break;
    }
    moveForward();
  }
}
