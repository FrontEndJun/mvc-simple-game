export const getRandomValue = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(evt, cb) {
    (this.events[evt] || (this.events[evt] = [])).push(cb);
  }

  emit(evt) {
    if (this.events[evt]) {
      this.events[evt].forEach(cb => cb());
    }
  }
}
