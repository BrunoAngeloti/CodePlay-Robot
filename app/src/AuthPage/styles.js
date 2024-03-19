import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #f5f5f5;
`;

export const StyledInput = styled.TextInput`
  border: 3px solid #011627;
  border-radius: 3px;
  padding: 10px 20px;
  width: 100%;
  margin-bottom: 20px;
  font-family: "Poppins-SemiBold";
`;

export const StyledButton = styled.TouchableOpacity`
  background-color: #0fa3b1;
  padding: 10px 30px;
  border-radius: 3px;
  margin-top: 0px;
  width: 100%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
`;

export const ToggleText = styled.Text`
  margin-top: 20px;
  color: #007bff;
  font-size: 14px;
`;
