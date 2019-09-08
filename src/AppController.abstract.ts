export abstract class AppController {
  protected appEl = document.querySelector('.app');
  protected ws: WebSocket;

  constructor() {
    this.ws = new WebSocket('wss://acceleromate.herokuapp.com');
  }
}