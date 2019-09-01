const ws = new WebSocket('wss://acceleromate.herokuapp.com');
const speedIndex = window.innerWidth / 180 + 5;
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

ctx.beginPath();
ctx.strokeStyle = "#283593";
ctx.lineWidth = 15;

const dots = [];

const main = () => {
  const isMobile = window.innerWidth < 960;
  const dotEl = document.querySelector('.dot');

  if (isMobile && window.DeviceOrientationEvent) {
    dotEl.remove();
    window.addEventListener('deviceorientation', handleOrinationChange, true);
    window.addEventListener('click', handleMobileClick, true);
  } 
  
  if (!isMobile) {

    let newPosition;

    ws.onmessage = (message) => {
      let { type, x, y } = JSON.parse(message.data); 

      if (type === 'setdot') {
        dots.push({x: newPosition.newX, y: newPosition.newY});
        drawLine(dots);
      } else {
        newPosition = {newX: (x - 180) * -speedIndex, newY: y * -speedIndex};
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
    let { x, y } = dots[0];
    ctx.moveTo(x, y);
  } else if (dots.length > 1) {
    let { x, y } = dots[dots.length - 1];
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

const handleOrinationChange = (event) => {

  const data = {
    alpha: Number.parseFloat(event.alpha).toFixed(5),
    beta: Number.parseFloat(event.beta).toFixed(5),
  }

  ws.send(JSON.stringify({x: data.alpha, y: data.beta}))  ;

}

const handleMobileClick = (event) => {
  ws.send(JSON.stringify({type: 'setdot'}));
}


document.addEventListener('DOMContentLoaded', main);
