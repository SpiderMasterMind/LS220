// Upper case check:
// write a function that takes a string argument, and returns true if all alphabetic characters inside the string are uppercase, otherwise
// return false.  ignore non alphabet chars

function isUppercase(string) {
	return !string.match(/[a-z]/);
}

// write a function that takes an array of strings, and returns the same array of strings without the vowels
function removeVowels(arrayOfStrings) {
  return arrayOfStrings.forEach(function(stringElement) {
    stringElement.replace(/[aeiou]/gi, '');
  });
  console.log(arrayOfStrings);
}


removeVowels(['abcdefghijklmnopqrstuvwxyz']);             // ['bcdfghjklmnpqrstvwyxz']
removeVowels(['green', 'YELLOW', 'black', 'white']);      // ['grn', 'YLLW', 'blck', 'wht']
removeVowels(['ABC', 'AEIOU', 'XYZ']);

// Write a function takes a string type, and returns an object(hash) showing the number of uppercase, lower and neithers
// non alphabet chars and whitespace will be neithers, can use regex or === toUpperCase()
function lettercaseCounter(string) {
  var result = { lowercase: 0,
                uppercase: 0,
                neither: 0,
               }
  string.split('').forEach(function(char) {
    if (char.match(/[^a-zA-Z]/)) {
      return result.neither += 1;
    }

    if (char === char.toUpperCase()) {
      return result.uppercase += 1;
    }

    return result.lowercase += 1;
  });
  return result;
}

lettercaseCounter('abCdef 123'); // { lowercase: 5, uppercase: 1, neither: 4 }
lettercaseCounter('AbCd +Ef');   // { lowercase: 3, uppercase: 3, neither: 2 }
lettercaseCounter('123');        // { lowercase: 0, uppercase: 0, neither: 3 }
lettercaseCounter('');

// write a function, that takes a single string argument and returns a new
// string that contains the original argument with the first char of
// each word capitalised
// words are any sequence of non blank chars
// do not capitalise "quoted" words

function capitalise(string) {
  return string.split(' ').map(function(word) {
    return word.slice(0, 1).toUpperCase() + word.slice(1).toLowerCase();
  }).join(' ');
}


// write a function that takes a string argument and returns a string with upper and lower cases swapped. Leave other chars unchanged.

function swapCase(string) {
	return string.split("").map(function(char) {
		if (char.match(/[a-z]/)) {
			return char.toUpperCase();
		} else if (char.match(/[A-Z]/)) {
			return char.toLowercase();
		} else {
			return char;
		}
	}).join("");
}

// This function auto staggers al chars in a string

function staggeredCase(string) {
  var flag = true;
  var newChar;
  return string.split('').map(function(char, index) {
    if (char.match(/[^a-zA-z]/)) {
      return char;
    }

    if (flag) {
      //flag = !flag;
      newChar = char.toUpperCase(); // need to set this to a variable, otherwise char is not changed
    } else if(!flag) {
      //flag = !flag;
      newChar = char.toLowerCase();
    }

    flag = !flag;
    return newChar;

  }).join('');
}


staggeredCase('I Love Launch School!')     // 'I lOvE lAuNcH sChOoL!'
staggeredCase('ALL CAPS')                  // 'AlL cApS'
staggeredCase('ignore 77 the 444 numbers')

// This one ignores non alphabet chars
function staggeredCase(string) {
  return string.split('').map(function(char, index) {
    if (index % 2 === 0) {
      return char.toUpperCase();
    } else {
      return char.toLowerCase();
    }
  }).join('');
}

wordLengths('cow sheep chicken');
// function should return a string of the word, a space and the number of letters in the word, each string should be in an array
function wordLengths(string) {
  if (!string || string.length === 0) {
    return [];
  }

  return string.split(' ').map(function (word) {
    return word + ' ' + word.length;
  });
}


function searchWord(word, textString) {
  // return the text with the searched word highlighted
  var regex = new RegExp(word, 'gi');
  return textString.replace(regex, '**' + word.toUpperCase() + '**');
}

var text = 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?'

searchWord('unde', text);
