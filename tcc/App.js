// App.js
import React, { useState } from 'react';
import { SafeAreaView, Button, Modal, TouchableOpacity, Text, View } from 'react-native';
import DraggableBlocks from './components/DraggableBlocks';
import { blocksToArray } from './helpers/helperFunctions';

const App = () => {
  const [showCatalog, setShowCatalog] = useState(false);
  const [blocks, setBlocks] = useState([]);
  const [blockCounter, setBlockCounter] = useState(0);

  const handleArrayGenerated = (blocks) => {
    const array = blocksToArray(blocks);
    console.log('Array de informações:', array);
    // Envie o array de informações para o ESP e interprete a programação sequencial.
  };

  const handleAddBlock = (block) => {
    setBlocks((prevBlocks) => [...prevBlocks, { ...block, key: `${block.key}_${blockCounter}` }]);
    setBlockCounter((prevCounter) => prevCounter + 1);
    setShowCatalog(false);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Button title="Adicionar bloco" onPress={() => setShowCatalog(true)} />
      <DraggableBlocks blocks={blocks} onArrayGenerated={handleArrayGenerated} />
      <Modal visible={showCatalog} onRequestClose={() => setShowCatalog(false)}>
        <View style={{ padding: 20 }}>
          <TouchableOpacity
            onPress={() => handleAddBlock({ id: 'move_forward', key: 'move_forward', name: 'Mover para frente', data: { steps: 1 } })}
            style={{ backgroundColor: 'lightblue', padding: 10, borderRadius: 5, marginBottom: 10 }}
          >
            <Text>Mover para frente</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleAddBlock({ id: 'move_back', key: 'move_back', name: 'Mover para tras', data: { steps: 1 } })}
            style={{ backgroundColor: 'lightblue', padding: 10, borderRadius: 5, marginBottom: 10 }}
          >
            <Text>Mover para tras</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleAddBlock({ id: 'if_block', key: 'if_block', name: 'Se', data: { condition: 'sensor', childrenTrue: [], childrenFalse: [] } })}
            style={{ backgroundColor: 'lightblue', padding: 10, borderRadius: 5, marginBottom: 10 }}
          >
            <Text>Se</Text>
          </TouchableOpacity>
          {/* Adicione outros blocos ao catálogo aqui. */}
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default App;
