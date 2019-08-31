const ws = new WebSocket('wss://acceleromate.herokuapp.com');
const json = document.querySelector('.json');


const speedIndex = window.innerWidth / 180 + 3;

const main = () => {
  const isMobile = window.innerWidth < 960;
  const dotEl = document.querySelector('.dot');

  if (isMobile && window.DeviceOrientationEvent) {

    dotEl.remove();
    window.addEventListener('deviceorientation', handleOrinationChange, true);

  } 
  
  if (!isMobile) {

    ws.onmessage = (message) => {
      let { x, y } = JSON.parse(message.data);

      drawDot(dotEl, {x: x - 180, y});
    }
  }
}

const drawDot = (el, {x,y}) => {
  el.style.transform = `translate(${x * -speedIndex}px, ${y * -speedIndex}px)`
}

const handleOrinationChange = (event) => {

  const data = {
    alpha: Number.parseFloat(event.alpha).toFixed(5),
    beta: Number.parseFloat(event.beta).toFixed(5),
  }

  ws.send(JSON.stringify({x: data.alpha, y: data.beta}))  ;

}

document.addEventListener('DOMContentLoaded', main);
