import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Button,
  StyleSheet,
} from "react-native";
import Block from "./Block";

const BlockCatalog = ({ isVisible, onClose, onAddBlock }) => {
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [userInput, setUserInput] = useState("");

  const blocks = [
    {
      id: "move_forward",
      key: "move_forward",
      name: "Mover para frente",
      title: "Frente por",
      type: "centímetros",
    },
    {
      id: "move_back",
      key: "move_back",
      name: "Mover para trás",
      title: "Trás por",
      type: "centímetros",
    },
    {
      id: "move_right",
      key: "move_right",
      name: "Girar para direita",
      title: "Direita por",
      type: "graus",
    },
    {
      id: "move_left",
      key: "move_left",
      name: "Girar para esquerda",
      title: "Esquerda por",
      type: "graus",
    },
    {
      id: "wait",
      key: "wait",
      name: "Esperar",
      title: "Esperar",
      type: "segundos",
    },
    {
      id: "distance",
      key: "distance",
      name: "Andar até",
      title: "Andar até",
      type: "centímetros",
    },
    {
      id: "repeat",
      key: "repeat",
      name: "Repetir",
      title: "Repetir tudo",
      type: "vezes",
    },
  ];

  return (
    <Modal
      visible={isVisible}
      onRequestClose={onClose}
      animationType="fade"
      transparent={true}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={{ fontSize: 14, fontFamily: "Poppins-Regular" }}>
              {selectedBlock
                ? `Entrada para ${selectedBlock?.name}`
                : "Selecione um bloco"}
            </Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => {
                setUserInput(""); // Limpa o input ao fechar o modal
                setSelectedBlock(null); // Reseta o bloco selecionado ao fechar o modal
                onClose();
              }}
            >
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
          </View>
          {!selectedBlock ? (
            blocks.map((block) => (
              <Block
                key={block.id}
                item={block}
                isCatalog
                setSelectedBlock={setSelectedBlock}
              />
            ))
          ) : (
            <>
              <TextInput
                style={styles.textInput}
                placeholder={`Digite um valor em ${selectedBlock.type}`}
                onChangeText={setUserInput}
                keyboardType="numeric" // Use o teclado numérico para entrada de números
                value={userInput}
              />
              <TouchableOpacity
                style={styles.saveButton}
                onPress={() => {
                  onAddBlock({ ...selectedBlock, data: userInput });
                  setUserInput(""); // Limpa o input após adicionar
                  setSelectedBlock(null); // Reseta o bloco selecionado
                }}
              >
                <Text
                  style={{ color: "#F3F3F3", fontFamily: "Poppins-Regular" }}
                >
                  Adicionar
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Escurece o fundo
    justifyContent: "center", // Centraliza o modalContent verticalmente
    alignItems: "center", // Centraliza o modalContent horizontalmente
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    width: "80%", // Define uma largura para o modalContent
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    position: "relative",
    gap: 10,
  },
  modalHeader: {
    width: "100%",
    flexDirection: "row", // Organiza o texto e o botão de fechar em linha
    justifyContent: "space-between", // Centraliza horizontalmente
    marginBottom: 5,
  },
  closeButton: {},
  closeButtonText: {
    fontSize: 14, // Tamanho do texto "X"
  },
  saveButton: {
    backgroundColor: "#0FA3B1",
    padding: 8,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
  },
  textInput: {
    height: 40,
    marginVertical: 20,
    borderWidth: 1,
    padding: 10,
    width: "100%",
    borderRadius: 5,
  },
});

export default BlockCatalog;
