class Player {
  constructor(name = "Tofu") {
    this.name = name;
    this.health = 100;
    this.sanity = 100;
    this.stamina = 100;
    this.inventory = [];
  }

  setHealth(health) {
    this.health = health;
  }
  setSanity(sanity) {
    this.sanity = sanity;
  }
  setStamina(stamina) {
    this.stamina = stamina;
  }

  getHealth() {
    return this.health;
  }
  getSanity() {
    return this.sanity;
  }
  getStamina() {
    return this.stamina;
  }

  walk() {
    const connectedRoomId = door.getConnectedRoomId();
    if (connectedRoomId !== undefined) {
      this.currentRoomId = connectedRoomId;
      console.log(this.name + " เดินผ่านประตูไปยังห้อง " + connectedRoomId);
    } else {
      console.log("ไม่สามารถเดินผ่านประตูได้");
    }
    this.stamina = this.stamina - 5;
  }
  run() {
    const connectedRoomId = door.getConnectedRoomId();
    if (connectedRoomId !== undefined) {
      this.currentRoomId = connectedRoomId;
      console.log(this.name + " วิ่งผ่านประตูไปยังห้อง " + connectedRoomId);
    } else {
      console.log("ไม่สามารถเดินผ่านประตูได้");
    }
    this.stamina = this.stamina - 10;
  }

  inventory() {
    return this.inventory;
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

  take(object) {
    console.log(this.name + " หยิบ " + object);
    this.addInventory(object);
  }
  use(object) {
    const objectIndex = this.inventory.indexOf(object);
    if (objectIndex !== -1) {
      console.log(this.name + " ใช้ " + object);
    } else {
      console.log("ไม่มี " + object + " ใน inventory");
    }
  }
}

class Object {
  constructor(name, description) {
    this.name = name;
    this.description = description;
  }

  setDescription(description) {
    this.description = description;
  }

  getDescription() {
    return this.description;
  }
}
class Furniture {
  constructor(name, id) {
    this.name = name;
    this.id = id;
  }

  setName(name) {
    this.name = name;
  }
  setId(id) {
    this.id = id;
  }

  getName() {
    return this.name;
  }
  getId() {
    return this.id;
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
  constructor(id, description, objects = [], furniture = []) {
    this.id = id;
    this.description = description;
    this.objects = objects;
    this.furniture = furniture;
  }

  setId(id) {
    this.id = id;
  }
  setDescription(description) {
    this.description = description;
  }
  addObject(object) {
    this.objects.push(object);
  }
  delObject(object) {
    const index = this.objects.indexOf(object);
    if (index !== -1) {
      this.objects.splice(index, 1);
    }
  }
  addFurniture(furniture) {
    this.furniture.push(furniture);
  }
  delFurniture(furniture) {
    const index = this.furniture.indexOf(furniture);
    if (index !== -1) {
      this.furniture.splice(index, 1);
    }
  }

  getId() {
    return this.id;
  }
  getDescription() {
    return this.description;
  }
  getObjects() {
    return this.objects;
  }
  getFurniture() {
    return this.furniture;
  }
}

class Game {
  rooms = [];
  constructor() {
    var flashlight = new Object("ไฟฉาย", "ใช้ส่องเเสง");
    var doorNorth = new Door("ประตูทางทิศเหนือ", 1, 10);

    var startRoom = new Room(
      1,
      "ในห้องมีไฟฉาย(flashlight)ตกอยู่กลางห้องเเละมีประตูไปต่อในทางทิศเหนือ(north)",
      [flashlight],
      [doorNorth]
    );
    var room10 = new Room(
      10,
      "มีประตูไปต่อในทางทิศเหนือ(north)",
      [],
      [doorNorth]
    );
    var room20 = new Room(
      20,
      "มีประตูไปต่อในทางทิศเหนือ(north)",
      [],
      [doorNorth]
    );

    this.rooms.push(startRoom, room10, room20);
  }

  getRoom(id) {
    return this.rooms.find((room) => room.getId() === id);
  }
  playGame() {
    while (player.getHealth > 0) {
      var input = inputElement.value.toLowerCase();
      inputElement.value = "";
      if (input) {
        var resultElement = document.createElement("p");
        resultElement.innerHTML = option.result;
        document.getElementById("resultBox").appendChild(resultElement);
        document.getElementById("resultBox").scrollTop = document.getElementById("resultBox").scrollHeight;
      }
    }
  }
}
const game = new Game();
const player = new Player();


var textElement = document.getElementById("text");
var inputElement = document.getElementById("input");
function handleKeyDown(event) {
  if (event.key === "Enter") {
    displayInput();
  }
}
function playGame() {
  game.playGame();
}
