let socket = io.connect('http://localhost:4000');
let ledStatus = 0;
socket.on('connect', function() {
  console.log('Conexão estabelecida com o servidor WebSocket');
});

const btn = document.getElementById('botao');

function callEmit(){
  if(ledStatus == 1){
    ledStatus = 0;
    btn.innerHTML = 'Ligar';
  }else{
    ledStatus = 1;
    btn.innerHTML = 'Desligar';
  }

  socket.emit('data', ledStatus);
}

