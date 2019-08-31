const ws = new WebSocket('wss://acceleromate.herokuapp.com');
const json = document.querySelector('.json');

const main = () => {
  const isMobile = window.innerWidth < 960;

  if (isMobile && window.DeviceOrientationEvent) {

    window.addEventListener('deviceorientation', handleOrinationChange, true);

  } 
  
  if (!isMobile) {
    const dotEl = document.querySelector('.dot');

    console.log('started');
    ws.onmessage = (message) => {
      // let { x, y } = JSON.parse(message.data);
      // console.log({x, y});
      // json.innerHTML = JSON.stringify(message.data);
      console.log('data');
      drawDot(dotEl, {x: 100, y: 200});
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
