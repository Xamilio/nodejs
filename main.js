class Weapon {
  constructor(name, damage) {
    if (new.target === Weapon) {
      throw new TypeError("Cannot construct Abstract instances directly");
    }
    this.name = name;
    this.damage = damage;
  }

  attack() {
    throw new Error("Method attack() must be implemented.");
  }
}

class Katana extends Weapon {
  constructor() {
    super("Nagakiba", 45); 
  }

  attack() {
    return `робить швидкий змах катаною ${this.name}, завдаючи ${this.damage} фізичної шкоди та швидко накопичуючи кровотечу!`;
  }
}

class MagicStaff extends Weapon {
  constructor() {
    super("Meteorite Staff", 60);
  }

  attack() {
    return `кастує заклинання через ${this.name}, завдаючи ${this.damage} магічної шкоди!`;
  }
}

class Player {
  constructor(nick, hp = 100, score = 0) {
    this.nick = nick;
    this.hp = hp;
    this.score = score;
  }

  fight(weapon) {
    console.log(`[${this.nick} | HP: ${this.hp} | Score: ${this.score}] ${weapon.attack()}`);
  }
}

const mainHero = new Player("Oleksandr", 150, 1200);

const myKatana = new Katana();
const myStaff = new MagicStaff();

mainHero.fight(myKatana);
mainHero.fight(myStaff);

export { Player, Weapon, Katana, MagicStaff };