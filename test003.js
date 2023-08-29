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

class Furniture {
  constructor(name, id) {
    this.name = name;
    this.id = id;
  }
}
class Door extends Furniture {
  constructor(name, id, connectedRoomId) {
    super(name, id);
    this.connectedRoomId = connectedRoomId;
  }

  nextRoomId(id) {
    this.connectedRoomId += id;
  }
}

class Room {
  constructor(name, id, description, ways = []) {
    this.name = name;
    this.id = id;
    this.description = description;
    this.ways = ways;
  }
}

var inputElement = document.getElementById("input");
var id = 0;

var room0 = new Room("room 0", 0, "มีทางในทิศ west north east.", [
  "west", "north", "east",
]);
var roomF1 = new Room("room F1", -1, "มีทางในทิศ north east.", [
  "north", "east",
]);
var room1 = new Room("room 1", 1, "มีทางในทิศ west north.", [
  "west", "north"]);
var room100 = new Room("room 100", 100, "มีทางในทิศ west south east.", [
  "west", "south", "east",
]);
var room100F1 = new Room("room 100F1", 99, "มีทางในทิศ south east.", [
  "south", "east",
]);
var room101 = new Room("room 101", 101, "มีทางในทิศ west north.", [
  "west", "south",
]);
const rooms = [room0, roomF1, room1, room100, room100F1, room101];

const player = new Player();
start();

function showtext(text) {
  var resultElement = document.createElement("p");
  resultElement.innerHTML = text;
  var resultBox = document.getElementById("resultBox");
  resultBox.appendChild(resultElement);
  resultBox.scrollTop = resultBox.scrollHeight;
}
function showDetails(player) {
  var detail = "Name: " + player.name + "<br>";
  detail += "Health: " + player.health + "<br>";
  detail += "Stamina: " + player.stamina + "<br>";
  detail += "<br>";
  detail += "what " + player.name + " can do" + "<br>";
  detail += "go north|go south|go east|go west" + "<br>";
  return detail;
}
function showPlayerDetail(player) {
  var playerDetails = document.getElementById("playerDetail");
  playerDetails.innerHTML = showDetails(player);
}
function getRoom(id) {
  const room = rooms.find((room) => room.id === id);
  return room;
}

function start() {
  var enterName = prompt("name?");
  player.name = enterName;
  showPlayerDetail(player);
  playGame();
}
function playGame() {
  var roomName = getRoom(id).name;
  var roomDescription = getRoom(id).description;
  showtext(roomName + " : " + roomDescription);
  inputElement.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      var input = inputElement.value;
      var checkWay = getRoom(id).ways;
      inputElement.value = "";
      if (input === "go north") {
        if (checkWay.includes("north")) {
          text = player.name + " go north";
          player.go();
          id += 100;
        } else {
          text = "nothing there";
        }
      } else if (input === "go south") {
        if (checkWay.includes("south")) {
          text = player.name + " go south";
          player.go();
          id -= 100;
        } else {
          text = "nothing there";
        }
      } else if (input === "go east") {
        if (checkWay.includes("east")) {
          text = player.name + " go east";
          player.go();
          id += 1;
        } else {
          text = "nothing there";
        }
      } else if (input === "go west") {
        if (checkWay.includes("west")) {
          text = player.name + " go west";
          player.go();
          id -= 1;
        } else {
          text = "nothing there";
        }
      } else {
        text = "again";
      }
      
      showtext(text);
      showPlayerDetail(player);
      var roomName = getRoom(id).name;
      var roomDescription = getRoom(id).description;
      showtext(roomName + " : " + roomDescription);
    }
  });
}
