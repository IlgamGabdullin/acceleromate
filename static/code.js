const ws = new WebSocket('wss://acceleromate.herokuapp.com');
const json = document.querySelector('.json');

const main = () => {
  const isMobile = window.innerWidth < 960;

  if (isMobile && window.DeviceOrientationEvent) {

    window.addEventListener('deviceorientation', handleOrinationChange, true);

  } 
  
  if (!isMobile) {
    const dotEl = document.querySelector('.dot');

    ws.onmessage = (message) => {
      let { x, y } = JSON.parse(message.data);
      json.innerHTML = message.data;
      drawDot(dotEl, {x, y});
    }
  }
}

const drawDot = (el, {x,y}) => {
  el.style.transform = `translate(${-x}px, ${-y}px)`
}

const handleOrinationChange = (event) => {

  const data = {
    alpha: Number.parseFloat(event.alpha).toFixed(),
    beta: Number.parseFloat(event.beta).toFixed(),
  }

  ws.send(JSON.stringify({x: data.alpha, y: data.beta}))  ;

}

document.addEventListener('DOMContentLoaded', main);
