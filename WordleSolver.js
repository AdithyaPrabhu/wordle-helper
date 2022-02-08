const fs = require("fs");

class WordleSolver {
  constructor() {
    this.currentList = this.getAllFiveLetterWords();
  }

  getAllFiveLetterWords = () => {
    function onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
    }
    const allWords = fs.readFileSync("wordList.txt").toString().split("\n");
    const fiveLetterWords = [];
    for (let i in allWords) {
      allWords[i] = allWords[i].slice(0, -1); // code smell :: remove the return carry
      if (allWords[i].length === 5) {
        fiveLetterWords.push(allWords[i]);
      }
    }
    return fiveLetterWords.filter(onlyUnique);
  };

  blackList = (blackLetter) => {
    this.currentList = this.currentList.filter(
      (word) => !word.includes(blackLetter)
    );
  };

  greenList = (greenLetter, position) => {
    this.currentList = this.currentList.filter(
      (word) => word.charAt(position) == greenLetter
    );
  };

  orangeList = (orangeLetter, position) => {
    this.currentList = this.currentList.filter(
      (word) =>
        word.charAt(position) != orangeLetter && word.includes(orangeLetter)
    );
  };
}

module.exports = WordleSolver;
