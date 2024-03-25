#ifndef __FINGERS_H__
#define __FINGERS_H__

#include <Arduino.h>
#include "wifi.h"


void init_LED();
void init_Button();
void checkButton();
void changeLEDStatus(String d1);

#endif
