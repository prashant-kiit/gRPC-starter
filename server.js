import { loadPackageDefinition, Server, ServerCredentials } from "@grpc/grpc-js";
import { loadSync } from "@grpc/proto-loader";
import procedureMap from "./procedureMap.js";

const packageDefinition = loadSync("./todo.proto");
const grpcObject = loadPackageDefinition(packageDefinition);
const todoPackage = grpcObject.todoPackage;

const server = new Server();
server.addService(todoPackage.Todo.service, procedureMap);
server.bindAsync(
  "0.0.0.0:8080",
  ServerCredentials.createInsecure(),
  (err, port) => {
    if (err) throw err;
    console.log(`gRPC server running at http://0.0.0.0:${port}`);
  }
);
