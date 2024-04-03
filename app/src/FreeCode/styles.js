import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #f3f3f3;
  display: flex;
  flex-direction: column;
  padding: 20px 20px 0px 20px;
  position: relative;
`;

export const ButtonPlus = styled.TouchableOpacity`
  margin-top: 20px;
  background-color: #0fa3b1;
  width: 100%;
  padding: 5px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

export const ButtonPlay = styled.TouchableOpacity`
  background-color: #f6aa1c;
  width: 100%;
  padding: 5px;
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;
