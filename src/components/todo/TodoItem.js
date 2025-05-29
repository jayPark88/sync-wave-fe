import React from "react";
import { useNavigate } from "react-router-dom";

function TodoItem({ todo, onToggleComplete, onDelete }) {
  const navigate = useNavigate();
  const completed = todo.status === "COMPLETED";

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        padding: 8,
        borderBottom: "1px solid #eee"
      }}
    >
      <input
        type="checkbox"
        checked={completed}
        onChange={function() {
          onToggleComplete({
            ...todo,
            status: completed ? "PENDING" : "COMPLETED"
          });
        }}
      />
      <span
        style={{
          flex: 1,
          marginLeft: 8,
          textDecoration: completed ? "line-through" : "none"
        }}
      >
        {todo.task}
      </span>
      <small style={{ marginRight: 16 }}>
        기한: {todo.dueDate || "-"}
      </small>
      <button
        onClick={function() { navigate("/todos/" + todo.id); }}
        style={{ marginRight: 8, padding: "4px 8px" }}
      >
        상세
      </button>
      <button
        onClick={function() { onDelete(todo.id); }}
        style={{ padding: "4px 8px" }}
      >
        삭제
      </button>
    </div>
  );
}

export default TodoItem;