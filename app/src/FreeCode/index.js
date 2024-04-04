import React, { useState } from "react";
import { Feather, FontAwesome } from "@expo/vector-icons";

import { Container, ButtonPlus, ButtonPlay } from "./styles";
import { Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import DraggableBlocks from "../../components/DraggableBlocks";
import BlockCatalog from "../../components/BlockCatalog";

import { useUser } from "../../contexts/UserContext";
import socket from "../../services/socketio";

export const FreeCode = () => {
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

  return (
    <Container>
      <ButtonPlay onPress={sendBlocksToServer}>
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

      <ButtonPlus onPress={() => setShowCatalog(true)}>
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
