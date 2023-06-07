const express = require("express");
const { Worker } = require("worker_threads");
const app = express();

app.get("/", (req, res) => {
	const startTime = Date.now();

	// Simulate a CPU-intensive operation that blocks the event loop
	while (Date.now() - startTime < 5000) {
		// Perform some CPU-intensive computation
	}

	res.send("Operation completed");
});

app.get("/worker", async (req, res) => {
	const worker = new Worker("./worker.js");

	// Data to be passed to the worker thread
	const data = "Hello, Worker Thread!";

	worker.on("message", (result) => {
		console.log(result); // Print the result received from the worker thread
		res.send("Processing completed");
		worker.terminate();
	});

	worker.on("error", (error) => {
		res.status(500).send("An error occurred");
		worker.terminate();
	});

	// Send data to the worker thread
	worker.postMessage(data);
});

app.listen(3000, () => {
	console.log("Listening on port 3000");
});
