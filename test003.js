var inputElement = document.getElementById("input");
start();

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
function getRoom(id) {
  const room = rooms.find(room => room.id === id);
  return room;
}
function start() {
  var text = "name?";
  showtext(text);
}
function playGame() {
  const player = new Player(inputElement.value);
  inputElement.value = "";
  showtext(player.name);

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

class Room {
  constructor(name, id, description) {
    this.name = name;
    this.id = id;
    this.description = description;
  }
}
var room1 = new Room("room 1", 1, "N.");
var room10 = new Room("room 10", 10, "-.");
const rooms = [room1,room10];