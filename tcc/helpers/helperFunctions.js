// helperFunctions.js
const blocksToArray = (blocks) => {
    const array = [];
  
    const parseBlocks = (blocksList) => {
      blocksList.forEach((block) => {
        switch (block.id) {
          case 'move_forward':
            array.push({ action: 'move_forward', steps: block.data.steps });
            break;
          case 'if_block':
            array.push({ action: 'if', condition: block.data.condition, blocksTrue: blocksToArray(block.data.childrenTrue), blocksFalse: blocksToArray(block.data.childrenFalse) });
            console.log(array);
            break;
          case 'move_back':
            array.push({ action: 'move_back', steps: block.data.steps });
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