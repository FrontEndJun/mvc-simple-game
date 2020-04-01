import { EventEmitter } from './helpers';

class GameView extends EventEmitter {
  constructor(canvas, scoreNode, timeNode) {
    super();
    this.c = canvas.getContext('2d');
    this.renderId = null;
    this.scoreNode = scoreNode;
    this.timeNode = timeNode;
    this.move = this.movePlayer.bind(this);
    this.stop = this.stopPlayer.bind(this);
  }

  finish() {
    cancelAnimationFrame(this.renderId);
    window.onkeydown = null;
    window.onkeyup = null;

    this.alertScore();
  }

  alertScore(score) {
    const answer = confirm(`Congratulations.\nYour Score ${score}\nWant play one more time?`);

    answer && this.emit('start');
  }

  start() {
    this.renderId = requestAnimationFrame(this.emit.bind(this, 'update'));

    window.onkeydown = this.move;
    window.onkeyup = this.stop;
  }

  renderFrame({ p, t }) {
    this.c.clearRect(0, 0, 400, 400);
    this.renderPlayer(p);
    this.renderTarget(t);

    this.renderId = requestAnimationFrame(this.emit.bind(this, 'update'));
  }

  renderPlayer(p) {
    this.drawCircle(p.x, p.y, p.size, 'black');
  }

  renderTarget(t) {
    this.drawCircle(t.x, t.y, t.size, 'red', t.cost);
  }

  drawCircle(x, y, size, color, text) {
    this.c.fillStyle = color;
    this.c.beginPath();
    this.c.arc(x, y, size, 0, 360);
    this.c.stroke();
    this.c.fill();
    this.c.fillStyle = 'white';
    text && this.c.fillText(text, x - 4, y + 4);
    this.c.closePath();
  }

  movePlayer(e) {
    e.preventDefault();
    this.emit(e.code + 'Pressed');
  }

  stopPlayer(e) {
    e.preventDefault();
    this.emit(e.code + 'Unpressed');
  }

  updateScore(score) {
    this.scoreNode.textContent = score;
  }

  updateTime(time) {
    this.timeNode.textContent = time;
  }
}

export default GameView;
