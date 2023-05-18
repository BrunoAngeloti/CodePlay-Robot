// DraggableBlocks.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import DraggableGrid from 'react-native-draggable-grid';

const DraggableBlocks = ({ onArrayGenerated }) => {
  const [items, setItems] = useState([
    { key: 'move_forward', name: 'Mover para frente', data: { steps: 1 } },
    { key: 'if_block', name: 'Se', data: { condition: 'sensor', childrenTrue: [], childrenFalse: [] } },
    // Adicione outros blocos personalizados aqui.
  ]);

  const handleAddChild = (parentIndex, condition) => {
    const newItems = [...items];
    if(condition === 'true') {
      newItems[parentIndex].data.childrenTrue.push({
        key: 'move_forward',
        name: 'Mover para frente',
        data: { steps: 1 },
      });
    } else {
      newItems[parentIndex].data.childrenFalse.push({
        key: 'move_forward',
        name: 'Mover para frente',
        data: { steps: 1 },
      })
    }
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
          <TouchableOpacity onPress={() => handleAddChild(order, "true")} style={{ marginTop: 10 }}>
            <Text style={{ color: 'blue' }}>Adicionar condicoes true</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleAddChild(order, "false")} style={{ marginTop: 10 }}>
            <Text style={{ color: 'red' }}>Adicionar condicoes false</Text>
          </TouchableOpacity>
          {item.data.childrenTrue.map((child, index) => (
            <View key={index} style={{ backgroundColor: 'lightgray', marginTop: 5, borderRadius: 5 }}>
              <Text style={{ padding: 5 }}>{child.name}</Text>
            </View>
          ))}
          {item.data.childrenFalse.map((child, index) => (
            <View key={index} style={{ backgroundColor: 'lightred', marginTop: 5, borderRadius: 5 }}>
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

export default DraggableBlocks