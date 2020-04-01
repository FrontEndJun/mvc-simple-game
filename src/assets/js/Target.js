import GamePart from './GamePart';

class Target extends GamePart {
  constructor(size) {
    super(size);
    this.cost = 1;
  }

  update(x, y, cost) {
    this.x = x;
    this.y = y;
    this.cost = cost;
  }
}

export default Target;
