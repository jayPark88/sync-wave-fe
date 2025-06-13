import React, { useState } from "react";
import "../../styles/TodoItem.css";
import TodoModal from "./TodoModal";

function TodoItem({ todo, onToggleComplete, onDelete }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getStatusText = (status) => {
    switch (status) {
      case "PENDING": return "대기 중";
      case "IN_PROGRESS": return "진행 중";
      case "COMPLETED": return "완료";
      case "CANCELLED": return "취소";
      default: return status;
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "COMPLETED": return "status-completed";
      case "IN_PROGRESS": return "status-in-progress";
      case "CANCELLED": return "status-cancelled";
      default: return "status-pending";
    }
  };

  const handleClick = (e) => {
    // 체크박스나 삭제 버튼 클릭 시에는 모달을 열지 않음
    if (e.target.closest('.checkbox-wrapper') || e.target.closest('.delete-button')) {
      return;
    }
    setIsModalOpen(true);
  };

  const handleCheckboxClick = (e) => {
    e.stopPropagation();
    // 취소 상태나 완료 상태에서는 체크박스 클릭 불가
    if (todo.status === "CANCELLED" || todo.status === "COMPLETED") {
      return;
    }

    if (window.confirm("이 할 일을 완료 처리하시겠습니까?")) {
      onToggleComplete({
        ...todo,
        status: "COMPLETED"
      });
    }
  };

  return (
    <>
      <div 
        className={`todo-item ${getStatusClass(todo.status)}`}
        onClick={handleClick}
        style={{ cursor: 'pointer' }}
      >
        <div className="checkbox-wrapper" onClick={handleCheckboxClick}>
          <input
            type="checkbox"
            className="todo-checkbox"
            checked={todo.status === "COMPLETED"}
            disabled={todo.status === "CANCELLED" || todo.status === "COMPLETED"}
            readOnly
          />
        </div>
        <div className="todo-content">
          <div className={`todo-task ${todo.status === "COMPLETED" ? "completed" : ""}`}>
            {todo.task}
          </div>
          <div className="todo-dates">
            <span className={`todo-status ${getStatusClass(todo.status)}`}>
              {getStatusText(todo.status)}
            </span>
          </div>
        </div>
        <div className="todo-actions">
          <button
            className="todo-button delete delete-button"
            onClick={() => onDelete(todo.id)}
            disabled={todo.status === "COMPLETED" || todo.status === "CANCELLED"}
          >
            삭제
          </button>
        </div>
      </div>
      {isModalOpen && (
        <TodoModal
          todo={todo}
          onClose={() => setIsModalOpen(false)}
          onUpdate={onToggleComplete}
          onDelete={onDelete}
        />
      )}
    </>
  );
}

export default TodoItem;