class GameController {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    view.on('move', () => this.model.movePlayer());
    view.on('start', this.start.bind(this));
    view.on('update', this.update.bind(this));
    model.on('finish', this.finish.bind(this));
    model.on('updateTime', this.updateTime.bind(this));
    model.on('updateScore', this.updateScore.bind(this));

    view.on('ArrowUpPressed', () => {
      this.model.setSpeed(-1, 'Y');
    });
    view.on('ArrowUpUnpressed', () => {
      this.model.dropSpeed('Y');
    });
    view.on('ArrowDownPressed', () => {
      this.model.setSpeed(1, 'Y');
    });
    view.on('ArrowDownUnpressed', () => {
      this.model.dropSpeed('Y');
    });
    view.on('ArrowLeftPressed', () => {
      this.model.setSpeed(-1, 'X');
    });
    view.on('ArrowLeftUnpressed', () => {
      this.model.dropSpeed('X');
    });
    view.on('ArrowRightPressed', () => {
      this.model.setSpeed(1, 'X');
    });
    view.on('ArrowRightUnpressed', () => {
      this.model.dropSpeed('X');
    });

    this.start();
  }

  update() {
    this.view.renderFrame({ p: this.model.player, t: this.model.target });
    this.model.update();
  }

  start() {
    this.model.start();
    this.updateTime();
    this.updateScore();
    this.view.start();
  }
  finish() {
    this.model.finish();

    this.view.finish();
  }

  updateTime() {
    this.view.updateTime(this.model.getTime());
  }

  updateScore() {
    this.view.updateScore(this.model.getScore());
  }
}

export default GameController;
