class Player {
  #name;
  #health;
  #stamina;
  #inventory;

  constructor(name = "Tofu") {
    this.#name = name;
    this.#health = 100;
    this.#stamina = 100;
    this.#inventory = [];
  }

  getName() {
    return this.#name;
  }
  setName(name) {
    this.#name = name;
  }

  getHealth() {
    return this.#health;
  }
  setHealth(health) {
    this.#health = health;
  }

  getStamina() {
    return this.#stamina;
  }
  setStamina(value) {
    this.#stamina = value;
  }

  getInventory() {
    return this.#inventory;
  }
  addInventory(item) {
    this.#inventory.push(item);
  }
  delInventory(item) {
    const index = this.#inventory.indexOf(item);
    if (index !== -1) {
      this.#inventory.splice(index, 1);
    }
  }

  go(input) {
    var intake = input.split(" ")[1];
    var ways = getRoom(id).getWays();

    if (ways.includes(intake)) {
      if (this.#stamina >= 5) {
        var text = this.#name + " goes " + intake;
        if (intake === "north") {
          id += 100;
        } else if (intake === "south") {
          id -= 100;
        } else if (intake === "east") {
          id += 1;
        } else if (intake === "west") {
          id -= 1;
        }
        this.#stamina -= 5;
      } else {
        var text = this.#name + " tired.";
      }
    } else {
      var text = "nothing there.";
    }
    showtext(text);
  }

  take(item, roomID) {
    var room = getRoom(roomID);
    const itemName = input.split("take ")[1].trim();
        const object = room.objects.find((obj) => obj.name === itemName);
        if (object) {
          text = player.name + " take " + object.name;
          this.addInventory(item);
          room.delObjects(item.getName());
        } else {
          text = "No " + objectName + " here.";
        }
  }
}

class Object {
  #name;
  #id;
  #description;

  constructor(name, id, description) {
    this.#name = name;
    this.#id = id;
    this.#description = description;
  }
  getName() {
    return this.#name;
  }
  setName(name) {
    this.#name = name;
  }

  getId() {
    return this.#id;
  }
  setId(id) {
    this.#id = id;
  }

  getDescription() {
    return this.#description;
  }
  setDescription(description) {
    this.#description = description;
  }
}
class Note extends Object {
  constructor(name, id, description) {
    super(name, id, description);
  }
}

class Room {
  #name;
  #id;
  #description;
  #ways;
  #objects;

  constructor(name, id, description, ways = [], objects = []) {
    this.#name = name;
    this.#id = id;
    this.#description = description;
    this.#ways = ways;
    this.#objects = objects;
  }
  getName() {
    return this.#name;
  }
  setName(name) {
    this.#name = name;
  }

  getId() {
    return this.#id;
  }
  setId(id) {
    this.#id = id;
  }

  getDescription() {
    return this.#description;
  }
  setDescription(description) {
    this.#description = description;
  }

  getWays() {
    return this.#ways;
  }
  getObjects() {
    return this.#objects;
  }
}
class Outside extends Room {
  constructor(name, id, description, ways = [], objects = []) {
    super(name, id, description, (ways = []), (objects = []));
  }
  ending() {
    var text = "Ending";
    showtext(text);
    showPopup();
  }
}

var inputElement = document.getElementById("input");
var id = 0;
var room0 = new Room(
  "bedroom",
  0,
  "ในห้องนี้มีเตียงแล้วมี ตู้ อยู่ข้างซ้ายของเตียงเเละหัวเตียงไปทางที่ตรงข้ามกับประตูทางออกจากห้องนอนในทิศ west และยังมีโต๊ะรูปทรงสี่เหลียมมีเก้าอี้หันไปทางประตูที่มี ไฟฉาย วางไว้อยู่บนโต๊ะข้างทางออก.",
  ["west"],
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
  "มีทางในทิศ west east.",
  ["west", "east"],
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
  "มีทางในทิศ west south north east.",
  ["west", "south", "north", "east"],
  []
);var room102 = new Room(
  "room 102",
  102,
  "มีทางในทิศ west east.",
  ["west", "east"],
  []
);
var room103 = new Room(
  "room 103",
  103,
  "มีทางในทิศ west.",
  ["west"],
  []
);
var out201 = new Outside("out 201", 201, "ข้างนอก.", [], []);
const rooms = [room0, roomF1, room1, room100, room100F1, room101, out201];

const player = new Player();
closePopup();
start();

function showtext(text) {
  var resultBox = document.getElementById("resultBox");
  var resultElement = document.createElement("p");
  resultElement.innerHTML = text;
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
  player.getInventory().forEach(function (items) {
    if (Array.isArray(items)) {
      items.forEach(function (item) {
        detail += item.getName() + "<br>";
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

function showPopup() {
  var popup = document.getElementById("popup");
  var body = document.body;
  popup.style.display = "flex";
  body.style.overflow = "hidden";
}
function closePopup() {
  var popup = document.getElementById("popup");
  var body = document.body;
  popup.style.display = "none";
  body.style.overflow = "auto";
}
function reloadPage() {
  location.reload();
}

function start() {
  var enterName = prompt("name?");
  player.setName(enterName);
  showDetails(player);
  playGame();
}
function start() {
  var enterName = prompt("name?");
  player.setName(enterName);
  showDetails(player);
  playGame();
}
function playGame() {
  var room = getRoom(id);
  var roomDescription = room.getDescription();
  showtext("*เพล้ง*....")
  showtext(player.getName()+" ลืมตาขึ้นมาในห้องนอนเนื่องจากเสียงบางอยางเเตก...ดูเหมือนจะมาจากห้องอื่น")
  showtext(roomDescription);
  showtext("what will " + player.getName() + " do?");

  inputElement.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      var input = inputElement.value;
      inputElement.value = "";

      if (input.includes("go ")) {
        player.go(input);
      } else if (input.includes("take ")) {
        player.take(input, id);
      } else {
        var text = "try again.";
        showtext(text);
      }

      var room = getRoom(id);
      roomName = room.getName();
      roomDescription = room.getDescription();
      showDetails(player);
      if (room instanceof Outside) {
        room.ending();

        showtext(roomName + ": " + roomDescription);

        var resultBox = document.getElementById("resultBox");
        var reloadButton = document.createElement("button");
        reloadButton.addEventListener("click", reloadPage);
        reloadButton.innerHTML = "reset";
        resultBox.appendChild(reloadButton);
      } else {
        showtext(roomName + ": " + roomDescription);
        showtext("what will " + player.getName() + " do?");
      }
    }
  });
}
