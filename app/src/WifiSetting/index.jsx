import React, { useEffect, useState } from "react";
import socket from "../../services/socketio";
import { ScrollView } from "react-native";

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

export const WifiSetting = () => {
  const [espList, setEspList] = useState({});

  useEffect(() => {
    console.log("Solicitando lista de ESPs...", socket.connected);
    socket.emit('requestEspList');
  }, []);

  socket.on('espListResponse', (espList) => {
    console.log(espList);
    setEspList(espList);
  });

  const handleEspSelect = (espId) => {
    console.log(`Robô ${espId} selecionado`);
  };

  return (
    <Container>
      <ScrollView>
        <Paragraph>
          1. Após ligar o seu robô, você deve procurar uma rede Wi-Fi chamada{" "}
          <ParagraphBold>codeplayrobot, seguido do número do robô.</ParagraphBold> Conecte seu aparelho nela.
        </Paragraph>
        <Paragraph>
          2. Após isso, clicar no botão abaixo para ser redirecionado para o
          Gerenciamento de Wi-Fi.
        </Paragraph>
        <Paragraph>
          3. Quando abrir esse Gerenciador, clicar no botão{" "}
          <ParagraphBold>Configure WiFi</ParagraphBold> e conecte na sua rede
          Wi-Fi.
        </Paragraph>
        <Paragraph>
          4. Caso tenha mais de um robô na mesma rede, selecione o robô do mesmo número que você se conectou na lista abaixo.
        </Paragraph>

        <EspList>
          {espList && Object.keys(espList).map((espId) => (
            <Paragraph>
              {espId}
            </Paragraph>
          ))}
        </EspList>


        <Paragraph>
          4. Pronto! Agora se a Luz em cima do robô estiver acesa, está tudo certo
          com seu robô. Pode começar a brincar ;)
        </Paragraph>
        <Paragraph>
          4. Pronto! Agora se a Luz em cima do robô estiver acesa, está tudo certo
          com seu robô. Pode começar a brincar ;)
        </Paragraph>

      
      </ScrollView>

      <Button onPress={() => {
        // Abrir no navegador o endereço 192.168.4.1
        window.open('http://192.168.4.1');
      }}>
        <ButtonText>Configurar Wi-Fi</ButtonText>
      </Button>
    </Container>
  );
};
