import React from "react";

import {
  Container,
  Header,
  DateBox,
  DateText,
  PlayButton,
  ButtonText,
  LevelSection,
  LevelTitle,
  ChallengesRow,
  ChallengeButton,
  ChallengeText,
  ImageBackground,
  Title,
  HeaderInfo
} from "./styles";

import { ScrollView } from "react-native";

export const Challenges = () => {
  const levels = [
    {
      label: "Básico",
      color: "#0FA3B1",
    },
    {
      label: "Intermediário",
      color: "#F6AA1C",
    },
    {
      label: "Avançado",
      color: "#753742",
    },
  ];

  const challenges = Array.from({ length: 14 }, (_, i) => i + 1);

  return (
    <Container>
      <Header>
        <ImageBackground source={require("../../assets/headerChallenges.png")}>
          <DateBox>
            <DateText size="title">Junho</DateText>
            <DateText size="subtitle">27</DateText>
          </DateBox>
          <HeaderInfo>
            <Title>Desafio Diário</Title>
            <PlayButton onPress={() => console.log("Play daily challenge")}>
              <ButtonText>Jogar</ButtonText>
            </PlayButton>
          </HeaderInfo>
        </ImageBackground>
      </Header>
      <ScrollView>
        {levels.map((level, index) => (
          <LevelSection key={index}>
            <LevelTitle>{level.label}</LevelTitle>
            <ChallengesRow>
              {challenges.map((challenge, index) => (
                <ChallengeButton
                  key={challenge}
                  color={level.color}
                  done={index === 0}
                  onPress={() => console.log(`Play ${level} ${challenge}`)}
                >
                  <ChallengeText done={index === 0} color={level.color}>
                    {challenge}
                  </ChallengeText>
                </ChallengeButton>
              ))}
            </ChallengesRow>
          </LevelSection>
        ))}
      </ScrollView>
    </Container>
  );
};
