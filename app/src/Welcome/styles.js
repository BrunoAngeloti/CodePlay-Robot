import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #f3f3f3;
  display: flex;
  flex-direction: column;
  padding: 20px 20px 0px 20px;
  position: relative;
`;

export const Input = styled.TextInput`
  border: 3px solid #011627;
  border-radius: 3px;
  padding: 10px 20px;
  width: 100%;
  margin-bottom: 20px;
  font-family: "Poppins-SemiBold";
`;

export const Title = styled.Text`
  font-size: 22px;
  color: #011627;
  font-family: "Poppins-SemiBold";
  text-align: center;
  margin-top: 80px;
`;

export const Label = styled.Text`
  font-size: 14px;
  color: #011627;
  font-family: "Poppins-SemiBold";
  margin-top: 20px;
  margin-bottom: 4px;
`;

export const ButtonConfirm = styled.TouchableOpacity`
  background-color: #0fa3b1;
  padding: 10px 30px;
  border-radius: 3px;
  margin-top: 0px;
  margin-left: auto;
`;

export const ButtonText = styled.Text`
  color: #f3f3f3;
  font-family: "Poppins-SemiBold";
  text-align: center;
`;

export const Robot = styled.Image`
  width: 220px;
  height: 250px;
  position: relative;
  margin-top: auto;
  transform: rotate(20deg) translateX(-50px) translateY(90px);
`;
