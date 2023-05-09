// helperFunctions.js
const blocksToArray = (blocks) => {
    const array = [];
  
    const parseBlocks = (blocksList) => {
      blocksList.forEach((block) => {
        switch (block.key) {
          case 'move_forward':
            array.push({ action: 'move_forward', steps: block.data.steps });
            break;
          case 'if_block':
            array.push({ action: 'if', condition: block.data.condition });
            parseBlocks(block.data.children);
            array.push({ action: 'end_if' });
            break;
          // Adicione outros casos para blocos personalizados.
          default:
            break;
        }
      });
    };
  
    parseBlocks(blocks);
    return array;
  };
  
  export { blocksToArray };