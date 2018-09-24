require('should');
const { get } = require('axios');

const headers = {'Content-type': 'application/json'};
const URL = `http://127.0.0.1:4321/`;


const num1 = Array.from({ length: 100 }, (v, k) => -25 + k * 0.5);
const num2 = Array.from({ length: 100 }, (v, k) => 10 + k);
const cases = [];

for (let i = 0; i < num1.length; i++) {
	cases.push({
		op: "add",
		num1: num1[i],
		num2: num2[i],
		expect: num1[i] + num2[i]
	});

	cases.push({
		op: "subtract",
		num1: num1[i],
		num2: num2[i],
		expect: num1[i] - num2[i]
	});

	cases.push({
		op: "multiply",
		num1: num1[i],
		num2: num2[i],
		expect: num1[i] * num2[i]
	});

	cases.push({
		op: "divide",
		num1: num1[i],
		num2: num2[i],
		expect: num1[i] / num2[i]
	});

	cases.push({
		op: "pow",
		num1: num1[i],
		num2: num2[i],
		expect: num1[i] ** num2[i]
	});
}

describe('async', ()=> {
	for (let test of cases) {
		it(`при операции ${test.op} над ${test.num1} и ${test.num2} должно быть ${test.expect}`, async () => {		
			let { data } = await get(URL + `${test.op}/${test.num1}/${test.num2}`, {headers});			
			data.should.equal(test.expect);
      	}).timeout(0);
	}	  
});



