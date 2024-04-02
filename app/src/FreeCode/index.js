import React, { useState } from "react";

import { Container } from "./styles";
import {
  Alert,
  Button,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import DraggableBlocks from "../../components/DraggableBlocks";
import BlockCatalog from "../../components/BlockCatalog";

export const FreeCode = () => {
  const [showCatalog, setShowCatalog] = useState(false);
  const [blocks, setBlocks] = useState([]);
  const [blockCounter, setBlockCounter] = useState(0);

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

  return (
    <Container>
      <Button title="Adicionar bloco" onPress={() => setShowCatalog(true)} />
      <Button title="Teste" onPress={() => console.log(blocks)} />

      <GestureHandlerRootView style={{ flex: 1 }}>
        <DraggableBlocks
          blocks={blocks}
          onArrayGenerated={handleArrayGenerated}
          deleteBlock={deleteBlock}
        />
      </GestureHandlerRootView>
      <BlockCatalog
        isVisible={showCatalog}
        onClose={() => setShowCatalog(false)}
        onAddBlock={addBlockToList}
      />
    </Container>
  );
};
