import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import DraggableFlatList from "react-native-draggable-flatlist";
import Block from "./Block";

const DraggableBlocks = ({ blocks, onArrayGenerated, deleteBlock }) => {
  const [items, setItems] = useState(blocks);

  useEffect(() => {
    onArrayGenerated(blocks);
    setItems(blocks);
  }, [blocks]);

  const renderItem = ({ item, drag }) => {
    return (
      <Block item={item} drag={drag} onDelete={() => deleteBlock(item.key)} />
    );
  };

  return (
    <View style={styles.wrapper}>
      <DraggableFlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item, index) => `draggable-item-${index}`}
        onDragEnd={({ data }) => {
          setItems(data);
          onArrayGenerated(data);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
  },
});

export default DraggableBlocks;
