let p;

require('http')
  .Server((r, rs) => {   
	  rs.end("My ppid = " + pp + "\nMy pid = " + p);
	
  }).listen(3337, () => {
    p = process.pid;
    pp = process.ppid;
  });
