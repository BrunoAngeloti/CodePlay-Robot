import { useState } from 'react';
import './App.css';
import Block from './components/Block/Block';

//colocar cores pasteis
const commandsDefault = [
  {
    id: 1,
    title: "Mover",
    color: "#fabfb7",
    direction: "frente",
    quantity: 1
  },
  {
    id: 2,
    title: "Parar",
    color: "#c5c6c8",
    time: 0
  },
  {
    id: 3,
    title: "Girar",
    color: "#b2e2f2"
  }
];

function App() {
  const [commands, setCommands] = useState([]);

  const addCommand = (command) => {
    setCommands([...commands, command]);
  }

  return (
    <div className="Container">
      <div className="Options">
        {commandsDefault.map((command) => 
          <div key={command.id} onClick={() => addCommand(command)}>
            <Block title={command.title} color={command.color} />
          </div>
        )}
      </div>
      <div className="ContainerCommands">
        {commands.map((command) =>
          <Block key={command.id} title={command.title} color={command.color} />
        )}
      </div>
    </div>
  );
}

export default App;
