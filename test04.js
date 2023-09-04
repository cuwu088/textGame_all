class Player {
  constructor(name = "Tofu") {
    this._name = name;
    this._health = 100;
    this._stamina = 100;
    this._inventory = [];
  }

  getName() {
    return this._name;
  }
  setName(name) {
    this._name = name;
  }

  getHealth() {
    return this._health;
  }
  setHealth(health) {
    this._health = health;
  }

  getStamina() {
    return this._stamina;
  }
  setStamina(value) {
    this._stamina = value;
  }

  getInventory() {
    return this._inventory;
  }

  go() {
    this.stamina = this.stamina - 5;
  }
}
class Room {
  constructor(name, id, description, ways = [], objects = []) {
    this._name = name;
    this._id = id;
    this._description = description;
    this._ways = ways;
    this._objects = objects;
  }
  getName() {
    return this._name;
  }
  setName(name) {
    this._name = name;
  }

  getId() {
    return this._id;
  }
  setId(id) {
    this._id = id;
  }

  getDescription() {
    return this._description;
  }
  setDescription(description) {
    this._description = description;
  }

  getWys() {
    return this._ways;
  }
  getObjects() {
    return this._objects;
  }
}
var inputElement = document.getElementById("input");

var room0 = new Room(
  "room 0",
  0,
  "มีทางในทิศ west north east.",
  ["west", "north", "east"],
  []
);
var roomF1 = new Room(
  "room F1",
  -1,
  "มีทางในทิศ north east.",
  ["north", "east"],
  []
);
var room1 = new Room(
  "room 1",
  1,
  "มีทางในทิศ west north.",
  ["west", "north"],
  []
);
const rooms = [room0, roomF1, room1];

const player = new Player();
start();

function showtext(text) {
  var resultElement = document.createElement("p");
  resultElement.innerHTML = text;
  var resultBox = document.getElementById("resultBox");
  resultBox.appendChild(resultElement);
  resultBox.scrollTop = resultBox.scrollHeight;
}

function getRoom(id) {
  const room = rooms.find((room) => room.id === id);
  return room;
}

function details(player) {
  var detail = "Name: " + player.getName() + "<br>";
  detail += "Health: " + player.getHealth() + "<br>";
  detail += "Stamina: " + player.getStamina() + "<br>";
  detail += "<br>";
  detail += "Inventory: " + "<br>";
  player.getInventory().forEach(function (item) {
    if (Array.isArray(item)) {
      item.forEach(function (subItem) {
        detail += subItem.getName() + "<br>";
      });
    }
  });
  detail += "<br>";
  detail += "what " + player.getName() + " can do" + "<br>";
  detail += "go north|go south|go east|go west" + "<br>";
  detail += "take {item}" + "<br>";
  return detail;
}
function showDetails(player) {
  var playerDetails = document.getElementById("playerDetail");
  playerDetails.innerHTML = details(player);
}

function start() {
  var enterName = prompt("name?");
  player.setName(enterName);
  showDetails(player);
  playGame();
}
function playGame() {
  var roomName = getRoom(1).getName();
  var roomDescription = getRoom(1).getDescription();
  showtext(roomName + ": " + roomDescription);
  showtext("what will " + player.getName() + " do?");
}
