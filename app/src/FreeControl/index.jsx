import React from "react";

import { Container, Robot } from "./styles";
import DirectionalPad from "../../components/DirectionalPad";
import socket from "../../services/socketio";
import { useUser } from "../../contexts/UserContext";

export const FreeControl = () => {
  const { selectedRobot } = useUser();
  const handleArrowPress = (direction) => {
    // Aqui, `direction` pode ser "up", "right", "down", "left", ou "stop"
    console.log(direction);
    // Emita a direção para o servidor
    socket.emit("controlDirection", { espId: selectedRobot, direction });
  };

  return (
    <Container>
      <DirectionalPad onArrowPress={(direction) => handleArrowPress(direction)} />
      <Robot source={require("../../assets/robot-2-arms.png")} />
    </Container>
  )
};
