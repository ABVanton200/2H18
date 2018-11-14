const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const bodyParser = require('body-parser');
const path = require('path');

const PORT = '3336';
const clients = [];

server.listen(PORT);

io.on('connection', ws => { 
  ws
    .on('event', message => {      
      io.emit('event', message) 
    })
    .on('disconnect', ()=> {
      console.log('Disconnected');
    });
});

app  
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({extended: true}))

  .get(['/', '/index.html'], r => {
    r.res.sendFile(path.resolve(__dirname, 'index.html'));
  })

  .use(r => r.res.status(404).end('Still not here, sorry!'))
  .use((e, r, res, n) => res.status(500).end(`Error: ${e}`));
