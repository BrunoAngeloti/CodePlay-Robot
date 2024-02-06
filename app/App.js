// App.js
import React, { useState } from "react";
import {
  SafeAreaView,
  Button,
  Modal,
  TouchableOpacity,
  Text,
  View,
} from "react-native";
import DraggableBlocks from "./components/DraggableBlocks";
import { blocksToArray } from "./helpers/helperFunctions";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import socket from "./services/socketio";

const App = () => {
  const [showCatalog, setShowCatalog] = useState(false);
  const [blocks, setBlocks] = useState([]);
  const [blockCounter, setBlockCounter] = useState(0);

  const [statusLed, setStatusLed] = useState(0);

  const handleArrayGenerated = (blocks) => {
    setBlocks(blocks);
  };

  const handleAddBlock = (block) => {
    setBlocks((prevBlocks) => [
      ...prevBlocks,
      { ...block, key: `${block.key}_${blockCounter}` },
    ]);
    setBlockCounter((prevCounter) => prevCounter + 1);
    setShowCatalog(false);
  };

  const testeEmit = () => {
    if (statusLed === 0) {
      socket.emit("data", 1);
      setStatusLed(1);
    } else {
      socket.emit("data", 0);
      setStatusLed(0);
    }
  };

  const teste = (blocks) => {
    console.log(blocks);
    /*blocks.map((block) => {
      if (block.id === 'if_block') {
        console.log('executando if_block');
        if (block.data.condition === 'true') {
          console.log('executando true');
          teste(block.data.childrenTrue);
        } else {
          console.log('executando false');
          teste(block.data.childrenFalse);
        }
      }
      if (block.id === 'move_forward') {
        console.log('executando move_forward');
      }
      if (block.id === 'move_back') {
        console.log('executando move_back');
      }
    })*/
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 20, paddingTop: 40 }}>
      <Button title="Adicionar bloco" onPress={() => setShowCatalog(true)} />
      <Button title="Executa" onPress={() => teste(blocks)} />

      <Button
        title={statusLed === 0 ? "Ligar LED" : "Desligar LED"}
        onPress={() => testeEmit()}
      />

      <GestureHandlerRootView style={{ flex: 1 }}>
        <DraggableBlocks
          blocks={blocks}
          onArrayGenerated={handleArrayGenerated}
        />
      </GestureHandlerRootView>
      <Modal visible={showCatalog} onRequestClose={() => setShowCatalog(false)}>
        <View style={{ padding: 20 }}>
          <TouchableOpacity
            onPress={() =>
              handleAddBlock({
                id: "move_forward",
                key: "move_forward",
                name: "Mover para frente",
                data: { steps: 1 },
              })
            }
            style={{
              backgroundColor: "lightblue",
              padding: 10,
              borderRadius: 5,
              marginBottom: 10,
            }}
          >
            <Text>Mover para frente</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              handleAddBlock({
                id: "move_back",
                key: "move_back",
                name: "Mover para tras",
                data: { steps: 1 },
              })
            }
            style={{
              backgroundColor: "lightblue",
              padding: 10,
              borderRadius: 5,
              marginBottom: 10,
            }}
          >
            <Text>Mover para tras</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              handleAddBlock({
                id: "if_block",
                key: "if_block",
                name: "Se",
                data: {
                  condition: "true",
                  childrenTrue: [],
                  childrenFalse: [],
                },
              })
            }
            style={{
              backgroundColor: "lightblue",
              padding: 10,
              borderRadius: 5,
              marginBottom: 10,
            }}
          >
            <Text>Se</Text>
          </TouchableOpacity>
          {/* Adicione outros blocos ao catálogo aqui.*/}
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default App;
