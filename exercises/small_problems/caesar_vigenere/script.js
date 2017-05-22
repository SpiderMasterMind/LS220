// Caesar Cipher
// Encryption of plain text, shifting a letter A(3) becomes D. Y(10) becomes I as the letters cycle back to A after Z
// Split the input string, ignore non alphabetical chars
// If the shift is > or a multiple of, then substract this to get a number < 26
// With an index for each letter: A:0, B:1, C:2 if shift plus index > 25, get 25 - index, then add this to the start:

var letters = [
	'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 
	'n','o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
];

function caesar(input, shift) {
	return input.split("").map(function(char) {
		if (!char.match(/[a-z]/i)) {
			return char;
		} else {
			if (char === char.toUpperCase()) {
				return letters[getCaesarIndex(char.toLowerCase(), shift)].toUpperCase();
			} else {
				return letters[getCaesarIndex(char, shift)];
			}
		}
	}).join("");
}

function getCaesarIndex(char, shift) {
	var idx = letters.indexOf(char);
	if (idx + shift > 25) {
		return (shift - (26 - idx));
	} else {
		return idx + shift;
	}
}

// Vigenere Cipher uses a letter, in place of a shift value

function vigenere(inputString, shiftString) {
	var input = inputString.split("");
	var shift = shiftString;

	if (shift.length < input.length) {
		shift = shift.repeat(Math.ceil(input.length / shift.length)).split("");
	} else {
		shift = shift.split("");
	}

	return input.map(function(char, idx) {
		if (!char.match(/[a-z]/i)) {
			return char;
		} else {
			if (char === char.toUpperCase()) {
				
			} else {
				var thisIndex = letters.indexOf(shift[idx]);
				return letters[getCaesarIndex(char, thisIndex)];
			}
		}
	}).join("");
}

