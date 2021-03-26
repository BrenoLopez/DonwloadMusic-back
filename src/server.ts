const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
import express from "express";
import routes from "./routes";
const app = express();

if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);
  
    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }
  
    cluster.on('exit', (worker:any, code:any, signal:any) => {
      console.log(`worker ${worker.process.pid} died`);
    });
  } 
  else {
    // Workers can share any TCP connection
    // In this case it is an HTTP server
    app.use(routes);
    app.listen(3333 || process.env.PORT, () => console.log("Server is running"));
    console.log(`Worker ${process.pid} started`);
  }
