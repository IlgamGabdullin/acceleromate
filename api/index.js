const path = require('path');
const express = require('express');
const http = require('http');
const app = express();
const WebSocket = require('ws');

const port = 3000;

const server = http.createServer(app);
const wss = new WebSocket.Server({server});

app.use(express.static(path.join(__dirname + '/../build')))

let clients = [];

const sendAll = (message) => {
  clients.forEach((client) => {
    client.send(message);
  })
}

wss.on('connection', (ws) => {

  clients.push(ws);

  ws.on('message', (message) => {
    sendAll(message);
  })

});

app.get('/index', (req, res) => {
  return res.sendFile( path.join(__dirname + '/../build/index.html'));
});

app.get('/', (req, res) => {
  return res.send('friend');
})

server.listen(process.env.PORT || port, () => console.log('started'));
