import React, { useState } from "react";
import "../../styles/TodoForm.css"; // CSS 파일 추가

function TodoForm({ onSubmit, initial = {} }) {
  const [task, setTask] = useState(initial.task || "");

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({
      id: initial.id || null,
      task,
      status: initial.status || "PENDING"
    });
    if (!initial.id) {
      setTask("");
    }
  }

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="todo-input todo-input--text"
        placeholder="새로운 할 일을 입력하세요"
        value={task}
        onChange={e => setTask(e.target.value)}
        required
      />
      <button type="submit" className="todo-button">
        {initial.id ? "저장" : "추가"}
      </button>
    </form>
  );
}

export default TodoForm;
