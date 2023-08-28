class Player {
  _health;
  _sanity;
  _stamina;
  constructor(name = "Tofu") {
    this.name = name;
    this._health = 100;
    this._sanity = 100;
    this._stamina = 100;
  }

  setHealth(health) {
    this._health = health;
  }
  setSanity(sanity) {
    this._sanity = sanity;
  }
  setStamina(stamina) {
    this._stamina = stamina;
  }

  getHealth() {
    return this._health;
  }
  getSanity() {
    return this._sanity;
  }
  getStamina() {
    return this._stamina;
  }

  walk() {
    console.log(this.name + " เดิน");
    this._stamina = this._stamina - 5;
  }
}

class Game extends Player {
  constructor(name, tick = 0) {
    super(name);
    this.tick = tick;
    this.events = [
      {
        event: "tick = 0",
        options: [
          {
            keyword: "เดินไปห้องข้างหน้า",
            result: () => {
              this.walk();
              this.tick = 1;
            },
          },
        ],
      },
      {
        event: "tick = 1",
        options: [
          {
            keyword: "เดินไปห้องข้างหน้า",
            result: () => {
              this.walk();
              this.tick = 2;
            },
          },
        ],
      },
    ];
  }
  processInput(input) {
    var currentEvent = this.events[this.tick];
    for (const option of currentEvent.options) {
      if (input.includes(option.keyword)) {
        option.result();
        return;
      }
    }
  }
}
const player = new Game("UwU");

player.processInput("เดินไปห้องข้างหน้า");
console.log("tick:" + player.tick);
player.processInput("เดินไปห้องข้างหน้า");
console.log("tick:" + player.tick);

console.log("Health:" + player.getHealth());
console.log("Sanity:" + player.getSanity());
console.log("Stamina:" + player.getStamina());
