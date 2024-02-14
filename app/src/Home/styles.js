import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #f3f3f3;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

export const Title = styled.Text`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 20px;
  margin-top: 20px;
  color: #011627;
  font-family: "Poppins-SemiBold";
`;

export const ButtonContainer = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  border: 3px solid #011627;
  border-radius: 3px;
  position: relative;
  width: 100%;
  padding: 15px;
  align-items: center;
  justify-content: center;
`;

export const Section = styled.View`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
  width: 100%;
  align-items: center;
`;

export const ButtonText = styled.Text`
  color: #011627;
  font-family: "Poppins-SemiBold";
`;
