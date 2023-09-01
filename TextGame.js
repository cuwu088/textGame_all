class Player {
  constructor(name = "Tofu") {
    this.name = name;
    this.health = 100;
    this.stamina = 100;
    this.inventory = [];
  }
  go() {
    this.stamina = this.stamina - 5;
  }

  getInventory() {
    for (const item of this.inventory) {
      if (Array.isArray(item)) {
        for (const subItem of item) {
          console.log(subItem.name);
        }
      } else {
        console.log(item.name);
      }
    }
  }
  addInventory(object) {
    this.inventory.push(object);
  }
  delInventory(object) {
    const index = this.inventory.indexOf(object);
    if (index !== -1) {
      this.inventory.splice(index, 1);
    }
  }
  take(object, room) {
    this.addInventory(object);
    room.delObjects(object.name);
  }
}

class Object {
  constructor(name, id, description) {
    this.name = name;
    this.id = id;
    this.description = description;
  }
}
class Flashlight extends Object {
  constructor(name, id, description) {
    super(name, id, description);
  }
  open() {}
}

class Room {
  constructor(name, id, description, ways = [], objects = []) {
    this.name = name;
    this.id = id;
    this.description = description;
    this.ways = ways;
    this.objects = objects;
  }
  delObjects(objectName) {
    const index = this.objects.findIndex((obj) => obj.name === objectName);
    if (index !== -1) {
      this.objects.splice(index, 1);
    }
  }
  getObjectsName() {
    if (this.objects && this.objects.length > 0) {
      const objectNames = this.objects.map((object) => object.name);
      const objectNamesString = objectNames.join(", ");
      return objectNamesString;
    } else {
      return "ไม่มี";
    }
  }
}
class Darkroom extends Room {
  constructor(name, id, description, ways, objects) {
    super(name, id, description, ways, objects);
  }
  darkroom() {}
}

var inputElement = document.getElementById("input");
var id = 0;

var flashlight1 = new Flashlight("flashlight1", 1, "ใช้ในการส่องแสง");

var room0 = new Room(
  "room 0",
  0,
  "มีทางในทิศ west north east.",
  ["west", "north", "east"],
  [flashlight1]
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
var room100 = new Darkroom(
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
function showDetails(player) {
  var detail = "Name: " + player.name + "<br>";
  detail += "Health: " + player.health + "<br>";
  detail += "Stamina: " + player.stamina + "<br>";
  detail += "<br>";
  detail += "Inventory: " + "<br>";
  player.inventory.forEach(function (item) {
    if (Array.isArray(item)) {
      item.forEach(function (subItem) {
        detail += subItem.name + "<br>";
      });
    } else {
      detail += item.name + "<br>";
    }
  });
  detail += "<br>";
  detail += "what " + player.name + " can do" + "<br>";
  detail += "go north|go south|go east|go west" + "<br>";
  detail += "take {object}" + "<br>";
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
  var roomObjectsName = getRoom(id).getObjectsName();
  showtext(
    roomName + " : Objects_" + roomObjectsName + " และ" + roomDescription
  );
  showtext("what will " + player.name + " do?");
  inputElement.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      var input = inputElement.value;
      var checkWay = getRoom(id).ways;
      inputElement.value = "";
      if (input.includes("take")) {
        const objectName = input.split("take ")[1].trim();
        const room = getRoom(id);
        const object = room.objects.find((obj) => obj.name === objectName);
        if (object) {
          text = player.name + " take " + object.name;
          player.take(object, room);
        } else {
          text = "No " + objectName + " here.";
        }
      } else if (input === "go north" && checkWay.includes("north")) {
        text = player.name + " go north";
        player.go();
        id += 100;
      } else if (input === "go south" && checkWay.includes("south")) {
        text = player.name + " go south";
        player.go();
        id -= 100;
      } else if (input === "go east" && checkWay.includes("east")) {
        text = player.name + " go east";
        player.go();
        id += 1;
      } else if (input === "go west" && checkWay.includes("west")) {
        text = player.name + " go west";
        player.go();
        id -= 1;
      } else {
        text = "nothing there";
      }

      showtext(text);
      showPlayerDetail(player);
      var roomName = getRoom(id).name;
      var roomDescription = getRoom(id).description;
      var roomObjectsName = getRoom(id).getObjectsName();
      showtext(
        roomName + " : Objects_" + roomObjectsName + " และ" + roomDescription
      );
    }
  });
}
