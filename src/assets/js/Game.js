import Player from './Player';
import Target from './Target';
import { getRandomValue, EventEmitter } from './helpers';
const gameTime = 5;

class GameModel extends EventEmitter {
  constructor(width, heigtht) {
    super();
    this.speed = 7;
    this.costRange = {
      min: 1,
      max: 3,
    };
    this.width = width;
    this.height = heigtht;
    this.score = 0;
    this.player = new Player();
    this.target = new Target();
    this.timer = {
      timeLeft: gameTime,
      isFinished: true,
    };
  }

  start() {
    this.updateTarget();
    this.timer.isFinished = false;
    this.timer.timeLeft = gameTime;
    this.score = 0;
    this.timerID = setInterval(this.tick.bind(this), 1000);
  }

  update() {
    if (this.timer.isFinished) return;
    this.movePlayer();
    if (this.targetCollision()) {
      this.updateTarget();
      this.score += this.target.cost;
      this.emit('updateScore');
    }
  }

  updateTarget() {
    const newX = getRandomValue(this.target.size, this.width - this.target.size);
    const newY = getRandomValue(this.target.size, this.height - this.target.size);
    const newCost = getRandomValue(this.costRange.min, this.costRange.max);
    this.target.update(newX, newY, newCost);
  }

  movePlayer() {
    this.player.move();
    this.resolveBorderCollision();
  }

  setSpeed(dir, axis) {
    this.player['v' + axis] = this.speed * dir;
  }

  dropSpeed(axis) {
    this.player['v' + axis] = 0;
  }

  resolveBorderCollision() {
    if (this.player.x <= this.player.size) {
      this.player.x = this.player.size;
    }
    if (this.player.x >= this.width - this.player.size) {
      this.player.x = this.width - this.player.size;
    }
    if (this.player.y <= this.player.size) {
      this.player.y = this.player.size;
    }
    if (this.player.y >= this.height - this.player.size) {
      this.player.y = this.height - this.player.size;
    }
  }

  targetCollision() {
    const dx = Math.abs(this.player.x - this.target.x);
    const dy = Math.abs(this.player.y - this.target.y);

    const dVector = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
    return dVector < this.target.size + this.player.size;
  }

  finish() {
    clearInterval(this.timerID);
    this.timer.isFinished = true;
    this.dropSpeed('X');
    this.dropSpeed('Y');
  }

  tick() {
    if (this.timer.timeLeft--) {
      this.emit('updateTime');
    } else {
      this.emit('finish');
    }
  }

  getTime() {
    return this.timer.timeLeft;
  }

  getScore() {
    return this.score;
  }
}

export default GameModel;
