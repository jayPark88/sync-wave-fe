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
import "../styles/TodoList.css";

function TodoListPage() {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState("");
  const { setIsLoading } = useLoading();
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadTodos();
  }, [setIsLoading]);

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

  async function handleAdd(dto) {
    setIsLoading(true);
    try {
      await createTodo({ ...dto, status: "PENDING" });
      await loadTodos();
    } finally {
      setIsLoading(false);
    }
  }

  async function handleToggle(updated) {
    setIsLoading(true);
    try {
      await updateTodo(updated);
      await loadTodos();
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDelete(id) {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      setIsLoading(true);
      try {
        await deleteTodo(id);
        await loadTodos();
      } finally {
        setIsLoading(false);
      }
    }
  }

  const filteredTodos = todos
    .filter(todo => {
      if (filter === "completed") return todo.status === "COMPLETED";
      if (filter === "inProgress") return todo.status === "IN_PROGRESS";
      if (filter === "cancelled") return todo.status === "CANCELLED";
      if (filter === "pending") return todo.status === "PENDING";
      return true;
    })
    .filter(todo =>
      todo.task.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="todo-page">
      <div className="todo-header">
        <h2 className="todo-title">할 일 목록</h2>
        {error && <p className="error-message">{error}</p>}
      </div>

      <TodoForm onSubmit={handleAdd} />

      <div className="todo-controls">
        <div className="search-bar">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="search-input"
            placeholder="할 일 검색..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <button
            className={`filter-button ${filter === "all" ? "active" : ""}`}
            onClick={() => setFilter("all")}
          >
            전체
          </button>
          <button
            className={`filter-button ${filter === "pending" ? "active" : ""}`}
            onClick={() => setFilter("pending")}
          >
            대기 중
          </button>
          <button
            className={`filter-button ${filter === "inProgress" ? "active" : ""}`}
            onClick={() => setFilter("inProgress")}
          >
            진행 중
          </button>
          <button
            className={`filter-button ${filter === "completed" ? "active" : ""}`}
            onClick={() => setFilter("completed")}
          >
            완료
          </button>
          <button
            className={`filter-button ${filter === "cancelled" ? "active" : ""}`}
            onClick={() => setFilter("cancelled")}
          >
            취소
          </button>
        </div>
      </div>

      <div className="todo-list">
        {filteredTodos.length > 0 ? (
          filteredTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggleComplete={handleToggle}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon">📝</div>
            <p className="empty-state-text">할 일이 없습니다</p>
            <p className="empty-state-subtext">
              새로운 할 일을 추가해보세요!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default TodoListPage;
