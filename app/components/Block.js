import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";

const Block = ({ item, drag, onDelete, isCatalog, setSelectedBlock }) => {
  // Aqui você pode definir diferentes estilos para diferentes tipos de comandos
  const stylesMap = {
    move_forward: styles.moveForwardBlock,
    move_back: styles.moveBackBlock,
    move_right: styles.moveRightBlock,
    move_left: styles.moveLeftBlock,
    wait: styles.waitBlock,
    distance: styles.distanceBlock,
    repeat: styles.repeatBlock,
  };

  const iconMap = {
    move_forward: "arrow-up",
    move_back: "arrow-down",
    move_right: "corner-up-right",
    move_left: "corner-up-left",
    wait: "clock",
    distance: "radio",
    repeat: "refresh-cw",
  };

  const getBlockStyle = (type) => {
    return stylesMap[type] || styles.defaultBlock;
  };

  const getIcon = (type) => {
    return iconMap[type] || "arrowright";
  };

  return (
    <TouchableOpacity
      style={[styles.block, getBlockStyle(item.id)]}
      onLongPress={!isCatalog && drag}
      onPress={() => {
        if (isCatalog) {
          setSelectedBlock(item);
        }
      }}
    >
      <Feather name={getIcon(item.id)} size={24} color="#F3F3F3" />

      {!isCatalog ? (
        <Text style={styles.defaultText}>
          {`${item.title} ${item.data} ${item.type}`}
        </Text>
      ) : (
        <Text style={styles.defaultText}>{item.name}</Text>
      )}

      {onDelete && (
        <TouchableOpacity onPress={onDelete} style={{ marginLeft: "auto" }}>
          <Feather name="trash" size={20} color="#F3F3F3" />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  block: {
    flexDirection: "row", // Organiza o ícone, texto e botão em linha
    alignItems: "center", // Centraliza verticalmente
    backgroundColor: "lightblue",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5, // Borda mais arredondada para se assemelhar à imagem
    position: "relative",
    elevation: 2, // Sombra leve para o bloco
    width: "100%", // Largura do bloco
  },
  defaultBlock: {
    backgroundColor: "#0FA3B1",
  },
  moveForwardBlock: {
    backgroundColor: "#0FA3B1",
    borderColor: "#0B636B",
    borderWidth: 1,
  },
  moveBackBlock: {
    backgroundColor: "#0FA3B1",
    borderColor: "#0B636B",
    borderWidth: 1,
  },
  moveRightBlock: {
    backgroundColor: "#0FA3B1",
    borderColor: "#0B636B",
    borderWidth: 1,
  },
  moveLeftBlock: {
    backgroundColor: "#0FA3B1",
    borderColor: "#0B636B",
    borderWidth: 1,
  },
  waitBlock: {
    backgroundColor: "#753742",
    borderColor: "#381A1F",
    borderWidth: 1,
  },
  distanceBlock: {
    backgroundColor: "#FE5F55",
    borderColor: "#9E3333",
    borderWidth: 1,
  },
  repeatBlock: {
    backgroundColor: "#6DA34D",
    borderColor: "#3F6A26",
    borderWidth: 1,
  },
  defaultText: {
    color: "#F3F3F3",
    marginLeft: 10,
    fontFamily: "Poppins-Regular",
  },
});

export default Block;
