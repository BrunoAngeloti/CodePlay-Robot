// src/ChallengeDetails.js
import React from "react";

import { Container, Title } from "./styles";

const ChallengeDetails = ({ route }) => {
  const { challenge } = route.params;

  console.log(challenge);

  return (
    <Container>
      <Title>{challenge.name}</Title>
      
    </Container>
  );
};

export default ChallengeDetails;
