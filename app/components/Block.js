import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Feather, AntDesign } from "@expo/vector-icons";

const Block = ({ item, drag, onDelete }) => {
  // Aqui você pode definir diferentes estilos para diferentes tipos de comandos
  const stylesMap = {
    move_forward: styles.moveForwardBlock,
    move_back: styles.moveBackBlock,
    // Adicione mais tipos e seus estilos correspondentes aqui
  };

  const iconMap = {
    move_forward: "arrowup",
    move_back: "arrowdown",
    // Adicione mais tipos e seus ícones correspondentes aqui
  };

  const textStyleMap = {
    move_forward: styles.moveForwardText,
    move_back: styles.moveBackText,
    // Adicione mais tipos e seus estilos de texto correspondentes aqui
  };

  const getBlockStyle = (type) => {
    return stylesMap[type] || styles.defaultBlock;
  };

  const getTextStyle = (type) => {
    return textStyleMap[type] || styles.defaultText;
  };

  const getIcon = (type) => {
    return iconMap[type] || "arrowright";
  };

  return (
    <TouchableOpacity
      style={[styles.block, getBlockStyle(item.id)]}
      onLongPress={drag}
    >
      <AntDesign name={getIcon(item.id)} size={24} color="#011627" />
      <Text style={styles.defaultText}>
        {`${item.title} ${item.data} ${item.type}`}
      </Text>
      <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
        <Feather name="trash" size={20} color="#011627" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  block: {
    flexDirection: "row", // Organiza o ícone, texto e botão em linha
    alignItems: "center", // Centraliza verticalmente
    justifyContent: "space-between", // Espaça igualmente
    backgroundColor: "lightblue",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10, // Borda mais arredondada para se assemelhar à imagem
    marginTop: 10,
    elevation: 2, // Sombra leve para o bloco
    width: "100%", // Largura do bloco
  },
  defaultBlock: {
    // Estilos padrão para blocos que não têm um estilo específico
  },
  moveForwardBlock: {
    backgroundColor: "#0FA3B1",
  },
  moveBackBlock: {
    backgroundColor: "#0FA3B1",
  },
  defaultText: {
    color: "#F3F3F3",
  },
  moveForwardText: {
    // Texto específico para o bloco 'move_forward'
  },
  moveBackText: {
    // Texto específico para o bloco 'move_back'
  },
  deleteButton: {
    // Estilo para o botão de deletar
  },
});

export default Block;
