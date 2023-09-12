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
  class Note extends Object {
    constructor(name, id, description) {
      super(name, id, description);
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
  class Flashlight extends Object {
    constructor(name, id, description) {
      super(name, id, description);
    }
  }
  class Key extends Object {
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
  class Outside extends Room {
    constructor(name, id, description, ways = [], objects = [], items = []) {
      super(name, id, description, ways, objects, items);
    }
    ending() {
      var text = "Ending";
      showtext(text);
      showPopup();
    }
  }
  
  var inputElement = document.getElementById("input");
  var box = null;
  var boxID = null;
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
  var window = new Object("หน้าต่าง", -9, "มันเเตกไปบางส่วน");

  var flashlight = new Flashlight("flashlight", 1, "ใช้ในการส่องแสงในที่มืด");
  
  var key = new Key("key", 3, "กุญแจมันดูเก่ามากกว่าที่จะใช้กับประตูปกติ");
  var pictureframe = new Box("pictureframe", 2, "กรอบรูปที่ยังไม่ได้ใส่รูป...ดูเหมื่อนขางหลังกรอบรูปที่ว่างเปล่านี้จะมี key", [key]);
  
  var room0 = new Room(
    "ห้องนอน",
    0,
    "ในห้องนี้มีเตียงแล้วมีตู้เสื้อผ้าอยู่ข้างซ้ายของเตียงเเละหัวเตียงไปทางที่ตรงข้ามกับประตูทางออกจากห้องนอนในทิศตะวันตก(west)และยังมีโต๊ะกับเก้าอี้หันไปทางประตูที่มี flashlight วางไว้อยู่บนโต๊ะข้างทางออก.",
    ["west"],
    [bed, wardrobe, table, chair],
    [flashlight]
  );
  var roomF1 = new Room(
    "โถงทางเดิน",
    -1,
    "ที่มุมโถงทางเดินตรงหน้าทางไปห้องนอน(east)มีกล่องไม้วางกองกันอยู่หลายกล่องถัดจากกล่องมี กรอบรูปเปล่า(pictureframe) ห้อยอยู่เเละดูเหทือนโถงทางเดินนี้จะกว้างไปในทางทิศเหนือ(north).",
    ["north", "east"],
    [woodenbox, pictureframe],
    []
  );
  var room100F1 = new Room(
    "โถงทางเดิน",
    99,
    "ที่มุมโถงทางเดินตรงหน้าทางไปห้องนั่งเล่น(east)มี... เเละดูเหทือนโถงทางเดินนี้จะกว้างไปในทางทิศใต้(south).",
    ["south", "east"],
    [],
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
    "ในห้องมีเเต่ชั้นวางของและหน้าต่างที่เเตกอยู่ และทางกลับไปโถงหน้าบ้าน(west).", 
    ["west"], 
    [shelves, ]
  );
  var room1 = new Room(
    "ห้องเก็บของ",
    1,
    "ในห้องมีเเต่มีกล่องไม้วางกองกันมากจนเเทบจะไม่มีที่เดินเเต่สามารถเดินไปตรงกลางห้องได้ซึงมีประตูอยู่ตรงพื้น และทางกลับไปโถงหน้าบ้าน(north).",
    ["north"],
    [woodenbox],
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
    detail += "take {item},{object}," + "<br>";
    detail += "back //close object," + "<br>";
  
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

        if (input.includes("") && fun != 0 || input.includes("back") && fun != 0) {
            fun = 0;
        } else if (input.includes("go ")) {
          player.go(input);
        } else if (roomDescription.includes(input)) {
          box = getObject(input, id);
          if (box) {
            boxID = box.getId();
            showtext(box.getDescription());
            fun = -1;
          } else {
            var text = "try again.";
            showtext(text);
          }
        } else if (input.includes("take ")) {
          const itemName = input.split("take ")[1].trim();
          if (fun === -1) {
            player.take(itemName, id, boxID);
            fun = 0;
          } else {
            player.take(itemName, id);
          }
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
        } else if (fun != -1) {
          showtext(roomName + ": " + roomDescription);
        }
      }
    });
  }
