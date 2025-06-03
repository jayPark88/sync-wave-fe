import React, { useState } from "react";
import "../../styles/TodoItem.css";
import TodoModal from "./TodoModal";

function TodoItem({ todo, onToggleComplete, onDelete }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric"
    }).format(date);
  };

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
    // 삭제 버튼 클릭 시에는 모달을 열지 않음
    if (e.target.closest('.delete-button')) {
      return;
    }
    setIsModalOpen(true);
  };

  return (
    <>
      <div 
        className={`todo-item ${getStatusClass(todo.status)}`}
        onClick={handleClick}
        style={{ cursor: 'pointer' }}
      >
        <div className="todo-content">
          <div className={`todo-task ${todo.status === "COMPLETED" ? "completed" : ""}`}>
            {todo.task}
          </div>
          <div className="todo-dates">
            <span className="todo-date">
              <span className="date-label">시작일:</span>
              {formatDate(todo.startDate)}
            </span>
            <span className="todo-date">
              <span className="date-label">마감일:</span>
              {formatDate(todo.dueDate)}
            </span>
            <span className={`todo-status ${getStatusClass(todo.status)}`}>
              {getStatusText(todo.status)}
            </span>
          </div>
        </div>
        <div className="todo-actions">
          <button
            className="todo-button delete delete-button"
            onClick={() => onDelete(todo.id)}
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