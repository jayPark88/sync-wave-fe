import React, { useState } from 'react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import '../../styles/NoticeItem.css';

const NoticeItem = ({ notice, onEdit, onDelete, onToggleStatus, isMaster }) => {
  const [showActions, setShowActions] = useState(false);

  const getPriorityLabel = (priority) => {
    switch (priority) {
      case 'HIGH':
        return { label: '높음', className: 'priority-high' };
      case 'MEDIUM':
        return { label: '보통', className: 'priority-medium' };
      case 'LOW':
        return { label: '낮음', className: 'priority-low' };
      default:
        return { label: '보통', className: 'priority-medium' };
    }
  };

  const getStatusLabel = (isActive) => {
    return isActive 
      ? { label: '활성', className: 'status-active' }
      : { label: '비활성', className: 'status-inactive' };
  };

  const priorityInfo = getPriorityLabel(notice.priority);
  const statusInfo = getStatusLabel(notice.isActive);

  const handleActionClick = (action) => {
    setShowActions(false);
    action();
  };

  return (
    <div className={`notice-item ${!notice.isActive ? 'inactive' : ''}`}>
      <div className="notice-header">
        <div className="notice-title-section">
          <h3 className="notice-title">{notice.title}</h3>
          <div className="notice-badges">
            <span className={`priority-badge ${priorityInfo.className}`}>
              {priorityInfo.label}
            </span>
            <span className={`status-badge ${statusInfo.className}`}>
              {statusInfo.label}
            </span>
          </div>
        </div>
        
        {isMaster && (
          <div className="notice-actions">
            <button
              className="action-button"
              onClick={() => setShowActions(!showActions)}
            >
              ⋯
            </button>
            
            {showActions && (
              <div className="action-menu">
                <button
                  className="action-menu-item"
                  onClick={() => handleActionClick(() => onEdit(notice))}
                >
                  수정
                </button>
                <button
                  className="action-menu-item"
                  onClick={() => handleActionClick(() => onToggleStatus(notice.id, !notice.isActive))}
                >
                  {notice.isActive ? '비활성화' : '활성화'}
                </button>
                <button
                  className="action-menu-item delete"
                  onClick={() => handleActionClick(() => onDelete(notice.id))}
                >
                  삭제
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="notice-content">
        <p className="notice-text">
          {notice.content.length > 200 
            ? `${notice.content.substring(0, 200)}...` 
            : notice.content
          }
        </p>
      </div>

      <div className="notice-footer">
        <div className="notice-meta">
          <span className="notice-author">작성자: {notice.createdBy}</span>
          <span className="notice-date">
            {format(new Date(notice.createdDateTime), 'yyyy년 M월 d일 HH:mm', { locale: ko })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default NoticeItem; 