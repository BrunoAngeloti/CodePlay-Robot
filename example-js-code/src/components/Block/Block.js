import './Block.css';

function Block({color = "#FFF", title = "Default"}) {
  return (
    <div className="ContainerBlock" style={{backgroundColor: color}}>
        <h1>{title}</h1>
    </div>
  );
}

export default Block;
