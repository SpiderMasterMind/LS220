// var blocks = ['BO', 'XK', 'DQ', 'CP', 'NA' 'GT', 'RE' 'FS' 'JW' 'HU' 'VI', 'LY', 'ZM'];

// iterate through the string (toUpperCase), for each letter:
//    - do a .any on the 'matched blocks' (initially empty): block.indexOf(letter) > -1 :if any true - return false
//    - do a .any on the blocks: block.indexOf(letter) - if false return false
//    - do a .filter on the blocks - return a match into a new array - matched blocks
//    - go to next letter
//    - return true if all letters
isBlockWord('BATCH') // true
isBlockWord('BUTCH') // false
isBlockWord('jest')  // true
isBlockWord('floW')  // true
isBlockWord('APPLE') // false
isBlockWord('apple') // false
isBlockWord('apPLE') // false
isBlockWord('Box')   // false

function isBlockWord(string) {
  var blocks = ['BO', 'XK', 'DQ', 'CP', 'NA', 'GT', 'RE', 'FS', 'JW', 'HU', 'VI', 'LY', 'ZM'];
  var input = string.toUpperCase().split('');
  var matchedBlocks = [];
  var matchingBlock = [];
  var requireUsed;
  var blockAvailable;
  for (var i = 0; i < input.length; i++) {
    requireUsed = matchedBlocks.some(function(block) {
      if (block === undefined) {
        return false;
      }
      return block.indexOf(input[i]) > -1;
    });

    if (requireUsed) {
      return false;
    }

    blockAvailable = blocks.some(function(block) {
      return block.indexOf(input[i]);
    });

    if (!blockAvailable) {
      return false;
    }

    matchingBlock = blocks.filter(function(block) {
      return block.indexOf(input[i]) > -1;
    })[0];
    matchedBlocks.push(matchingBlock);


  }
  return true;
}
