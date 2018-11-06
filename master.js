const child_process = require('child_process');

let p;

require('http')
  .Server((r, rs) => {
	  let workerProcess = child_process.spawn('node', ['slave.js']);
	  workerProcess.on('close', code => {
      console.log('child process exited with code ' + code);
    });	
    
	  rs.end("My pid = " + p);
	
  }).listen(3336, () => {
    p = process.pid;
  });
