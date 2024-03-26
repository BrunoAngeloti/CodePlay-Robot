import React, { useEffect, useState } from "react";
import socket from "../../services/socketio";
import { ScrollView, Linking } from "react-native";

import {
  Container,
  Paragraph,
  ParagraphBold,
  Button,
  ButtonText,
  EspList,
  EspItem,
  EspItemText,
} from "./styles";
import { useUser } from "../../contexts/UserContext";

export const WifiSetting = () => {
  const [espList, setEspList] = useState({});
  const { selectedRobot, setSelectedRobot } = useUser();

  useEffect(() => {
    socket.emit('requestEspList');
  }, []);

  socket.on('espListResponse', (espList) => {
    setEspList(espList);
  });

  const handleEspSelect = (espId) => {
    console.log(`Robô ${espId} selecionado`);
    setSelectedRobot(espId);
  };

  return (
    <Container>
      <ScrollView>
        <Paragraph>
          1. Após ligar o seu robô, você deve procurar uma rede Wi-Fi chamada{" "}
          <ParagraphBold>codeplayrobot, seguido do número do robô.</ParagraphBold> Conecte seu aparelho nela. Se o seu robô ja estiver conectado a uma rede (LED acesso), pule para a etapa 4. 
        </Paragraph>
        <Paragraph>
          OBS: Se quiser conectar o robô a uma rede diferente, basta apertar o botão de reset nele e seguir os passos novamente.
        </Paragraph>
        <Paragraph>
          2. Após isso, clicar no botão abaixo para ser redirecionado para o
          Gerenciamento de Wi-Fi.
        </Paragraph>
        <Paragraph>
          3. Quando abrir esse Gerenciador, clicar no botão{" "}
          <ParagraphBold>Configure WiFi</ParagraphBold> e conecte na sua rede
          Wi-Fi, quando o robô estiver conectado a rede, a luz em cima do robô irá acender. Volte para o aplicativo.
        </Paragraph>
        <Paragraph>
          4. Selecione o robô na lista abaixo:
        </Paragraph>

        <EspList>
          {espList && Object.keys(espList).map((espId) => (
            <EspItem 
              key={espId} 
              onPress={() => handleEspSelect(espList[espId])}
              disabled={selectedRobot === espList[espId]}
              isSelected={selectedRobot === espList[espId]}
            >
              <EspItemText>Robô {espId}</EspItemText>
            </EspItem>
          ))}
        </EspList>


        <Paragraph>
          5. Pronto! Seu robô está conectado. Agora você pode controlá-lo 
        </Paragraph>
      </ScrollView>

      <Button onPress={() => {
        Linking.openURL('http://192.168.4.1');
      }}>
        <ButtonText>Configurar Wi-Fi</ButtonText>
      </Button>
    </Container>
  );
};
