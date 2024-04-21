import React, { useEffect, useState } from "react";

import {
  Container,
  Title,
  ButtonContainer,
  ButtonText,
  Section,
  Robot,
} from "./styles";
import { FontAwesome5, Feather, MaterialIcons, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "../../contexts/UserContext";
import { supabase } from "../../lib/initSupabase";

const Home = () => {
  const { user, fetchUserDetails, selectedRobot } = useUser();
  const navigation = useNavigation();

  const Button = ({ title, icon, onPress, disabled }) => {
    return (
      <ButtonContainer 
        onPress={() => {
          if (onPress) {
            onPress()
            return
          }
          navigation.navigate(title)
        }}
        disabled={disabled}
        isDisabledButton={disabled}
      >
        {disabled ? <AntDesign name="lock" size={24} {...commonAttributes} /> : icon}
        <ButtonText>{title}</ButtonText>
      </ButtonContainer>
    );
  };

  const commonAttributes = {
    color: "#011627",
    style: { position: "absolute", left: 15 },
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <Container>
      <Title>Olá, {user?.name}</Title>
      <Section>
        <Button
          title="Desafios"
          icon={<FontAwesome5 name="trophy" size={20} {...commonAttributes} />}
          disabled={!selectedRobot}
        />
        <Button
          title="Programação Livre"
          icon={<Feather name="code" size={24} {...commonAttributes} />}
          disabled={!selectedRobot}
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
          disabled={!selectedRobot}
        />
        <Button
          title="Conectar Robô"
          icon={<FontAwesome5 name="wifi" size={20} {...commonAttributes} />}
        />
        <Button
          title="Sair"
          onPress={async () => {
            await supabase.auth.signOut();
            navigation.navigate("AuthPage");
          }}
          icon={<MaterialIcons name="logout" size={20} {...commonAttributes} />}
        />
      </Section>
      <Robot source={require("../../assets/robot-1-arm.png")} />
    </Container>
  );
};

export default Home;
