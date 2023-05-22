import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';

const DraggableBlocks = ({ blocks, onArrayGenerated }) => {
  const [items, setItems] = useState(blocks);

  useEffect(() => {
    onArrayGenerated(blocks);
    setItems(blocks);
  }, [blocks]);

  useEffect(() => {
    console.log("------------------")
    blocks.map((block) => {
      console.log(block.id);
    })
    console.log("------------------")
  }, [blocks]);

  const handleAddChild = (parentIndex, condition) => {
    const newItems = [...items];
    console.log(parentIndex)
    if(condition === 'true') {
      newItems[parentIndex].data.childrenTrue.push({
        key: 'move_forward',
        id: 'move_forward',
        name: 'Mover para frente',
        data: { steps: 1 },
      });
    } else {
      newItems[parentIndex].data.childrenFalse.push({
        key: 'move_forward',
        id: 'move_forward',
        name: 'Mover para frente',
        data: { steps: 1 },
      })
    }
    setItems(newItems);
    onArrayGenerated(newItems);
  };

  const renderItem = ({ item, getIndex, drag }) => (
    <TouchableOpacity 
      style={{
        backgroundColor: 'lightblue',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        borderRadius: 5,
        marginTop: 10,
      }}
      onLongPress={drag}
    >
      <Text>{item.name}</Text>
      {item.id === 'if_block' && (
        <>
          <Text>Condição: {item.data.condition}</Text>
          <TouchableOpacity onPress={() => handleAddChild(getIndex(), "true")} style={{ marginTop: 10 }}>
            <Text style={{ color: 'blue' }}>Adicionar condicoes true</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleAddChild(getIndex(), "false")} style={{ marginTop: 10 }}>
            <Text style={{ color: 'red' }}>Adicionar condicoes false</Text>
          </TouchableOpacity>
          {item.data.childrenTrue.map((child, childIndex) => (
            <View key={childIndex} style={{ backgroundColor: 'lightgray', marginTop: 5, borderRadius: 5 }}>
              <Text style={{ padding: 5 }}>{child.name}</Text>
            </View>
          ))}
          {item.data.childrenFalse.map((child, childIndex) => (
            <View key={childIndex} style={{ backgroundColor: 'lightred', marginTop: 5, borderRadius: 5 }}>
              <Text style={{ padding: 5 }}>{child.name}</Text>
            </View>
          ))}
        </>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.wrapper}>
      <DraggableFlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item, index) => `draggable-item-${index}`}
        onDragEnd={({ data }) => {setItems(data); onArrayGenerated(data);}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    wrapper:{
        width: '100%',
        justifyContent:'center',
        alignItems: 'center',
        display: 'flex',
    }
});

export default DraggableBlocks;
