import React from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  ModalContent,
  ModalText,
  Button,
  LoadingContainer,
  ButtonText,
  ActivityIndicatorStyled
} from './styles';
import { Modal } from 'react-native';

export const ResultModal = ({ isVisible, isChallenge, waitingResponse, userAnswerValidate, onClose }) => {
  const navigation = useNavigation();

  return (
    <Modal visible={isVisible}>
      <ModalContent>
        {waitingResponse ? (
          <LoadingContainer>       
            <ModalText>Executando...</ModalText>
            <ActivityIndicatorStyled size="large" color="#0000ff" />
          </LoadingContainer>
        ) : isChallenge && userAnswerValidate !== null ? (
          userAnswerValidate ? (
            <>
              <ModalText>Resposta correta!</ModalText>
              <Button onPress={() => navigation.goBack()}>
                <ButtonText>Voltar</ButtonText>
              </Button>
            </>
          ) : (
            <>
              <ModalText>Resposta incorreta!</ModalText>
              <Button
                onPress={onClose}
              >
                <ButtonText>Continuar tentando</ButtonText>
              </Button>
            </>
          )
        ) : null}
      </ModalContent>
    </Modal>
  );
};
