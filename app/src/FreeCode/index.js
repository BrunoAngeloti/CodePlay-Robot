import React, { useState } from "react";
import { Feather, FontAwesome } from "@expo/vector-icons";

import { Container, ButtonPlus, ButtonPlay } from "./styles";
import { Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import DraggableBlocks from "../../components/DraggableBlocks";
import BlockCatalog from "../../components/BlockCatalog";

import { useUser } from "../../contexts/UserContext";
import socket from "../../services/socketio";

export const FreeCode = ({ isChallenge, maxBlocks, answer }) => {
  const [showCatalog, setShowCatalog] = useState(false);
  const [blocks, setBlocks] = useState([]);
  const [blockCounter, setBlockCounter] = useState(0);
  const { selectedRobot } = useUser();

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
        console.log(
          `Resposta incorreta no índice ${i}: Esperado ${correctResponse.id} com ${correctResponse.data}, recebido ${userResponse.id} com ${userResponse.data}`
        );
        return false;
      }
    }

    // Se todas as respostas estão corretas
    console.log("Todas as respostas estão corretas.");
    return true;
  }

  const handleClickExecute = () => {
    validateResponses(blocks, answer);

    //sendBlocksToServer();
  };

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
    </Container>
  );
};
