import React, { useEffect, useState } from "react";

import {
  Container,
  Title,
  ButtonContainer,
  ButtonText,
  Section,
  Robot,
} from "./styles";
import { FontAwesome5, Feather, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUser } from "../../contexts/UserContext";

const Home = () => {
  const { user } = useUser();
  const navigation = useNavigation();

  const Button = ({ title, icon }) => {
    return (
      <ButtonContainer onPress={() => navigation.navigate(title)}>
        {icon}
        <ButtonText>{title}</ButtonText>
      </ButtonContainer>
    );
  };

  const commonAttributes = {
    color: "#011627",
    style: { position: "absolute", left: 15 },
  };

  return (
    <Container>
      <Title>Olá, {user?.name}</Title>
      <Section>
        <Button
          title="Desafios"
          icon={<FontAwesome5 name="trophy" size={20} {...commonAttributes} />}
        />
        <Button
          title="Programação Livre"
          icon={<Feather name="code" size={24} {...commonAttributes} />}
        />
        <Button
          title="Controle Livre"
          icon={
            <MaterialIcons
              name="control-camera"
              size={24}
              {...commonAttributes}
            />
          }
        />
        <Button
          title="Configurar Wi-Fi"
          icon={<FontAwesome5 name="wifi" size={20} {...commonAttributes} />}
        />
      </Section>
      <Robot source={require("../../assets/robot-1-arm.png")} />
    </Container>
  );
};

export default Home;
