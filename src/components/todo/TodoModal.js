import React, { useState } from 'react';
import '../../styles/TodoModal.css';

function TodoModal({ todo, onClose, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTodo, setEditedTodo] = useState(todo);

  if (!todo) return null;

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

  const isEditableStatus = ["PENDING", "IN_PROGRESS"].includes(todo.status);

  const handleSave = () => {
    onUpdate(editedTodo);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      onDelete(todo.id);
      onClose();
    }
  };

  const getStatusOptions = () => {
    if (["PENDING", "IN_PROGRESS"].includes(todo.status)) {
      return [
        { value: todo.status, label: getStatusText(todo.status) },
        { value: "CANCELLED", label: "취소" }
      ];
    }

    return [
      { value: todo.status, label: getStatusText(todo.status) }
    ];
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>할 일 상세</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          <div className="detail-item">
            <span className="detail-label">상태</span>
            {isEditing && isEditableStatus ? (
              <select
                className="status-select"
                value={editedTodo.status}
                onChange={(e) => setEditedTodo({ ...editedTodo, status: e.target.value })}
              >
                {getStatusOptions().map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : (
              <span className={`status-badge ${getStatusClass(todo.status)}`}>
                {getStatusText(todo.status)}
              </span>
            )}
          </div>
          <div className="detail-item">
            <span className="detail-label">할 일</span>
            {isEditing ? (
              <input
                type="text"
                className="edit-input"
                value={editedTodo.task}
                onChange={(e) => setEditedTodo({ ...editedTodo, task: e.target.value })}
              />
            ) : (
              <span className="detail-value">{todo.task}</span>
            )}
          </div>
          <div className="detail-item">
            <span className="detail-label">생성일</span>
            <span className="detail-value">
              {formatDate(todo.createdAt)}
            </span>
          </div>
          {todo.updatedAt && (
            <div className="detail-item">
              <span className="detail-label">수정일</span>
              <span className="detail-value">
                {formatDate(todo.updatedAt)}
              </span>
            </div>
          )}
          <div className="modal-actions">
            {isEditableStatus && !isEditing && (
              <button 
                className="modal-button edit"
                onClick={() => setIsEditing(true)}
              >
                수정
              </button>
            )}
            {isEditing && (
              <>
                <button 
                  className="modal-button save"
                  onClick={handleSave}
                >
                  저장
                </button>
                <button 
                  className="modal-button cancel"
                  onClick={() => {
                    setIsEditing(false);
                    setEditedTodo(todo);
                  }}
                >
                  취소
                </button>
              </>
            )}
            <button 
              className="modal-button delete"
              onClick={handleDelete}
              disabled={todo.status === "COMPLETED" || todo.status === "CANCELLED"}
            >
              삭제
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TodoModal; 