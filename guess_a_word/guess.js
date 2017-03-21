
// game object states: chosen word, incorrect guesses, letters guessed, allowed wrong guesses
// methods: get random word, create blanks, initialize states
$(document).ready(function() {
  var $message = $('#message');
  var $spaces = $('#spaces');
  var $guesses = $('#guesses');
  var $apples = $('#apples');
  var $replay = $('#replay');

  var randomWord = (function() {
    var words = ['testing'];
    return function randomWord() {
      var idx = (Math.floor(Math.random() * words.length -1))
      return words.splice(idx, 1)[0];
    }
  })();

  var Game = {
    setLetterSpaces: function() {
      for (var i = 0; i < this.word.length; i += 1) {
        $spaces.append('<span></span> ');
        $guesses.append('<span></span> ');
      }
    },
    bindEvents: function() {
      $(window).keypress(this.checkLetter.bind(this));
    },
    checkLetter: function(event) {
      var keyPressed = String.fromCharCode(event.which); 
      if (this.validKeypress(event.which)) {
        this.processKeypress(keyPressed);
      }
      // if (won?) correctLetters === word? Check this {
      //   processWin;
      // }
      // if (lost?) (incorrectGuesses === maxGuesses) {
      //   processLost (display loss etc)
      // }
    },
    validKeypress: function(charCode) {
      if (charCode >= 97 && charCode <= 122) {
        return true;
      }
    },
    processKeypress: function(charPressed) {
      console.log('valid key: ');
      console.log(charPressed);
      if (this.duplicateGuess(charPressed)) {
        return;
      }
      if (this.incorrectGuess(charPressed)) {
        this.incorrectLetters.push(charPressed);
        this.removeApple();
        this.incorrectGuesses += 1;
        return;
      }
      if (this.correctGuess(charPressed)) {
        this.updateCorrectLetters(charPressed);
        //this.updateSpanDisplay(charPressed);
      }
    },
    duplicateGuess: function(charPressed) {
      if (this.incorrectLetters.indexOf(charPressed) !== -1 || this.correctLetters.indexOf(charPressed) !== -1) {
        return true;
      }
    },
    incorrectGuess: function(charPressed) {
      if (this.word.indexOf(charPressed) === -1) {
        return true;
      }
    },
    correctGuess: function(charPressed) {
      if (this.word.indexOf(charPressed) !== -1) {
        return true;
      }
    },
    updateCorrectLetters: function(charPressed) {
      this.displayCorrectLetter();
      this.word.split('').forEach(function(character, idx) {
        console.log(character, idx);
        // this.displayCorrectLetter();
      });
    },
    displayCorrectLetter: function(charPressed, idx) {
      console.log('!')
    },
    removeApple: function() {
      if (this.incorrectGuesses === 0) {
        $apples.addClass('guess_1');
      } else {
        $apples.removeClass();
        $apples.addClass('guess_' + String(this.incorrectGuesses + 1));
      }
    },
    init: function() {
      this.word = randomWord();
      this.incorrectLetters = [];
      this.incorrectGuesses = 0;
      this.correctLetters = [];
      this.maxGuesses = 6;
      this.setLetterSpaces();
      this.bindEvents();
      return this;
    },
  };

  var newGame = Object.create(Game).init();
  // The context of a constructor invocation is the newly created object. newGame is this

});
