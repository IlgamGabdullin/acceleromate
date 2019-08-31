const path = require('path');
const express = require('express');
const http = require('http');
const app = express();
const WebSocket = require('ws');

const port = 3000;

const server = http.createServer(app);
const wss = new WebSocket.Server({server});

app.use(express.static(path.join(__dirname + '/../static')))

const clients = [];

wss.on('connection', (ws) => {

  clients.push(ws);
  console.log('new user joined');

  // setInterval(() => {
  //   console.log(`Number of clients: ${clients.length}`);
  // }, 2000);
  ws.on('message', (message) => {
    console.log(message);
  })

  ws.send('new user joined us');
});

wss.on('close', () => {
  console.log('disconected');
});


app.get('/index', (req, res) => {
  return res.sendFile( path.join(__dirname + '/../index.html'));
});

app.get('/', (req, res) => {
  return res.send('friend');
})

server.listen(process.env.PORT || 3000, () => console.log('started'));
