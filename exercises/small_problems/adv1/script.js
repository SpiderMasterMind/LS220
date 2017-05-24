// Madlibs revisited: 


var template1 = 'The ${adjective} brown ${noun} ${adverb} ' +
                '${verb} the ${adjective} yellow ' +
                '${noun}, who ${adverb} ${verb} his ' +
                '${noun} and looks around.';

var template2 = 'The ${noun} ${verb} the ${noun}\'s ${noun}.'

function madlibs(template) {
  var REPLACEMENT_TEXTS = {
    adjective: ['quick', 'lazy', 'sleepy', 'noisy', 'hungry'],
    noun: ['fox', 'dog', 'head', 'leg', 'tail'],
    verb: ['jumps', 'lifts', 'bites', 'licks', 'pats'],
    adverb: ['easily', 'lazily', 'noisily', 'excitedly'],
  }

  function replaceText(match) {
    var key = match.replace(/[^a-z]/g, '');
    var index = Math.floor(Math.random() * REPLACEMENT_TEXTS[key].length);
    return REPLACEMENT_TEXTS[key][index];
  }

  return template.replace(/\${[a-z]+}/g, replaceText);
}

// with an array of arrays representing a 3x3 matrix, , write a function to transpose it:

var matrix = [
  [1, 5, 8],
  [4, 7, 2],
  [3, 9, 6]
];

function transpose(input) {
	var result = [];
	for (var i = 0; i < input.length; i += 1) {
		for (var j = 0; j < input[i]; j += 1) {
			result[j] = result[j] || 0;
			result[j].push(input[i][j]);
		}
	}
	return result;
}


// returns [[1, 4, 3], [5, 7, 9], [8, 2, 6]]
// also works for a matrix with any dimensions

// To rotate the matrix 90 degrees:

function rotate(input) {
	return transpose(input).map(function(row) {
		return row.reverse();
	});
}


//Merge sorted lists: this function should take two arrays

function merge(array1, array2) {
  var copy1 = array1.slice();
  var copy2 = array2.slice();
  var result = [];

  while (copy1.length > 0 && copy2.length > 0) {
    result.push(copy1[0] <= copy2[0] ? copy1.shift() : copy2.shift());
  }

  return result.concat(copy1.length === 0 ? copy2 : copy1);
}

// Binary search, uses the binary searching method to find the index of a searched item.  Otherwise returns -1.

function binarySearch(arr, searchTerm) {
	var end = arr.length - 1;
	var start = 0;
	var mid;

	while (start <= end) {
    mid = start + Math.floor((end - start) / 2);
    if (array[mid] === searchItem) {
      return mid;
    } else if (array[mid] < searchItem) {
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }


}

binarySearch([1, 5, 7, 11, 23, 45, 65, 89, 102], 77);                                // -1
binarySearch([1, 5, 7, 11, 23, 45, 65, 89, 102], 89);                                // 7
binarySearch(['Alice', 'Bonnie', 'Kim', 'Pete', 'Rachel', 'Sue', 'Tyler'], 'Peter'); // -1
binarySearch(['Alice', 'Bonnie', 'Kim', 'Pete', 'Rachel', 'Sue', 'Tyler'], 'Tyler'); // 6
