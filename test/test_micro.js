require('should');
const { get } = require('axios');

const headers = {'Content-type': 'application/json'};
const URL = `http://127.0.0.1:4321/add/`;


const summand1 = Array.from({ length: 100 }, (v, k) => -25 + k * 0.5);
const summand2 = Array.from({ length: 100 }, (v, k) => 10 + k);
const cases = [];

for (let i = 0; i < summand1.length; i++) {
	cases.push({
		num1: summand1[i],
		num2: summand2[i],
		expect: summand1[i] + summand2[i]
	})
}

describe('async', ()=> {
	for (let test of cases) {
		it(`при подаче ${test.num1} и ${test.num2} должно быть ${test.expect}`, async () => {		
			let { data: {"Сумма": d} } = await get(URL + `${test.num1}/${test.num2}`, {headers});			
			d.should.equal(test.expect);
      	}).timeout(0);
	}	  
});



