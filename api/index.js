const path = require('path');
const express = require('express');
const http = require('http');
const app = express();
const WebSocket = require('ws');

const port = 3000;

const server = http.createServer(app);
const wss = new WebSocket.Server({server});

app.use(express.static(path.join(__dirname + '/../static')))


wss.on('connection', (ws) => {

  ws.on('message', (message) => {
    console.log(message);
    ws.send(message);
  })

});


app.get('/index', (req, res) => {
  return res.sendFile( path.join(__dirname + '/../index.html'));
});

app.get('/', (req, res) => {
  return res.send('friend');
})

server.listen(process.env.PORT || port, () => console.log('started'));
