import React, { useEffect, useState } from "react";
import { Feather, FontAwesome } from "@expo/vector-icons";

import { Container, ButtonPlus, ButtonPlay } from "./styles";
import { ActivityIndicator, Button, Modal, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import DraggableBlocks from "../../components/DraggableBlocks";
import BlockCatalog from "../../components/BlockCatalog";

import { useUser } from "../../contexts/UserContext";
import socket from "../../services/socketio";
import { useNavigation } from "@react-navigation/native";
import { supabase } from "../../lib/initSupabase";
import { ResultModal } from "../../components/ResultModal";

export const FreeCode = ({
  isChallenge,
  maxBlocks,
  answer,
  score,
  challengeID,
}) => {
  const [showCatalog, setShowCatalog] = useState(false);
  const [blocks, setBlocks] = useState([]);
  const [blockCounter, setBlockCounter] = useState(0);
  const { selectedRobot, user } = useUser();
  const [waitingResponse, setWaitingResponse] = useState(false);
  const [userAnswerValidate, setUserAnswerValidate] = useState(null);

  const navigation = useNavigation(); // Use navigation hook

  useEffect(() => {
    socket.on("commandsCompleted", (data) => {
      console.log("Comandos executados com sucesso:", data);
      setWaitingResponse(false);
    });

    return () => socket.disconnect(); // Limpar na desmontagem
  }, []);

  const handleArrayGenerated = (blocks) => {
    setBlocks(blocks);
  };

  const addBlockToList = (block) => {
    setBlocks((prevBlocks) => [
      ...prevBlocks,
      { ...block, key: `${block.key}_${blockCounter}` },
    ]);
    setBlockCounter((prevCounter) => prevCounter + 1);
    setShowCatalog(false);
  };

  const deleteBlock = (blockKey) => {
    setBlocks((prevBlocks) =>
      prevBlocks.filter((block) => block.key !== blockKey)
    );
  };

  const sendBlocksToServer = () => {
    const dataToSend = {
      espId: selectedRobot, // ID do ESP selecionado
      commands: blocks, // Comandos a serem executados pelo ESP
    };

    socket.emit("executeCommands", dataToSend);
  };

  function validateResponses(userResponses, correctResponses) {
    // Verificar se ambos os arrays têm o mesmo tamanho
    if (userResponses.length !== correctResponses.length) {
      console.log("Número de respostas está incorreto.");
      return false;
    }

    // Comparar cada resposta
    for (let i = 0; i < userResponses.length; i++) {
      const userResponse = userResponses[i];
      const correctResponse = correctResponses[i];

      // Verificar se o id e data são iguais
      if (
        userResponse.id !== correctResponse.id ||
        userResponse.data !== correctResponse.data
      ) {
        console.log(`Resposta incorreta`);
        return false;
      }
    }

    // Se todas as respostas estão corretas
    console.log("Todas as respostas estão corretas.");
    return true;
  }

  const handleClickExecute = () => {
    if (isChallenge) {
      const answerValidate = validateResponses(blocks, answer);
      setUserAnswerValidate(answerValidate);
      if (answerValidate) {
        updateUserScoreAndChallenges(score, challengeID);
      }
    }

    sendBlocksToServer();

    setWaitingResponse(true);
  };

  async function updateUserScoreAndChallenges(pointsToAdd, challengeId) {
    try {
      // Obter o usuário atual
      let { data, error } = await supabase
        .from("users")
        .select("score, completed_challenges")
        .eq("id", user.id)
        .single();

      if (error) throw error;

      // Preparar os novos valores
      const newScore = data.score + pointsToAdd;
      const newChallenges = [...(data.completed_challenges || []), challengeId];

      // Atualizar o usuário
      const { error: updateError } = await supabase
        .from("users")
        .update({ score: newScore, completed_challenges: newChallenges })
        .eq("id", user.id);

      if (updateError) throw updateError;

      console.log("Usuário atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error.message);
    }
  }

  return (
    <Container>
      <ButtonPlay onPress={handleClickExecute} disabled={blocks.length === 0}>
        <FontAwesome name="play" size={16} color="#F3F3F3" />
        <Text
          style={{
            color: "#F3F3F3",
            marginLeft: 10,
            fontFamily: "Poppins-Regular",
            marginTop: 2,
          }}
        >
          Executar
        </Text>
      </ButtonPlay>

      <GestureHandlerRootView style={{ flex: 1 }}>
        <DraggableBlocks
          blocks={blocks}
          onArrayGenerated={handleArrayGenerated}
          deleteBlock={deleteBlock}
        />
      </GestureHandlerRootView>

      <ButtonPlus
        onPress={() => setShowCatalog(true)}
        disabled={maxBlocks ? blocks.length >= maxBlocks : false}
      >
        <Feather name="plus" size={24} color="#F3F3F3" />
      </ButtonPlus>

      <BlockCatalog
        isVisible={showCatalog}
        onClose={() => setShowCatalog(false)}
        onAddBlock={addBlockToList}
      />

      <ResultModal
        isVisible={
          waitingResponse || (isChallenge && userAnswerValidate !== null)
        }
        waitingResponse={waitingResponse}
        isChallenge={isChallenge}
        userAnswerValidate={userAnswerValidate}
        onClose={() => setUserAnswerValidate(null)}
      />
    </Container>
  );
};
