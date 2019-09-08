import { AppController } from './AppController.abstract';

export class DesktopController extends AppController {
  private dotEl: HTMLElement;
  private dots: Dot[] = [];
  private speedIndex: number;
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D

  constructor(
    private ws: WebSocket,
  ) {
    super();
    this.init();
  }

  private init = () => {

    this.appEl.innerHTML = document.querySelector('template[data-app="desktop"]').innerHTML;

    this.initCanvasConfig();

    this.speedIndex = window.innerWidth / 180 + 5;
    this.dotEl = document.querySelector('.dot');

    this.ws.onmessage = (message) => {
      let { type, x, y } = JSON.parse(message.data); 

      if (type === 'setdot') {
        const dotPosition = this.dotEl.getBoundingClientRect();
        this.dots.push({x: dotPosition.left + 20 , y: dotPosition.top + 20});
        this.drawLine(this.dots);
      } else {
        x = x > 90 ? x - 360 : x;
        requestAnimationFrame(() => {
          this.drawDot(this.dotEl, {x: x * -this.speedIndex, y: y * -this.speedIndex});
        });
      }
    }
  }

  private drawDot = (el, {x,y}) => {
    el.style.transform = `translate3d(${x}px, ${y}px, 0)`
  }
  
  private drawLine = (dots) => {
    if (dots.length === 1) {
      var { x, y } = dots[0];
      this.ctx.moveTo(x, y);
      // this.ctx.arc(x, y, 20, 0, 2 * Math.PI);
    } else if (dots.length > 1) {
      var { x, y } = dots[dots.length - 1];
      // this.ctx.arc(x, y, 20, 0, 2 * Math.PI);
      this.ctx.lineTo(x, y);
      this.ctx.stroke();
      this.ctx.lineWidth = 5;
    }
  }

  private initCanvasConfig = () => {
    this.canvas = this.appEl.querySelector('canvas');
    this.ctx = this.canvas.getContext('2d');

    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.ctx.beginPath();
    this.ctx.strokeStyle = "#283593";
    this.ctx.lineWidth = 5;
  }
}

interface Dot {
  x: number;
  y: number;
}
