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

  go(input) {
    var intake = input.split(" ")[1];
    var ways = getRoom(id).getWays();

    if (ways.includes(intake)) {
      if (this._stamina >= 5) {
        var text = this._name + " goes " + intake;
        if (intake === "north") {
          id += 100;
        } else if (intake === "south") {
          id -= 100;
        } else if (intake === "east") {
          id += 1;
        } else if (intake === "west") {
          id -= 1;
        }
        this._stamina -= 5;
      } else {
        var text = this._name + " tired.";
      }
    } else {
      var text = "nothing there.";
    }
    showtext(text);
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

  getWays() {
    return this._ways;
  }
  getObjects() {
    return this._objects;
  }
}
var inputElement = document.getElementById("input");
var id = 0;
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
var room100 = new Room(
  "room 100",
  100,
  "มีทางในทิศ west south east.",
  ["west", "south", "east"],
  []
);
var room100F1 = new Room(
  "room 100F1",
  99,
  "มีทางในทิศ south east.",
  ["south", "east"],
  []
);
var room101 = new Room(
  "room 101",
  101,
  "มีทางในทิศ west north.",
  ["west", "south"],
  []
);
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

function getRoom(id) {
  const room = rooms.find((room) => room.getId() === id);
  return room;
}

function details(player) {
  var detail = "Name " + player.getName() + "<br>";
  detail += "Health " + player.getHealth() + "<br>";
  detail += "Stamina " + player.getStamina() + "<br>";
  detail += "<br>";
  detail += "Inventory " + "<br>";
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
  var room = getRoom(id);
  var roomName = room.getName();
  var roomDescription = room.getDescription();
  showtext(roomName + ": " + roomDescription);
  showtext("what will " + player.getName() + " do?");

  inputElement.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      var input = inputElement.value;
      inputElement.value = "";

      if (input.includes("go ")) {
        player.go(input);
      } else {
        var text = "try again.";
        showtext(text);
      }

      var room = getRoom(id);
      roomName = room.getName();
      roomDescription = room.getDescription();
      showtext(roomName + ": " + roomDescription);
      showtext("what will " + player.getName() + " do?");
    }
  });
}
