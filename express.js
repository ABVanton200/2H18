const express = require('express');
const app = express();
const PORT = 4321;
const bp = require("body-parser");

app
	.use(bp.json())
	.use(bp.urlencoded({extended: true}))
	
	.use((r, res, next) => console.log('console') || next())
	.get('/', (req, res) => {
		res.send('Hello World');
	})
	.get('/fuckup', (req, res) => {
		throw new Error('err');
	})
	.use((req, res) => {
		res.status(404).set({"Content-type": "text/html; charset=utf-8"}).send("нета")
	})
	.use((req, res) => {
		res.status(500).set({"Content-type": "text/html; charset=utf-8"}).send("error")
	})
	
	.listen(process.env.PORT || PORT);