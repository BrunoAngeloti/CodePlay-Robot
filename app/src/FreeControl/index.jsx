import React from "react";

import { Container, Robot } from "./styles";
import DirectionalPad from "../../components/DirectionalPad";

export const FreeControl = () => {
  return (
    <Container>
      <DirectionalPad onArrowPress={(direction) => console.log(direction)} />
      <Robot source={require("../../assets/robot-2-arms.png")} />
    </Container>
  )
};
