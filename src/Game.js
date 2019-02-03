import Player from './Player.js'
import domUpdates from './domUpdates.js';
import Round from './Round.js';
import data from './data.js'

class Game {
  constructor() {
    this.round = 0;
    this.rounds = [];
    this.players = [];
    this.allData = [[],[],[],[],[],[],[],[],[],[]];
  }
  start() {
    this.createPlayers(domUpdates.grabNames());
    this.getRandomData();
    this.createRounds();
  }

  createPlayers(array) {
    this.players = array.map(person => {
      return person = new Player(person);
    });
    this.shuffle(this.players);
    domUpdates.loadGameBoard(this.players);
  }
  getRandomData () {
    this.allData.forEach((cat, ind) => {
      data.clues.forEach(clue => { 
        if (clue.categoryId === (ind + 1)) {
          cat.push(clue);
        }
      })
    });
    this.shuffle(this.allData).forEach(cat => this.shuffle(cat));
  }
  shuffle (a) {
    return a.sort(() => 0.5 - Math.random());
  }
  createRounds () {
    let round = new Round(this.clueSet());
    console.log(this.allData);
    this.rounds.push(round);
    round.sortClues();
  }
  clueSet () {
    return this.allData.splice(0, 4);
  }
}

export default Game;