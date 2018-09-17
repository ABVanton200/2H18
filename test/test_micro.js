require('should');
const { get } = require('axios');

const headers = {'Content-type': 'application/json'};
const URL1 = `https://kodaktor.ru/api2/there/`;
const URL2 = `https://kodaktor.ru/api2/andba/`;
const DIFF = 1e-5;

const positive = Array.from({ length: 100 }, (v, k) => -0.6666 + k * 0.3);
const negative = Array.from({ length: 100 }, (v, k) => -0.6667 + k * -0.3);
const cases = [];


for (let num of positive) {
	cases.push({
		num,
		expect: num
	})
}

for (let num of negative) {
	cases.push({
		num,
		expect: Math.abs(num) - 1 - (1/3)
	})
}

describe('async', ()=> {
	for (let test of cases) {
		it(`при подаче ${test.num} должно быть ${test.expect}`, async () => {		
			let { data } = await get(URL1 + test.num, {headers});
			({ data } = await get(URL2 + data, {headers}));
			const delta = Math.abs(data - test.expect);
			console.log(data);
			console.log(delta);
			delta.should.be.below(DIFF);
      	}).timeout(0);
	}	  
});


/* describe('addition', ()=> {
	for(let i = -1; i > -540; i-= 1){		
		it(`при подаче ${i} должно быть ${Math.abs(i) - 1 - (1/3)}`, async () => {	
			//const expect = Math.abs(i) - 1 - (1/3);
			let { data } = await get(URL1 + i, {headers});
			({ data } = await get(URL2 + data, {headers}));
			console.log(data);
			data.should.equal(Math.abs(i) - 1 - (1/3));
      	}).timeout(0);
	}	  
}); */


