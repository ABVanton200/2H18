const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const key = fs.readFileSync(path.resolve(__dirname, './data/key'));
const script = fs.readFileSync(path.resolve(__dirname, 'index.js'));

// © Anton Babakhin

fs.writeFileSync(path.resolve(__dirname, './data/output'), crypto.publicEncrypt(key, script));
