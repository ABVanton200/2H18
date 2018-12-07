const http = require('http');

const URL = 'http://kodaktor.ru/api2/buffer2/';

const pget = (url) => {
  return new Promise((res, rej) => {
    http.get(url, (rdStr, buf = '', V2 = 0) => {
      rdStr.on('data', d => {
        if(String(d).search('cats') !== -1) {
          V2 = buf.length;
        }
        buf+=d;            
      });
      rdStr.on('end', () => {
        console.log("length = " + buf.length);
        res({
          length: buf.length,
          V2
        })
      });
    })
  })
}

for(let i = 333; i <= 33333; i++) {
  (async () => {
    const res = await pget(URL + i);
    console.log("i = " + i + "\nlength = " + res.length + "\nV2 = " + res.V2);
  })();
}

// V1 = 65536
// V2 = 917504