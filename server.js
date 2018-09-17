const http = require('http');
const moment = require('moment');
const url = require("url");

const server = http.createServer();
server.listen(4321);
server.on('request', (req, res) => {
    const pathname = url.parse(req.url).pathname.substr(1).split('/');
    let responseData;

    switch(pathname[0]) {
        case "add":
            responseData = {
                "Сумма": parseFloat(pathname[1]) + parseFloat(pathname[2])
            };
            break;
        default:
            responseData = {
                "date": moment().format('DD.MM.YYYY HH:mm:ss')
            }; 
    }    
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(JSON.stringify(responseData));
})