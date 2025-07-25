import { credentials, loadPackageDefinition } from "@grpc/grpc-js";
import { loadSync } from "@grpc/proto-loader";

const packageDefinition = loadSync("./todo.proto");
const grpcObject = loadPackageDefinition(packageDefinition);
const todoPackage = grpcObject.todoPackage;

const client = new todoPackage.Todo(
  "localhost:8080",
  credentials.createInsecure()
);

const cmd = process.argv[2];
if (cmd === "create") {
  const text = process.argv[3];
  client.createTodo({ text: text }, (err, todo) => {
    if (err) return console.error(err);
    console.log("Created:", todo);
  });
}

if (cmd === "read") {
  //   client.readTodos({}, (err, data) => {
  //     console.log("All Todos:", data.todos);
  //   });
  const call = client.readTodos({});

  call.on("data", (todo) => {
    console.log("Received todo:", todo);
  });

  call.on("end", () => {
    console.log("Stream ended");
  });

  call.on("error", (err) => {
    console.error("Stream error:", err.message);
  });
}

if (cmd === "delete") {
  const id = process.argv[3];
  client.deleteTodoById({ id: id }, (err, _) => {
    if (err) return console.error(err);
    console.log("Deleted Todo");
  });
}

if (cmd === "update") {
  const id = process.argv[3];
  const text = process.argv[4];
  client.updateTodoById({ id: id, text: text }, (err, todo) => {
    if (err) return console.error(err);
    console.log("Updated:", todo);
  });
}

if (cmd === "swrite") {
  const call = client.StreamTodos((err, summary) => {
    if (err) return console.error(err);
    console.log("Summary:", summary);
  });

  call.write({ id: 1, text: "Do laundry" });
  call.write({ id: 2, text: "Buy groceries" });
  call.write({ id: 3, text: "Clean room" });

  call.end();
}
