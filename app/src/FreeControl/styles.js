import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: #f3f3f3;
  display: flex;
  flex-direction: column;
  padding: 180px 20px 0px 20px;
  position: relative;
  align-items: center;
`;

export const Robot = styled.Image`
  width: 220px;
  height: 250px;
  position: absolute;
  bottom: -80px;
  left: -40px;
  transform: rotate(20deg);
`;
