const words = [
  'bananas',
  'grapes',
  'carousel',
  'milkshake',
  'javascript',
  'limousine',
  'chocolate',
  'programming',
  'meatloaf',
  'ukulele',
  'mango'
]

let wins = 0
let losses = 0
let currentWord

class Word {
  constructor(word) {
    this.word = word
    this.displayWord = word.replaceAll(/[\w]/g, "_")
    this.remainingGuesses = 10
    this.incorrectLetters = []
    this.correctLetters = []
  }

  // implement the guessLetter function:
  // guessLetter(letter) {}
  guessLetter (guessedLetter){
    //check to see if a letter has already been guessed
    if (this.correctLetters.indexOf(guessedLetter)>=0 || this.incorrectLetters.indexOf(guessedLetter)>=0){
      return
    }
     //Should update displayWord with correctly guessed letters
     //Should NOT update displayWord with incorrectly guessed letters
    const displayWordAsArray = this.displayWord.split('');
    this.word.split('').forEach( (letter, index) => {
      if(letter === guessedLetter) {
        displayWordAsArray[index] = guessedLetter;
      }
    });
    const updatedDisplayWord = displayWordAsArray.join('');
    //When the users guessed the letter correctly update the change
    if(this.displayWord !== updatedDisplayWord){
      this.displayWord = updatedDisplayWord;
      //Should add correct letter to correctLetters property, not incorrectLetters property
      this.correctLetters.push(guessedLetter);
      //Should NOT decrement remainingGuesses when correctly guessing a letter
    } else{
      //Should decrement remainingGuesses when incorrectly guessing a letter
      this.remainingGuesses--;
      //Should add incorrect letter to incorrectLetters property, not correctLetters property
      this.incorrectLetters.push(guessedLetter);
    }
  }

  // implement the updateScreen function:
  // updateScreen() {}
  updateScreen (){
     //Should update #word-to-guess with displayWord
    const wordToGuessEl = document.getElementById('word-to-guess');
    wordToGuessEl.textContent = this.displayWord
    //Should update #remaining-guesses with remainingGuesses
    const remainingGuessesEl = document.getElementById('remaining-guesses');
    remainingGuessesEl.textContent = this.remainingGuesses;
    //Should update #incorrect-letters with incorrectLetters
    const incorrectLettersEl = document.getElementById('incorrect-letters');
    incorrectLettersEl.textContent = this.incorrectLetters.join(', ');
  }

  // implement the isGameOver function:
  // isGameOver() {}
  isGameOver(){
     //Should return true if displayWord !== word and remainingGuesses <= 0
    if (this.displayWord!== this.word && this.remainingGuesses <= 0) {
      console.log ('Game Over')
      return true;
    } 
  //Should return true if displayWord === word and remainingGuesses > 0
  //Should return true if displayWord === word and remainingGuesses <= 0
    if (this.displayWord=== this.word && this.remainingGuesses >= 0) {
      console.log ('Game Over')
      return true;
    } 
    //Should return false if displayWord !== word and remainingGuesses > 0
    return false;
  } 
  
  // implement the getWinOrLoss function:
  // getWinOrLoss() {}
  //--------------------------------------------//
  getWinOrLoss(){
    const isGameOver = this.isGameOver()
     //Should return null if game is not over
    if (isGameOver === false) {
      return null
    }

  //Should return "win" if displayWord === word and remainingGuesses > 0
    if (isGameOver === true && this.word === this.displayWord){
      return "win"
    }
     //Should return "loss" if remainingGuesses <= 0 and displayWord !== word
    return "loss";
  }
}

function newGame() {
  const randomWord = words[Math.floor(Math.random() * words.length)]
  currentWord = new Word(randomWord)
  currentWord.updateScreen()
}

document.onkeyup = function(e) {
  const pressedKey = e.key.toLowerCase()
  // early exit for non-letter key presses
  if (!/^[a-z]{1}$/g.test(pressedKey)) return

  // pass in guessed letter to word obj
  currentWord.guessLetter(pressedKey)
  // allow word obj to update screen
  currentWord.updateScreen()

  // check if game is over
  const gameOver = currentWord.isGameOver()

  // if game is over, update wins/losses and start new game
  if (gameOver) {
    const previousWord = document.getElementById('previous-word')
    const winDisplay = document.getElementById('wins')
    const lossDisplay = document.getElementById('losses')
    previousWord.textContent = currentWord.word
    const result = currentWord.getWinOrLoss()
    if (result === 'win') {
      wins++
      winDisplay.textContent = wins
    } else if (result === 'loss') {
      losses++
      lossDisplay.textContent = losses
    }
    newGame()
  }
}

newGame()