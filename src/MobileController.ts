import { debounce } from "./utilities";
import { fps } from "./app.const";
import { AppController } from "./AppController.abstract";

export class MobileController extends AppController {
  constructor(
    private ws: WebSocket
  ) {
    super();
    this.init();
  }

  private init = () => {
    this.appEl.innerHTML = document.querySelector('template[data-app="mobile"]').innerHTML;

    window.addEventListener('deviceorientation', this.handleOrinationChangeWithDebounce);
    this.appEl.addEventListener('click', this.handleMobileClick);
  }

  private handleOrinationChange = (event) => {

    const data = {
      alpha: Number.parseFloat(event.alpha).toFixed(5),
      beta: Number.parseFloat(event.beta).toFixed(5),
    }
  
    this.ws.send(JSON.stringify({x: data.alpha, y: data.beta}));
  
  }
  
  private handleOrinationChangeWithDebounce = debounce(this.handleOrinationChange, 1000 / fps);
  
  private handleMobileClick = (event) => {
    this.ws.send(JSON.stringify({type: 'setdot'}));
  }
}