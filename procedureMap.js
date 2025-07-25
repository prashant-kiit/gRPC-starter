import {
  createTodo,
  deleteTodoById,
  readTodoById,
  readTodos,
  updateTodoById,
  streamTodos,
} from "./procedure.js";

const procedureMap = {
  createTodo: createTodo,
  updateTodoById: updateTodoById,
  readTodos: readTodos,
  readTodoById: readTodoById,
  deleteTodoById: deleteTodoById,
  streamTodos: streamTodos,
};

export default procedureMap;
