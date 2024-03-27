#ifndef __MOTORS_H__
#define __MOTORS_H__

#include <Arduino.h>

const int motorA1 = D1; // Motor A input 1
const int motorA2 = D2; // Motor A input 2
const int motorB1 = D3; // Motor B input 1
const int motorB2 = D4; // Motor B input 2

void init_motors();
void moveForward();
void moveBackward();
void moveRight();
void moveLeft();
void stopMotors();
void moveRobot(const char* direction);

#endif
