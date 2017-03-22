$(document).ready(function() {
  var $message = $('#message');
  var $spaces = $('#spaces');
  var $guesses = $('#guesses');
  var $apples = $('#apples');
  var $replay = $('#replay');

  var randomWord = (function() {
    var words = ['hamburgers', 'pumps', 'chilcat', 'mcglocky', 'invited', 'rhythm'];
    return function randomWord() {
      var idx = (Math.floor(Math.random() * words.length -1))
      return words.splice(idx, 1)[0];
    }
  })();

  var Game = {
    bindCharacterPresses: function() {
      $(window).keypress(this.checkLetter.bind(this));
    },
    checkLetter: function(event) {
      var keyPressed = String.fromCharCode(event.which); 
      if (this.validKeypress(event.which)) {
        this.processKeypress(keyPressed);
        this.winOrLose();
      }
    },
    validKeypress: function(charCode) {
      if (charCode >= 97 && charCode <= 122) {
        return true;
      }
    },
    winOrLose: function() {
      if (this.correctLetters.length === this.word.length) {
        $('body').addClass('win');
        this.playAgain();
      }
      if (this.incorrectGuesses === this.maxGuesses) {
        $('body').addClass('lose');
        this.completeWord();
        this.playAgain();
      }
    },
    playAgain: function() {
      $message.text('Press space for a new word');
      // var self = this; Can use self or bind to overcome context issue
      $(window).on('keypress', function(event) {
        event.preventDefault();
        if (event.which === 32) {
          $(window).off();
          $message.text('');
          this.clearPreviousDisplay();
          newGame = Object.create(Game).init();
        }
      }.bind(this));
    },
    completeWord: function() {
      var $span = $spaces.find('span');
      this.word.split('').forEach(function(character, idx) {
        if ($span.eq(idx).text() === "") {
          $span.eq(idx).text(character.toUpperCase()).css('color', '#b00b00');
        }
      });
    },
    processKeypress: function(charPressed) {
      if (this.duplicateGuess(charPressed)) {
        return;
      } else if (this.incorrectGuess(charPressed)) {
        this.processIncorrectLetter(charPressed);
      } else if (this.correctGuess(charPressed)) {
        this.processCorrectLetter(charPressed);
      }
    },
    duplicateGuess: function(charPressed) {
      if (this.incorrectLetters.indexOf(charPressed) !== -1 || this.correctLetters.indexOf(charPressed) !== -1) {
        return true;
      }
    },
    correctGuess: function(charPressed) {
      if (this.word.indexOf(charPressed) !== -1 && this.correctLetters.indexOf(charPressed) === -1) {
        return true;
      }
    },
    processCorrectLetter: function(charPressed) {
      this.word.split('').forEach(function(character, idx) {
        if (character === charPressed) {
          this.updateCorrectLetterDisplay(character, idx);
          this.updateCorrectLettersArray(character);
        }
      }.bind(this));
    },
    processIncorrectLetter: function(charPressed) {
      this.updateIncorrectLettersArray(charPressed);
      this.removeAppleDisplay();
      this.updateIncorrectLetterDisplay(charPressed);
      this.incorrectGuesses += 1;
    },
    updateIncorrectLettersArray: function(charPressed) {
      this.incorrectLetters.push(charPressed);
    },
    incorrectGuess: function(charPressed) {
      if (this.word.indexOf(charPressed) === -1) {
        return true;
      }
    },
    updateIncorrectLetterDisplay: function(charPressed) {
      $guesses.append('<span>' + charPressed.toUpperCase() + '</span> ');
    },
    updateCorrectLetterDisplay: function(charPressed, idx) {
      $spaces.find('span').eq(idx).text(charPressed);
    },
    updateCorrectLettersArray: function(character) {
      this.correctLetters.push(character);
    },
    removeAppleDisplay: function() {
      if (this.incorrectGuesses === 0) {
        $apples.addClass('guess_1');
      } else {
        $apples.removeClass();
        $apples.addClass('guess_' + String(this.incorrectGuesses + 1));
      }
    },
    setWordSpacesDisplay: function() {
      for (var i = 0; i < this.word.length; i += 1) {
        $spaces.append('<span></span> ');
      }
    },
    clearPreviousDisplay: function() {
      $spaces.empty('span');
      $guesses.empty('span');
      $('body').removeClass();
      $apples.removeClass();
    },
    checkForWords: function() {
      if (this.word.length < 1) {

      }
    },
    init: function() {
      this.word = randomWord();
      if (this.word === undefined) {
        $message.text("You're out of words!")
      } else {
        this.incorrectLetters = [];
        this.incorrectGuesses = 0;
        this.correctLetters = [];
        this.maxGuesses = 6;
        this.setWordSpacesDisplay();
        this.bindCharacterPresses();
      }
      return this;
    },
  };

  var newGame = Object.create(Game).init();
  // The context of a constructor invocation with new is the newly created object.
});
