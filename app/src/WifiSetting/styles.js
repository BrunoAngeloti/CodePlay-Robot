import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: #f3f3f3;
  padding: 20px;
  position: relative;
`;

export const Paragraph = styled.Text`
  font-size: 16px;
  color: #011627;
  margin-bottom: 20px;
  font-family: "Poppins-Regular";
  text-align: justify;
`;

export const ParagraphBold = styled.Text`
  font-size: 16px;
  color: #011627;
  font-family: "Poppins-Bold";
`;

export const Button = styled.TouchableOpacity`
  background-color: #0fa3b1;
  padding: 10px 0;
  border-radius: 3px;
  align-items: center;
  position: fixed;
  bottom: 0;
`;

export const ButtonText = styled.Text`
  color: #f3f3f3;
  font-family: "Poppins-SemiBold";
  font-size: 14px;
`;

export const EspList = styled.View`
  margin: 10px 0;
`;

export const EspItem = styled.TouchableOpacity`
  background-color: ${(props) => (props.isSelected ? "#bdecb6" : "#f0f0f0")};
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 10px;
  align-items: center;
`;

export const EspItemText = styled.Text`
  color: #333;
  font-size: 16px;
`;
