var inputElement = document.getElementById("input");

function handleKeyDown(event) {
  if (event.key === "Enter") {
    playGame();
  }
}

function showtext(text) {
  var resultElement = document.createElement("p");
  resultElement.innerHTML = text;

  var resultBox = document.getElementById("resultBox");
  resultBox.appendChild(resultElement);

  resultBox.scrollTop = resultBox.scrollHeight;
}

function playGame() {
  var text = "This is some example text.";
  showtext(text);
}
class Player {
  constructor(name = "Tofu") {
    this.name = name;
    this.health = 100;
    this.stamina = 100;
  }
  go() {
    this.stamina = this.stamina - 5;
  }
}
