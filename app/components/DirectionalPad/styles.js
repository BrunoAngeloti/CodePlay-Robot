import styled from "styled-components/native";

export const Circle = styled.View`
  height: 300px;
  width: 300px;
  border-radius: 200px;
  background-color: transparent;
  border: 3px solid #011627;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export const CenterCircle = styled.View`
  height: 100px;
  width: 100px;
  border-radius: 100px;
  background-color: transparent;
  border: 3px solid #011627;
  position: absolute;
`;

export const ArrowButton = styled.TouchableOpacity`
  position: absolute;
`;
