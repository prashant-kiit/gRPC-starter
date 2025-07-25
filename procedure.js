let todos = [];

export function createTodo(call, callback) {
  const todo = { id: todos.length + 1, text: call.request.text };
  todos.push(todo);
  callback(null, todo);
}

export function updateTodoById(call, callback) {
  const { id, text } = call.request;
  const todo = todos.find((t) => t.id === id);
  if (!todo) return callback(new Error("Todo not found"));
  todo.text = text;
  callback(null, todo);
}

export function readTodos(call, callback) {
  todos.forEach((todo) => {
    call.write(todo);
  });
  call.end();
  //   todos.forEach((todo, index) => {
  //     setTimeout(() => {
  //       call.write(todo);
  //       if (index === todos.length - 1) call.end();
  //     }, index * 1000);
  //   });
}

export function readTodoById(call, callback) {
  const todo = todos.find((t) => t.id === call.request.id);
  if (!todo) return callback(new Error("Todo not found"));
  callback(null, todo);
}

export function deleteTodoById(call, callback) {
  const index = todos.findIndex((t) => t.id === call.request.id);
  if (index === -1) return callback(new Error("Todo not found"));
  todos.splice(index, 1);
  callback(null, null);
}

export function streamTodos(call, callback) {
  let count = 0;

  call.on("data", (todo) => {
    console.log("Received:", todo);
    count++;
  });

  call.on("end", () => {
    callback(null, { total: count });
  });

  call.on("error", (err) => {
    callback(new Error(JSON.stringify(err)));
  });
}
