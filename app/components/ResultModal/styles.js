import styled from "styled-components/native";

export const ModalContent = styled.View`
  background-color: white;
  padding: 20px;
  border-radius: 20px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalText = styled.Text`
  font-size: 18px;
  color: #333;
  margin-bottom: 15px;
  font-family: "Poppins-Regular";
`;

export const Button = styled.TouchableOpacity`
  background-color: #0fa3b1;
  padding: 10px 20px;
  border-radius: 10px;
  align-self: center;
  margin-top: 40px;
  width: 100%;
  justify-content: center;
  align-items: center;
  display: flex;
`;

export const ButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: bold;
`;

export const LoadingContainer = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const ActivityIndicatorStyled = styled.ActivityIndicator``;
