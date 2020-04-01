import GamePart from './GamePart';

class Player extends GamePart {
  constructor(size) {
    super(size);
    this.oldX = null;
    this.oldY = null;
    this.vX = 0;
    this.vY = 0;
  }

  move() {
    this.oldX = this.x;
    this.oldY = this.y;
    this.x += this.vX;
    this.y += this.vY;
  }
}

export default Player;
