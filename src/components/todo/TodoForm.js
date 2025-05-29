import React, { useState } from "react";
import "../../styles/TodoForm.css"; // CSS 파일 추가

function TodoForm({ onSubmit, initial = {} }) {
  const [task, setTask] = useState(initial.task || "");
  const [startDate, setStartDate] = useState(initial.startDate || "");
  const [dueDate, setDueDate] = useState(initial.dueDate || "");

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({
      id: initial.id || null,
      task,
      startDate,
      dueDate,
      status: initial.status || "PENDING"
    });
    if (!initial.id) {
      setTask("");
      setStartDate("");
      setDueDate("");
    }
  }

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="todo-input todo-input--text"
        placeholder="할 일 입력"
        value={task}
        onChange={e => setTask(e.target.value)}
        required
      />
      <input
        type="date"
        className="todo-input todo-input--date"
        value={startDate}
        onChange={e => setStartDate(e.target.value)}
        required
      />
      <input
        type="date"
        className="todo-input todo-input--date"
        value={dueDate}
        onChange={e => setDueDate(e.target.value)}
        required
      />
      <button type="submit" className="todo-button">
        {initial.id ? "저장" : "추가"}
      </button>
    </form>
  );
}

export default TodoForm;
