import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Header = styled.View`
  width: 100%;

  justify-content: left;
  align-items: center;
  position: relative;
  display: flex;
  flex-direction: row;
  padding-left: 20px;
  padding-right: 20px;
  background-color: #f3f3f3;
`;

export const Title = styled.Text`
  font-size: 16px;
  font-family: "Poppins-Bold";
  margin-right: 40px;
`;

export const BodyContainer = styled.View`
  flex: 1;
  width: 100%;
`;

export const ModalContainer = styled.View`
  background-color: white;
  padding: 20px;
  border-radius: 20px;
  height: 100%;
`;

export const ModalTitle = styled.Text`
  font-size: 20px;
  color: #333;
  margin-bottom: 15px;
  font-family: "Poppins-Bold";
`;

export const ModalText = styled.Text`
  font-size: 12px;
  color: #666;
  margin-bottom: 10px;
  font-family: "Poppins-Regular";
`;

export const ModalTextBold = styled.Text`
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
  font-family: "Poppins-Bold";
`;

export const CloseButton = styled.TouchableOpacity`
  background-color: #0fa3b1;
  padding: 10px 20px;
  border-radius: 10px;
  align-self: center;
  margin-top: 20px;
  width: 100%;
  justify-content: center;
  align-items: center;
  display: flex;
`;

export const CloseButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: bold;
`;
