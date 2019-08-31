const main = () => {
  if (window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation', handleOrinationChange, true);
  } else {
    renderData({info: 'Your device is not supported or another error happened'}, document.body);
  }
}

const handleOrinationChange = (event) => {
  const json = document.querySelector('.json');
  const data = {
    alpha: Number.parseFloat(event.alpha).toFixed(2),
    beta: Number.parseFloat(event.beta).toFixed(2),
    gamma: Number.parseFloat(event.gamma).toFixed(2),
  }

  renderData(data, json)
}

const renderData = (data, node) => {
  node.innerHTML = JSON.stringify(data);
}

document.addEventListener('DOMContentLoaded', main);


const ws = new WebSocket('wss://acceleromate.herokuapp.com');

ws.onopen = (res) => {
  // console.log('onopen', res);

  ws.send('Yo motherfucker');
}

ws.onmessage = (message) => {
  console.log('message', message);
}

// document.addEventListener('mousemove', (event) => {
//   const { x, y } = event;

//   ws.send(JSON.stringify({x, y}));
  
// });