const ws = new WebSocket('wss://acceleromate.herokuapp.com');
const speedIndex = window.innerWidth / 180 + 5;
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const fps = 30;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.beginPath();
ctx.strokeStyle = "#283593";
ctx.lineWidth = 5;

const dots = [];

const debounce = (f, ms) => {

  let isCooldown = false;

  return function() {
    if (isCooldown) return;

    f.apply(this, arguments);

    isCooldown = true;

    setTimeout(() => isCooldown = false, ms);
  };

}

const main = () => {
  const isMobile = window.innerWidth < 960;
  const dotEl = document.querySelector('.dot');

  if (isMobile && window.DeviceOrientationEvent) {
    dotEl.remove();
    window.addEventListener('deviceorientation', handleOrinationChangeWithDebounce);
    document.body.addEventListener('click', handleMobileClick);
  } 
  
  if (!isMobile) {

    let newPosition;

    ws.onmessage = (message) => {
      let { type, x, y } = JSON.parse(message.data); 

      if (type === 'setdot') {
        const dotPosition = dotEl.getBoundingClientRect();
        dots.push({x: dotPosition.left + 20 , y: dotPosition.top + 20});
        drawLine(dots);
      } else {
        x = x > 90 ? x - 360 : x;
        newPosition = {newX: x * -speedIndex, newY: y * -speedIndex};
        drawDot(dotEl, {x: newPosition.newX, y: newPosition.newY});
      }
    }
  }
}

const drawDot = (el, {x,y}) => {
  el.style.transform = `translate(${x}px, ${y}px)`
}

const drawLine = (dots) => {
  if (dots.length === 1) {
    var { x, y } = dots[0];
    ctx.moveTo(x, y);
    ctx.arc(x, y, 20, 0, 2 * Math.PI);
  } else if (dots.length > 1) {
    var { x, y } = dots[dots.length - 1];
    ctx.arc(x, y, 20, 0, 2 * Math.PI);
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.lineWidth = 5;
  }
}

const handleOrinationChange = (event) => {

  const data = {
    alpha: Number.parseFloat(event.alpha).toFixed(5),
    beta: Number.parseFloat(event.beta).toFixed(5),
  }

  ws.send(JSON.stringify({x: data.alpha, y: data.beta}));

}

const handleOrinationChangeWithDebounce = debounce(handleOrinationChange, 1000 / fps);

const handleMobileClick = (event) => {
  ws.send(JSON.stringify({type: 'setdot'}));
}



document.addEventListener('DOMContentLoaded', main);