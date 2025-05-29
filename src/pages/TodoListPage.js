// src/pages/TodoListPage.js
import React, { useEffect, useState } from "react";
import {
  fetchTodos,
  createTodo,
  updateTodo,
  deleteTodo
} from "../api/todosApi";
import TodoForm from "../components/todo/TodoForm";
import TodoItem from "../components/todo/TodoItem";
import { useLoading } from "../contexts/LoadingContext";

function TodoListPage() {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState("");
  const { setIsLoading } = useLoading();

  useEffect(() => {
    async function loadTodos() {
      setError("");
      setIsLoading(true);
      try {
        const res = await fetchTodos();
        setTodos(res.data.data);
      } catch (err) {
        console.error("목록 로드 오류:", err);
        setError("목록을 불러오지 못했습니다.");
      } finally {
        setIsLoading(false);
      }
    }
    loadTodos();
  }, [setIsLoading]); // 이제 의존성 배열이 올바르게 선언됨

  async function handleAdd(dto) {
    setIsLoading(true);
    try {
      await createTodo({ ...dto, status: "PENDING", userId: 1 });
      await (async () => {
        const res = await fetchTodos();
        setTodos(res.data.data);
      })();
    } finally {
      setIsLoading(false);
    }
  }

  async function handleToggle(updated) {
    setIsLoading(true);
    try {
      await updateTodo(updated);
      const res = await fetchTodos();
      setTodos(res.data.data);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDelete(id) {
    setIsLoading(true);
    try {
      await deleteTodo(id);
      const res = await fetchTodos();
      setTodos(res.data.data);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 16 }}>
      <h2>할 일 목록</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <TodoForm onSubmit={handleAdd} />
      <div>
        {todos.map((t) => (
          <TodoItem
            key={t.id}
            todo={t}
            onToggleComplete={handleToggle}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default TodoListPage;
