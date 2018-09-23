const express = require('express');
const bodyParser = require("body-parser");
const mathJS = require('mathjs');
const { get } = require('axios');

const PORT = 4321;
const headers = {'Content-type': 'application/json'};
const app = express();
const stat = {};

const options = {
	dotfiles: 'ignore',
	etag: false,
	extensions: ['jpg', 'jpeg'],
	index: false,
	maxAge: '1d',
	redirect: false,
	setHeaders: function (res, path, stat) {
	  res.set('x-timestamp', Date.now())
	}
};

app
	.use(bodyParser.json())
	.use(bodyParser.urlencoded({extended: true}))

	// подсчёт посещений
	.use((req, res, next) => {
		const page = req.path.substr(1).split('/')[0] || "/";		
		stat[page] = ~~stat[page] + 1;
		next();
	})

	// обслуживание статичных файлов
	.use(express.static('public', options))
	
	// извлечение данных из post-запроса
	.post('/post', (req, res) => {
		const responseData = { name: req.body.name || "" };		
		res.json(responseData);
	})

	// калькулятор
	.get('/add/:num1/:num2', (req, res) => {
		res.end(String(parseFloat(req.params.num1) + parseFloat(req.params.num2)));
	})

	.get('/subtract/:num1/:num2', (req, res) => {
		res.end(String(parseFloat(req.params.num1) - parseFloat(req.params.num2)));
	})

	.get('/multiply/:num1/:num2', (req, res) => {
		res.end(String(parseFloat(req.params.num1) * parseFloat(req.params.num2)));
	})

	.get('/divide/:num1/:num2', (req, res) => {
		res.set({"Content-Type": "text/html; charset=utf-8"});
		res.end(String(req.params.num2 != 0 ? parseFloat(req.params.num1) / parseFloat(req.params.num2) : "Делить на ноль не следует!"));
	})

	.get('/pow/:num1/:num2', (req, res) => {
		res.end(String(parseFloat(req.params.num1) ** parseFloat(req.params.num2)));
	})

	.get('/kramer/:a1/:b1/:c1/:a2/:b2/:c2', (req, res) => {
		const {a1, b1, c1, a2, b2, c2} = req.params;
		const det = mathJS.eval(`det([${a1}, ${b1}; ${a2}, ${b2}])`);
		const x = mathJS.eval(`det([${c1}, ${b1}; ${c2}, ${b2}])`) / det;
		const y = mathJS.eval(`det([${a1}, ${c1}; ${a2}, ${c2}])`) / det;
		res.json({x, y});
	})

	// выдача статистики
	.get('/stat', (req, res) => {
		res.json(stat);
	})

	// there
	.get('/there/:num', (req, res) => {
		(async () => {
			const { data } = await get("https://kodaktor.ru/api2/there/" + req.params.num, {headers});		
			res.end(String(data));
		})()
	})

	// andba
	.get('/andba/:num', (req, res) => {
		(async () => {
			const { data } = await get("https://kodaktor.ru/api2/andba/" + req.params.num, {headers});		
			res.end(String(data));
		})()		
	})

	
	.listen(process.env.PORT || PORT);