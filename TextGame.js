class Player {
  #name;
  #health;
  #stamina;
  #inventory;

  constructor(name = "Tofu") {
    this.#name = name;
    this.#health = 100;
    this.#stamina = 200;
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

  take(itemName, ID, boxID) {
    if (fun === -1){
      var room = getObject(boxID, ID);
    }else{
      var room = getRoom(ID);
    }

    const object = room.getItems().find((obj) => obj.getName() === itemName);
    var text;
    if (object) {
      text = this.#name + " takes " + object.getName();
      this.addInventory(object);
      room.delItems(itemName);
      room.setDescription(room.getDescription(), object);
    } else {
      text = this.#name + ": ....";
    }
    showtext(text);
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
class Box extends Object {
  #items;
  constructor(name, id, description, items = []) {
    super(name, id, description);
    this.#items = items;
  }
  setDescription(description, item) {
    if (item) {
      const updatedDescription = description.replace(item.getName(), "ความว่างเปล่า");
      super.setDescription(updatedDescription);
    } else {
      super.setDescription(description); 
    }
  }

  getItems() {
    return this.#items;
  }
  delItems(itemName) {
    const updatedItems = this.getItems().filter(
      (obj) => obj.getName() !== itemName
    );
    this.#items = updatedItems;
  }
}
class Door extends Object {
  #nextRoom;
  #status;
  #req;
  constructor(name, id, description, nextRoom, status = "unlock" , req = 6666) {
    super(name, id, description);
    this.#nextRoom = nextRoom;
    this.#status = status;
    this.#req = req;
  }
  next() {
    if (this.#status === "lock") {
      for (const item of player.getInventory()) {
        if (item.getId() === this.#req) {
          id = this.#nextRoom;
          return;
        }
      }
      showtext("มันล็อคอยู่");
    } else {
      id = this.#nextRoom;
    }
  }
}
class Flashlight extends Object {
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
  #items;

  constructor(name, id, description, ways = [], objects = [], items = []) {
    this.#name = name;
    this.#id = id;
    this.#description = description;
    this.#ways = ways;
    this.#objects = objects;
    this.#items = items;
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
  setDescription(description, item) {
    const updatedDescription = description.replace(item.getName(), "ความว่างเปล่า");
    this.#description = updatedDescription;
  }

  getWays() {
    return this.#ways;
  }
  getObjects() {
    return this.#objects;
  }

  getItems() {
    return this.#items;
  }
  delItems(itemName) {
    const updatedItems = this.getItems().filter(
      (obj) => obj.getName() !== itemName
    );
    this.#items = updatedItems;
  }
}
class End extends Room {
  constructor(name, id, description, ways = [], objects = [], items = []) {
    super(name, id, description, ways, objects, items);
  }
  ending() {
    let text;
    for (const item of player.getInventory()) {
      if (item.getId() === 10) {
        text = "Ending: " + player.getName() + " เดินออกจากบ้าน...ท้องฟ้ามีสีแดงและพระจันทร์ที่มืดสนิท";
        break;
      }
    }
    if (!text) {
      text = "Ending: " + player.getName() + " เดินออกจากบ้านและไม่กลับมาอีกเลย";
    }
    return text;
  }
}

var inputElement = document.getElementById("input");
var obj = null;
var objID = null;
var fun = 0;
var id = 0;

var bed = new Object("เตียง",-1,"เป็นเตียงที่ดูเรียบร้อย");
var wardrobe = new Object("ตู้เสื้อผ้า",-2,"ในตู้มีเเต่เสื้อผ้า");
var table = new Object("โต๊ะ",-3,"มีรูปทรงสี่เหลี่ยมจัตุรัสที่ถูกทำมาจากไม้");
var chair = new Object("เก้าอี้",-3,"เก้าอี้ที่ถูกทำมาจากไม้");
var woodenbox = new Object("กล่องไม้", -4, "กล่องไม้ถูกปิดอย่างเเน่นหนา");
var tv = new Object("ทีวี", -5, "มันดูเหมือนไม่ได้ถูกใช้งานมานานมาก");
var sofa = new Object("โซฟา", -6, "โซฟาสีดำที่มีประมาณ3ที่นั่ง");
var shoerack = new Object("ชั้นวางรองเท้า", -7, "มันว่างเปล่า");
var shelves  = new Object("ชั้นวางของ", -8, "มันว่างเปล่า");
var windoww = new Object("หน้าต่าง", -9, "มันเเตกไปบางส่วน");

var flashlight = new Flashlight("flashlight", 1, "ใช้ในการส่องแสงในที่มืด");
var key = new Object("key", 2, "กุญแจมันดูเก่ามากกว่าที่จะใช้กับประตูปกติ");
var pictureframe = new Box("pictureframe", 3, "กรอบรูปที่ยังไม่ได้ใส่รูป...ดูเหมื่อนขางหลังกรอบรูปที่ว่างเปล่านี้จะมี key", [key]);
var doorB1 = new Door("door", 4, "เป็นประตูสี่เหลี่ยมจัตุรัสเก่าๆ", 666, "lock", 2);
var doorG1 = new Door("door", 5, "เป็นประตูสี่เหลี่ยมผืนผ้าเก่าๆ", 1);
var note1 = new Object("note", 6, "กระดาษสี่เหลียมผืนผ้าที่ถูกเขียนไว้ว่า 'Alice ฉันได้ย้ายบ้านมาในจุดที่ได้บอกเเล้ว บ้านหลังนี้ข้อนข้างหางจากหมู่บ้านนิดหน่อยเลยละ   จาก Pikko' มันดูจะเป็นจดหมายมากกว่าโน๊ต");
var note2 = new Object("note", 7, "'....ต้องไปอยู่ในหมู่บ้าน𖣘𖣘𖣘𖣘 หาบ้านที่ห่างจากใจกลางหมู่บ้านหลังที่เคยบอกด้วยละ เร...' มันถูกเผาไปบางส่วน");
var note3 = new Object("note", 8, "มันเปื้อนบางอย่างจนอ่านไม่ออกเเต่มีบากที่พออ่านได้ '....อย่าลืมละต้องเก็บของพวกนั้นไว้ในชั้นใต้ดินละฉั้นเตรียมห้องไว้ไห้เเล้ว พิธีต้....'");
var note4 = new Object("note", 9, "'....ใช้𖣘𖣘𖣘𖣘𖣘วาดวงเวทย์ตามรอยกลางห้องได้เลย....ตุ๊กต....าไว้ละว่าต้องทำภายในหนึ่งวันก่อนสุริยคราส....อย่าพลาดละไม่งันมันจะใช้เธอเเทนและที่นันได้มีปัญหาแน่น   จาก Alice' มันเปื้อนบางอย่างจนอ่านไม่ค่อยจะออก");
var tofu = new Object("x", 10, "𖣘𖣘𖣘𖣘");

var room0 = new Room(
  "ห้องนอน",
  0,
  "ในห้องนี้มีเตียงแล้วมีตู้เสื้อผ้าอยู่ข้างซ้ายของเตียงเเละหัวเตียงไปทางที่ตรงข้ามกับประตูทางออกจากห้องนอนในทิศตะวันตก(west)และยังมีโต๊ะกับเก้าอี้หันไปทางประตูที่มีกระดาษ(note)และ flashlight วางไว้อยู่บนโต๊ะข้างทางออก.",
  ["west"],
  [bed, wardrobe, table, chair, note1],
  [flashlight]
);
var roomM1 = new Room(
  "โถงทางเดิน",
  -1,
  "ที่มุมโถงทางเดินตรงหน้าทางไปห้องนอน(east)มีกล่องไม้วางกองกันอยู่หลายกล่องเเละถัดจากกล่องมี กรอบรูปเปล่า(pictureframe) ห้อยอยู่เเละดูเหทือนโถงทางเดินนี้จะกว้างไปในทางทิศเหนือ(north).",
  ["north", "east"],
  [woodenbox, pictureframe],
  []
);
var room100M1 = new Room(
  "โถงทางเดิน",
  99,
  "ที่มุมโถงทางเดินตรงหน้าทางไปห้องนั่งเล่น(east)มีกล่องไม้บนกล่องมีเศษกระดาษ(note)วางอยู่เเละดูเหทือนโถงทางเดินนี้จะกว้างไปในทางทิศใต้(south).",
  ["south", "east"],
  [woodenbox, note2],
  []
);
var room100 = new Room(
  "ห้องนั่งเล่น",
  100,
  "มีทีวีเเละโซฟาอยู่ตรงกลางห้อง ใกล้ๆกับทางไปโถงทางเดิน(west)มีตู้ลิ้นชักและ มีกล่องไม้วางกองกันอยู่สองกล่องข้างทางไปโถงหน้าบ้าน(east).",
  ["west", "east"],
  [woodenbox, tv, sofa],
  []
);
var room101 = new Room(
  "โถงหน้าบ้าน",
  101,
  "ใกล้กับทางไปห้องนั่งเล่น(west)มีชั้นวางรองเท้าซึ่งตรงข้ามกับทางไปห้องครัว(east) เเละมีทางไปห้องเก็บของ(south)ที่ตรงข้ามกับประตูทางออก(north).",
  ["west", "south", "north", "east"],
  [shoerack],
  []
);
var room102 = new Room(
  "ห้องครัว", 
  102, 
  "ในห้องมีเเต่ชั้นวางของบนนั้นมีมีเศษกระดาษ(note)วางอยู่และข้างๆมีหน้าต่างที่เเตกอยู่ และทางกลับไปโถงหน้าบ้าน(west).", 
  ["west"], 
  [shelves, windoww, note3]
);
var room1 = new Room(
  "ห้องเก็บของ",
  1,
  "ในห้องมีเเต่มีกล่องไม้วางกองกันมากจนเเทบจะไม่มีที่เดินเเต่สามารถเดินไปตรงกลางห้องได้ซึงมี ประตูชั้นใต้ดิน(door) ที่อยู่ตรงพื้นและทางกลับไปโถงหน้าบ้าน(north).",
  ["north"],
  [woodenbox, doorB1],
  []
);
var roomF1 = new Room(
  "ห้องใต้ดิน",
  666,
  "ทางที่เข้ามาเป็นประตูเก่าๆ(door)...ตรงกลางห้องมีวงกลมซึ่งข่างในมีลวดลายเรขาคณิตสลับซับซ้อนที่ถูกวาดไว้บนพื้นด้วยสสารสีเเดงตรงกลางมี x วางอยู่และรอบๆมีเเทียนที่ถูกจุดอยู่เเละที่มุมห้องมีเศษกระดาษ(note)วางอยู่.",
  [],
  [doorG1, note4],
  [tofu]
);
var out201 = new End("out 201", 201, "ข้างนอกมีเเต่ป่า.", [], []);
const rooms = [room0, roomM1, room1, room100, room100M1, room101, room102, out201 ,roomF1];

const player = new Player();
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
function getObject(input, id) {
  const objects = getRoom(id).getObjects();
  const object = objects.find((obj) => obj.getName() === input || obj.getId() === input);
  return object;
}

function details(player) {
  var detail = "Name: " + player.getName() + "<br>";
  detail += "Health: " + player.getHealth() + "<br>";
  detail += "Stamina: " + player.getStamina() + "<br>";
  detail += "<br>";
  detail += "Inventory: " + "<br>";
  for (const item of player.getInventory()) {
    detail += "<li>" + item.getName() + "</li>";
  }
  detail += "<br>";
  detail += "what " + player.getName() + " can do" + "<br>";
  detail += "go north,go south,go east,go west," + "<br>";
  detail += "<br>";
  detail += "take {item}," + "<br>";
  detail += " key //ตัวอย่าง item," + "<br>";
  detail += "<br>";
  detail += "{object} //ตรวจดู object," + "<br>";
  detail += "back //close object," + "<br>";
  detail += " ..(note) //ตัวอย่าง object," + "<br>";
  detail += "<br>";
  detail += "enter {object} //เข้าไปในประตู," + "<br>";

  return detail;
}
function showDetails(player) {
  var playerDetails = document.getElementById("playerDetail");
  playerDetails.innerHTML = details(player);
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
function playGame() {
  var room = getRoom(id);
  var roomDescription = room.getDescription();
  showtext("*เพล้ง*......");
  showtext(
    player.getName() +
      " ลืมตาขึ้นมาในห้องนอนเนื่องจากเสียงบางอยางเเตก....ดูเหมือนจะมาจากห้องอื่น"
  );
  showtext(roomDescription);
  showtext("what will " + player.getName() + " do?");

  inputElement.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      var input = inputElement.value;
      inputElement.value = "";
      console.log(input);

      if (input.includes("enter ")) {
        var intake = input.split(" ")[1];
        obj = getObject(intake, id);
        obj.next();
        fun = 0;
      } else if (input.includes("back") && fun === -1) {
          fun = 0;
      }  else if (input.includes("go ")) {
        player.go(input);
      } else if (roomDescription.includes(input)) {
        obj = getObject(input, id);
        if (obj) {
          objID = obj.getId();
          showtext(obj.getDescription());
          fun = -1;
        } else {
          var text = "try again.";
          showtext(text);
        }
      } else if (input.includes("take ")) {
        const itemName = input.split("take ")[1].trim();
        if (fun === -1) {
          player.take(itemName, id, objID);
          fun = 0;
        } else {
          player.take(itemName, id);
        }
      } else {
        var text = "try again.";
        showtext(text);
      }
      
      console.log("RoomID"+id)
      var room = getRoom(id);
      roomName = room.getName();
      roomDescription = room.getDescription();
      showDetails(player);

      if (room instanceof End) {
        text = room.ending();
        showtext(roomName + ": " + roomDescription);
        showtext(text);

        var resultBox = document.getElementById("resultBox");
        var reloadButton = document.createElement("button");
        reloadButton.addEventListener("click", reloadPage);
        reloadButton.innerHTML = "reset";
        resultBox.appendChild(reloadButton);
      } else if (fun != -1) {
        showtext(roomName + ": " + roomDescription);
      }
    }
  });
}
