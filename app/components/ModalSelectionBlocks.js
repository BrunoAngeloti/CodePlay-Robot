import React from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';

const ModalSelectionBlocks = ({ showCatalog, setShowCatalog, handleAddBlock, parentIndex, condition }) => {
    const blockToward = { id: 'move_forward', key: 'move_forward', name: 'Mover para frente', data: { steps: 1 } }
    const blockBack = { id: 'move_back', key: 'move_back', name: 'Mover para tras', data: { steps: 1 } }
    const blockIf = { id: 'if_block', key: 'if_block', name: 'Se', data: { condition: 'true', childrenTrue: [], childrenFalse: [] } }

    const handleBlockSelection = (block) => {
        handleAddBlock(block, parentIndex, condition);
        setShowCatalog(false);
    };

  return (
    <Modal visible={showCatalog} onRequestClose={() => setShowCatalog(false)}>
        <View style={{ padding: 20 }}>
          <TouchableOpacity
            onPress={() => handleBlockSelection(blockToward)}
            style={{ backgroundColor: 'lightblue', padding: 10, borderRadius: 5, marginBottom: 10 }}
          >
            <Text>Mover para frente</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleBlockSelection(blockBack)}
            style={{ backgroundColor: 'lightblue', padding: 10, borderRadius: 5, marginBottom: 10 }}
          >
            <Text>Mover para tras</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleBlockSelection(blockIf)}
            style={{ backgroundColor: 'lightblue', padding: 10, borderRadius: 5, marginBottom: 10 }}
          >
            <Text>Se</Text>
          </TouchableOpacity>
        </View>
      </Modal>
  );
};

export default ModalSelectionBlocks;
