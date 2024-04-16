import React, { useEffect, useState } from "react";

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
import { useUser } from "../../contexts/UserContext";
import { supabase } from "../../lib/initSupabase";

export const Challenges = () => {
  const [challenges, setChallenges] = useState({ básico: [], intermediário: [], avançado: [] });

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

  const { user, selectedRobot } = useUser();

  const checkIfChallengeIsDone = (challengeId) => {
    return user?.completed_challenges?.find((challenge) => challenge === challengeId);
  }

  useEffect(() => {
    const fetchChallenges = async () => {
      const { data, error } = await supabase
        .from('challenges')
        .select('*')
        .order('id', { ascending: true });

      if (error) {
        console.error('Error fetching challenges:', error);
        return;
      }

      // Organize challenges by levels
      const organizedChallenges = data.reduce((acc, challenge) => {
        const levelKey = challenge.difficulty.toLowerCase(); // assuming the levels are in this format

        if (acc[levelKey]) {
          acc[levelKey].push(challenge);
        } else {
          acc[levelKey] = [challenge];
        }
        return acc;
      }, { básico: [], intermediário: [], avançado: [] });

      setChallenges(organizedChallenges);
    };

    fetchChallenges();
  }, []);

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
              {challenges[level.label.toLowerCase()].map((challenge, index) => (
                <ChallengeButton
                  key={challenge.id}
                  color={level.color}
                  done={checkIfChallengeIsDone(challenge.id)}
                  onPress={() => console.log(`Play ${level.label} challenge name ${challenge.name}`)}
                >
                  <ChallengeText done={checkIfChallengeIsDone(challenge.id)} color={level.color}>
                    {index + 1}
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
