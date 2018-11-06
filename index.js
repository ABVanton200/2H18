const fs = require('fs');

const Trans = require('./trans');

require('http')
  .Server((r, rs) => {
    const { url: u } = r;
    
    switch (u) {
      case '/':
      case '/index.html': {
        fs.createReadStream('./index.html').pipe(rs);
        break;
      }

      case '/zip': {        
        rs.writeHead(200, {});
        r.pipe(new Trans(r.headers)).pipe(require('zlib').createGzip()).pipe(rs);
        break;
      }
    }  
	
  }).listen(4321);
