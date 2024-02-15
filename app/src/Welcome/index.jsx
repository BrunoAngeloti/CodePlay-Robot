import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  Container,
  Input,
  Title,
  ButtonConfirm,
  Label,
  ButtonText,
  Robot,
} from "./styles";

export const Welcome = ({ navigation }) => {
  const [name, setName] = useState("");

  const saveName = async (name) => {
    try {
      await AsyncStorage.setItem("userName", name);
    } catch (error) {
      // Error saving data
    }
  };

  const handleNameSubmit = async (name) => {
    // Supondo que saveName é uma função para salvar o nome no AsyncStorage
    await saveName(name); // Salve o nome usando sua função existente
    // Navegar para a tela 'Home' após salvar
    navigation.navigate("Home");
  };

  return (
    <Container>
      <Title>Seja bem-vinda(o) ao CodePlay Robot</Title>
      <Label>Como gostaria de ser chamado?</Label>
      <Input
        placeholder="Digite seu nome"
        value={name}
        onChangeText={setName}
      />
      <ButtonConfirm onPress={() => handleNameSubmit(name)}>
        <ButtonText>Avançar</ButtonText>
      </ButtonConfirm>
      <Robot source={require("../../assets/robot-2-arms.png")} />
    </Container>
  );
};
