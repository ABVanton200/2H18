const Timer = require('timerpromise');
const { performance } = require('perf_hooks');

const t1 = performance.now();

(async () => {
	await (new Timer(3)).start;
	const t2 = performance.now();	
	
	await (new Timer(2)).start;
	const t3 = performance.now();
	
	console.log(`full time: ${(t3-t1)/1000}s`);
	console.log(`first timer: ${(t2-t1)/1000}s`);
	console.log(`second timer: ${(t3-t2)/1000}s`);
})();

