//consider using objects for the following elements
//words
//guesses
//score
//letters guessed
//displayed word

//helper function to get a random int
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//helper function returns true for characters and false for others
function checkInp(c) {
    var regex=/^[a-zA-Z]+$/;
    return c.match(regex) && c.length == 1;
}

var words = {
    wordList: ["Dummy", "Doofus", "Idiot", "Stupid", "Retard", "Moron"],
    //gets random word from a list of words
    getRandomWord: function() {
        //console.log(getRandomInt(0, this.wordList.length));
        return this.wordList[(getRandomInt(0, (this.wordList.length-1)))];
    }
}

var guessThis = {
    actualWord: "",
    blankWord: "",
    countDown: 10,
    guessedLetters: "",
    winScore: 0,
    loseScore: 0,

    //only job is to update the guessedLetters
    updateGuessed: function(c) {
        this.guessedLetters = this.guessedLetters + c;
        var toShow = "";
        for (var i = 0; i < this.guessedLetters.length; i++) {
            toShow = toShow + this.guessedLetters[i] + " ";
        }
        toShow = toShow.toUpperCase();
        console.log(toShow);
        document.getElementById("guessedLetters").innerHTML = "Letters already guessed: " + toShow;
    },

    //only job is to update blankWord
    updateBlank: function(c) {
        var replacementWord = "";
        for (var i = 0; i < this.actualWord.length; i++) {
            if (c == this.actualWord[i]) {
                replacementWord = replacementWord + c + " ";
            } else {
                replacementWord = replacementWord + this.blankWord[(i * 2)] + " ";
            }
        }
        this.blankWord = replacementWord;
        console.log(replacementWord);
        document.getElementById("fillMe").innerHTML = this.blankWord;
    },

    setActual: function() {
        this.actualWord = words.getRandomWord().toLowerCase();
        console.log("During setActual: " + this.actualWord);
    },

    setBlank: function() {
        this.blankWord = "";
        for (var i = 0; i < this.actualWord.length; i++) {
            this.blankWord += "_ ";
        }
    },

    checkForRepeat: function(c) {
        //it's only job is to check guessed list for repeated entries
        for (var i = 0; i < this.guessedLetters.length; i++) {
            if (c == this.guessedLetters[i]) {
                return true;
            }
        }
        return false;
    },

    checkForMatch: function(c) {
        for (var i = 0; i < this.actualWord.length; i++) {
            if (c == this.actualWord[i]) {
                console.log("You found a match!");
                return true;
            }
        }
        this.countDown--;
        document.getElementById("countDown").innerHTML = "Number of guesses remaining: " + guessThis.countDown;
        return false;
        //check actualWord for any matched letters.
        //update blankWord if there are any matches
    },

    //checks if I've won
    winState: function() {
        for (var i = 0; i < this.blankWord.length; i = i + 2) {
            if (this.blankWord[i] == "_") {
                return false;
            }
        }

        return true;
    },
}

var game = {
    init: function() {
        guessThis.setActual();
        guessThis.setBlank();
        document.getElementById("fillMe").innerHTML = guessThis.blankWord;
        document.getElementById("guessedLetters").innerHTML = "Letters already guessed: " + guessThis.guessedLetters;
        document.getElementById("countDown").innerHTML = "Number of guesses remaining: " + guessThis.countDown;
        document.getElementById("winScore").innerHTML = "Wins: " + guessThis.winScore;
        document.getElementById("loseScore").innerHTML = "Losses: " + guessThis.loseScore;
        console.log(guessThis.actualWord);
    },
    softReset: function() {
        guessThis.actualWord = "";
        guessThis.blankWord = "";
        guessThis.countDown = 10;
        guessThis.guessedLetters = "";
    },
    hardReset: function() {
        this.softReset();
        console.log(guessThis.countDown);
        guessThis.winScore = 0;
    }
}

//get letter than user inputted and compare to letters in word
//if number of guesses goes to zero, alert that you lost the game
document.onkeyup = function(event) {
    //check if you lost
    if (guessThis.countDown > 0) {
        var userGuess = event.key;
        //check it it's a character
        if (checkInp(userGuess)) {
            //check if there are any repeats
            //guessThis.checkForRepeat(userGuess);
            //if there's no repeated entries, check if the letter is correct
            //if the letter is correct, change the blankWord variable
            if (!guessThis.checkForRepeat(userGuess)) {
                //add input to guessed list
                guessThis.updateGuessed(userGuess);
                if (guessThis.checkForMatch(userGuess)) {
                    guessThis.updateBlank(userGuess);
                    console.log("You guessed correctly");
                    console.log(guessThis.winState());
                    //check if you won
                    //if you've won, increase score by 1, announce that you've won, and reset game
                    if (guessThis.winState()) {
                        alert("Word completed.\nResetting game.");
                        guessThis.winScore++;
                        document.getElementById("winScore").innerHTML = "Wins: " + winScore;
                        game.softReset();
                        game.init();
                        console.log(guessThis.winScore);
                    }
                } else {
                    alert("Wrong letter!");
                    console.log("You guessed incorrectly");
                }
            } else {
                alert("You've already entered this letter");
            }
        } else {
            alert("Invalid input");
            //console.log("Invalid character");
        }
    } else {
        alert("You have no guesses left!\nResetting game.");
        guessThis.loseScore++;
        document.getElementById("loseScore").innerHTML = "Losses: " + loseScore;
        game.softReset();
        game.init();
    }
    
}

game.init();