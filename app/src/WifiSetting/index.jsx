import React from "react";

import {
  Container,
  Paragraph,
  ParagraphBold,
  Button,
  ButtonText,
} from "./styles";

export const WifiSetting = () => {
  return (
    <Container>
      <Paragraph>
        1. Após ligar o seu robô, você deve procurar uma rede Wi-Fi chamada{" "}
        <ParagraphBold>codeplayrobot, </ParagraphBold>conecte seu aparelho nela.
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
        4. Pronto! Agora se a Luz em cima do robô estiver acesa, está tudo certo
        com seu robô. Pode começar a brincar ;)
      </Paragraph>
      <Paragraph>
        5. Caso não tenha funcionado, repita todos os passos novamente.
      </Paragraph>

      <Button onPress={() => {}}>
        <ButtonText>Configurar Wi-Fi</ButtonText>
      </Button>
    </Container>
  );
};
