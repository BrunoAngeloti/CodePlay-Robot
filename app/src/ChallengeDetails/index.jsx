// src/ChallengeDetails.js
import React, { useState } from "react";
import { Modal, Text } from "react-native";

import { Feather } from '@expo/vector-icons';

import { 
  BodyContainer, 
  CloseButton, 
  ModalTextBold,
  CloseButtonText, 
  Container, 
  Header, 
  ModalContainer, 
  ModalText, 
  ModalTitle, 
  Title 
} from "./styles";
import { FreeCode } from "../FreeCode";

const ChallengeDetails = ({ route }) => {
  const { challenge } = route.params;
  const [modalVisible, setModalVisible] = useState(true);

  return (
    <Container>
      <Header>
        <Title>{challenge.name}</Title>
        <Feather 
          onPress={() => setModalVisible(true)} 
          name="info" 
          size={24} 
          color="black" 
          style={{ marginLeft: "auto" }}
        />
      </Header>
      <BodyContainer>
        <FreeCode isChallenge maxBlocks={challenge.max_blocks_number} answer={challenge.answer} />
      </BodyContainer>
      <Modal
        visible={modalVisible}
        onRequestClose={setModalVisible}
        animationType="fade"
        transparent={true}
      >
        <ModalContainer>
          <ModalTitle>{challenge.name}</ModalTitle>
          <ModalText>{challenge.description}</ModalText>
          <ModalTextBold>Máximo de Blocos: {challenge.max_blocks_number}</ModalTextBold>
          <ModalTextBold>Pontuação: {challenge.points} pontos</ModalTextBold>

          <ModalTextBold>Você pode abrir essas informações quando quiser!</ModalTextBold>

          <CloseButton onPress={() => setModalVisible(false)}>
            <CloseButtonText>Fechar</CloseButtonText>
          </CloseButton>
        </ModalContainer>
      </Modal>
    </Container>
  );
};

export default ChallengeDetails;
