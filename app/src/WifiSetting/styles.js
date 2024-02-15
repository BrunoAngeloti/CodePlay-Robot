import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: #f3f3f3;
  display: flex;
  flex-direction: column;
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
  margin-top: auto;
  align-items: center;
`;

export const ButtonText = styled.Text`
  color: #f3f3f3;
  font-family: "Poppins-SemiBold";
  font-size: 14px;
`;
