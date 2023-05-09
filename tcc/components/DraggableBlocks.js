// DraggableBlocks.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import DraggableGrid from 'react-native-draggable-grid';

const DraggableBlocks = ({ onArrayGenerated }) => {
  const [items, setItems] = useState([
    { key: 'move_forward', name: 'Mover para frente', data: { steps: 1 } },
    { key: 'if_block', name: 'Se', data: { condition: 'sensor', children: [] } },
    // Adicione outros blocos personalizados aqui.
  ]);

  const handleAddChild = (parentIndex) => {
    const newItems = [...items];
    newItems[parentIndex].data.children.push({
      key: 'move_forward',
      name: 'Mover para frente',
      data: { steps: 1 },
    });
    setItems(newItems);
    onArrayGenerated(newItems);
  };

  const renderItem = (item, order) => (
    <View
      key={item.key}
      style={{
        backgroundColor: 'lightblue',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 5,
        margin: 5,
      }}
    >
      <Text>{item.name}</Text>
      {item.key === 'if_block' && (
        <>
          <Text>Condição: {item.data.condition}</Text>
          <TouchableOpacity onPress={() => handleAddChild(order)} style={{ marginTop: 10 }}>
            <Text style={{ color: 'blue' }}>Adicionar bloco</Text>
          </TouchableOpacity>
          {item.data.children.map((child, index) => (
            <View key={index} style={{ backgroundColor: 'lightgray', marginTop: 5, borderRadius: 5 }}>
              <Text style={{ padding: 5 }}>{child.name}</Text>
            </View>
          ))}
        </>
      )}
    </View>
  );

  const onDragRelease = (newItems) => {
    setItems(newItems);
    onArrayGenerated(newItems);
  };

  return (
    <DraggableGrid
      numColumns={1}
      renderItem={renderItem}
      data={items}
      onDragRelease={onDragRelease}
      
    />
  );
};

export default DraggableBlocks;