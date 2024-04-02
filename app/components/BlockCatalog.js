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
    // Adicione mais blocos conforme necessário
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
          {!selectedBlock ? (
            blocks.map((block) => (
              <TouchableOpacity
                key={block.id}
                onPress={() => setSelectedBlock(block)}
                style={styles.blockButton}
              >
                <Text>{block.name}</Text>
              </TouchableOpacity>
            ))
          ) : (
            <>
              <Text>Entrada para {selectedBlock?.name}</Text>
              <TextInput
                style={styles.textInput}
                placeholder={`Digite um valor em ${selectedBlock.type}`}
                onChangeText={setUserInput}
                keyboardType="numeric" // Use o teclado numérico para entrada de números
                value={userInput}
              />
              <Button
                title="Adicionar"
                onPress={() => {
                  onAddBlock({ ...selectedBlock, data: userInput });
                  setUserInput(""); // Limpa o input após adicionar
                  setSelectedBlock(null); // Reseta o bloco selecionado
                }}
              />
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
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    width: "80%", // Define uma largura para o modalContent
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    position: "relative",
  },
  closeButton: {
    alignSelf: "flex-end", // Posiciona o botão no canto superior direito do modalContent
    marginBottom: 10, // Espaço entre o botão de fechar e o conteúdo do modal
    position: "absolute",
    right: 20, // Posiciona o botão 10px da borda direita
    top: 10, // Posiciona o botão 10px da borda superior
  },
  closeButtonText: {
    fontSize: 20, // Tamanho do texto "X"
  },
  blockButton: {
    backgroundColor: "lightblue",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  textInput: {
    height: 40,
    marginVertical: 20,
    borderWidth: 1,
    padding: 10,
    width: "100%",
  },
});

export default BlockCatalog;
