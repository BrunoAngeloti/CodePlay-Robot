import React from 'react';
import { SafeAreaView } from 'react-native';
import DraggableBlocks from './components/DraggableBlocks';
import { blocksToArray } from './helpers/helperFunctions';

export default function App() {
    const handleArrayGenerated = (blocks) => {
        const array = blocksToArray(blocks);
        console.log('Array de informações: ', array);
        // Envie o array de informações para o ESP e interprete a programação sequencial.
      };
    
      return (
        <SafeAreaView style={{ flex: 1 }}>
          <DraggableBlocks onArrayGenerated={handleArrayGenerated} />
        </SafeAreaView>
      );
}