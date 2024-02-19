import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: #f3f3f3;
  padding: 20px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  border-radius: 3px;
  position: relative;
  overflow: hidden;
`;

export const ImageBackground = styled.ImageBackground`
  flex: 1;
  justify-content: center;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 15px 25px;
`;

export const DateBox = styled.View`
  border: 1px solid #f3f3f3;
  padding: 5px 20px;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const DateText = styled.Text`
  color: white;

  font-family: "Poppins-Bold";
  font-size: ${(props) => (props.size === "title" ? "16px" : "36px")};
  line-height: 40px;
`;

export const Title = styled.Text`
  color: white;

  font-family: "Poppins-Regular";
  font-size: 20px;
`;

export const PlayButton = styled.TouchableOpacity`
  background-color: #f3f3f3;
  padding: 6px 30px;
  border-radius: 30px;
  max-width: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
`;

export const ButtonText = styled.Text`
  color: #011627;
  font-family: "Poppins-Bold";
`;

export const LevelSection = styled.View`
  margin-bottom: 10px;
`;

export const LevelTitle = styled.Text`
  font-size: 16px;
  margin-bottom: 10px;
  font-family: "Poppins-SemiBold";
`;

export const ChallengesRow = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const ChallengeButton = styled.TouchableOpacity`
  width: 13%;
  background-color: ${(props) => (props.done ? props.color : "#FFF")};
  border: 1px solid ${(props) => props.color || "#FFF"};
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
  align-items: center;
`;

export const ChallengeText = styled.Text`
  color: ${(props) => (props.done ? "#f3f3f3" : props.color)};
  font-family: "Poppins-SemiBold";
`;

export const HeaderInfo = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`;
