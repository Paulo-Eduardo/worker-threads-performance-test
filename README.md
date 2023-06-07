# Worker Threads Performance Test

This project aims to demonstrate the performance improvement achieved by utilizing worker threads in Node.js when handling blocking operations. It compares the traditional approach of executing a blocking operation inside the handler with the usage of worker threads to offload the operation to a separate thread.

## Background

Node.js, being single-threaded, executes JavaScript code in a non-blocking manner using an event-driven, asynchronous model. However, certain operations, such as CPU-intensive computations or blocking I/O, can monopolize the event loop and negatively impact the responsiveness of the server.

## Traditional Approach

In the traditional approach, a blocking operation is performed directly within the handler, causing other requests to wait until the operation completes. This sequential processing limits the number of requests that can be handled within a given timeframe.

To simulate this scenario, the project includes an endpoint that executes a blocking operation using a while loop. Multiple requests to this endpoint will be processed one by one, with each request waiting for the previous one to complete.

## Utilizing Worker Threads

To overcome the limitations of the traditional approach, this project leverages worker threads, which enable concurrent execution of tasks in separate threads, allowing parallel processing of multiple requests.

The project includes a separate file called `worker.js`, which is executed in a worker thread. This file contains a CPU-intensive loop that simulates a blocking operation. The main thread offloads the processing of requests to worker threads, allowing them to execute the blocking operation concurrently.

## Setup and Testing

To run the project and test the performance difference, follow these steps:

1. Clone the repository:

```
git clone https://github.com/Paulo-Eduardo/worker-threads-performance-test.git
```

2. Navigate to the project directory:

```
cd worker-threads-performance-test
```

3. Build project on docker:

```
docker build -t worker-threads-performance-test .
```

4. Start the project on port 3000 running only on one core

```
docker run --cpuset-cpus="0" -p 3000:3000 worker-threads-performance-test
```

## Test

To test it you can use apache benchmark like this:

```
ab -n 10 -c 10 http://localhost:3000/
```

This command will send 10 requests concurrently to the endpoint that executes the blocking operation directly inside the handler.

6. Open another terminal and test the approach using worker threads:

```
ab -n 10 -c 10 http://localhost:3000/worker
```

This command will send 10 requests concurrently to the endpoint that offloads the blocking operation to a worker thread.

## Conclusion

The utilization of worker threads in Node.js allows for parallel processing of requests and efficient handling of blocking operations. By offloading the blocking operations to separate threads, the application can achieve higher concurrency and better performance compared to executing the operations directly in the main thread. This approach enables the server to handle more requests within a given timeframe and improve overall responsiveness.
