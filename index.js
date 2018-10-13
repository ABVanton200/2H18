const express = require('express');
const { get } = require('axios');
const User = require("./index2.js");
const bodyParser = require('body-parser');

const PORT = 4321;
const app = express();

app  
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({extended: true}))
  .get(/users/, async r => {
    const data = await getPass();
    r.res.render('list', { title: 'Список логинов', data });
  })
  .post(/add/, async r => {
	  const { login, password } = r.body;	  
	  const res = await addUser({ login, password });
	  r.res.end(res ? "Success" : "Error");
  })
  .use(r => r.res.status(404).end('Still not here, sorry!'))
  .use((e, r, res, n) => res.status(500).end(`Error: ${e}`))
  .set('view engine', 'pug')
  .listen(process.env.PORT || PORT, () => console.log(process.pid));



async function getPass() {
	const data = await User.find().exec();
	
	return data;
}

async function addUser(data) {
	await User.create(data, err => {
		return 0;
	});	
	return 1;
}
