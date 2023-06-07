// worker.js (Separate file to be executed in the worker thread)
// Simulating a CPU-intensive operation in a loop
const startTime = Date.now();
while (Date.now() - startTime < 5000) {
	// Perform some CPU-intensive computation
}

const result = "Task completed";
postMessage(result);
