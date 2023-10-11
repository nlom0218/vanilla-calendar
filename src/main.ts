import Schedule from './ts/Schedule';

class App {
  #schedule;

  constructor() {
    this.#schedule = new Schedule();
  }

  init() {
    this.#schedule.render();
  }
}

const app = new App();
app.init();
