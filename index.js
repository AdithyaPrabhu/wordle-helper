const readline = require("readline");
const WordleSolver = require("./WordleSolver");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

const wordleSolver = new WordleSolver();

const suggestWord = () => {
  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
  for (let i = 0; i < wordleSolver.currentList.length; i++) {
    if (
      [...wordleSolver.currentList[i]].filter(onlyUnique).length ===
      wordleSolver.currentList[i].length
    ) {
      return wordleSolver.currentList[i];
    }
  }
  return wordleSolver.currentList[0];
};

rl.on("line", function (line) {
  const enteredWord = line.split(",")[0];
  const colors = line.split(",")[1];
  for (let i = 0; i < enteredWord.length; i++) {
    let color = colors[i];
    switch (color) {
      case "b":
        wordleSolver.blackList(enteredWord[i]);
        break;
      case "o":
        wordleSolver.orangeList(enteredWord[i], i);
        break;
      case "g":
        wordleSolver.greenList(enteredWord[i], i);
        break;
    }
  }
  console.log(":::::::::::::::::::ALL POSSIBLE WORDS::::::::::::::::::::::::");
  console.log(wordleSolver.currentList.toString());
  console.log("::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::");
  console.log("---- SUGGESTED WORD ---- " + suggestWord());
});
