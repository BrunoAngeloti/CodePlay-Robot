# CodePlay Robot: Uma abordagem prática para o ensino de lógica de programação

## Descrição

O **CodePlay Robot** é um projeto de TCC que visa ensinar lógica de programação de maneira prática e divertida utilizando um robô controlado por um aplicativo React Native e um servidor Node.js. O sistema é composto por três partes principais:

1.  **App**: Aplicativo móvel desenvolvido em React Native.
2.  **Robot**: Código para o microcontrolador ESP8266.
3.  **Server**: Servidor backend desenvolvido em Node.js.

## Configuração do Ambiente

### App (React Native)

#### Pré-requisitos

-   Node.js
-   npm ou yarn
-   React Native CLI

#### Passos para Instalação

1.  Navegue até a pasta `app`:
    
    `> cd app` 
    
2.  Instale as dependências:
    
    `npm install ou yarn install`
    
3.  Execute o aplicativo:
    
    `yarn start ou npm start` 
    

### Robot (ESP8266)

#### Pré-requisitos

-   Arduino IDE
    
-   Biblioteca ESP8266 para Arduino
    
-   As seguintes bibliotecas:
    
    `#include <WebSocketsClient.h>`
    `#include <SocketIOclient.h>`
    `#include <ArduinoJson.h>`
    `#include <ESP8266WiFi.h>`
    `#include <ESP8266WebServer.h>`
    `#include <DNSServer.h>`
    `#include <WiFiManager.h>` 
    

#### Passos para Instalação

1.  Abra o código na pasta `robot` usando Arduino IDE.
    
2.  Instale as bibliotecas necessárias via Arduino Library Manager:
    
    Para Arduino IDE, use o Library Manager para instalar as seguintes bibliotecas:
    - WebSockets
    - Socket.IO Client
    - ArduinoJson
    - ESP8266WiFi
    - ESP8266WebServer
    - DNSServer
    - WiFiManager
    
3.  Carregue o código para o ESP8266:
    

### Server (Node.js)

#### Pré-requisitos

-   Node.js
-   npm ou yarn

#### Passos para Instalação

1.  Navegue até a pasta `server`:
    
    `cd server` 
    
2.  Instale as dependências:
    
    `npm install ou yarn install`
    
3.  Inicie o servidor:
    
    `npm start ou yarn start` 
    

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request.
