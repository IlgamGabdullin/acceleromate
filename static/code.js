const ws = new WebSocket('wss://acceleromate.herokuapp.com');
const json = document.querySelector('.json');

const main = () => {

  if (window.DeviceOrientationEvent) {

    window.addEventListener('deviceorientation', handleOrinationChange, true);

  } else {
    const dotEl = document.querySelector('.dot');

    ws.onmessage = (message) => {
      let { x, y } = JSON.parse(message.data);
      json.innerHTML = JSON.stringify(data);
      drawDot(dotEl, {x, y});
    }
  }
}

const drawDot = (el, {x,y}) => {
  el.style.transform = `translate(${x}px, ${y}px)`
}

const handleOrinationChange = (event) => {

  const data = {
    alpha: Number.parseFloat(event.alpha).toFixed(2),
    beta: Number.parseFloat(event.beta).toFixed(2),
    gamma: Number.parseFloat(event.gamma).toFixed(2),
  }

  ws.send(JSON.stringify({x: data.alpha, y: data.beta}))  ;

}

document.addEventListener('DOMContentLoaded', main);
