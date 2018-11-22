// Anton Babakhin
const fs = require('fs'),
  key = fs.readFileSync('./data/key'),
  secret = fs.readFileSync('./data/secret');
  
console.log(String(require('crypto').publicDecrypt(key, secret)));