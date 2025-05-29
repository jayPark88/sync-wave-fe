// src/api/todosApi.js
import axiosInstance from "../util/axiosInstance";

function fetchTodos() {
  return axiosInstance.get("/v1/todos");
}

function fetchTodoById(id) {
  return axiosInstance.get("/v1/todos/" + id);
}

function createTodo(payload) {
  return axiosInstance.post("/v1/todos", payload);
}

function updateTodo(payload) {
  return axiosInstance.patch("/v1/todos", payload);
}

function deleteTodo(id) {
  return axiosInstance.delete("/v1/todos/" + id);
}

export {
  fetchTodos,
  fetchTodoById,
  createTodo,
  updateTodo,
  deleteTodo
};
