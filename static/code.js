const ws = new WebSocket('wss://acceleromate.herokuapp.com');
const json = document.querySelector('.json');

const position = {
  x: 0,
  y: 0
}

const main = () => {
  const isMobile = window.innerWidth < 960;

  if (isMobile && window.DeviceOrientationEvent) {

    window.addEventListener('deviceorientation', handleOrinationChange, true);

  } 
  
  if (!isMobile) {
    const dotEl = document.querySelector('.dot');
    let lastPosition = null;

    ws.onmessage = (message) => {
      let { x, y } = JSON.parse(message.data);

      if (lastPosition) {
        let { lastX, lastY } = lastPosition;

        if (lastX  < x) {
          position.x--
        } else {
          position.x++;
        }

        if (lastY < y) {
          position.y++;
        } else {
          position.y--;
        }

        json.innerHTML = message.data;
        drawDot(dotEl, {x: position.x, y: position.y});
      } else {
        lastPosition = {lastX: x, lastY: y};
      }
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
