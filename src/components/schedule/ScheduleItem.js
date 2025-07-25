import React, { useState } from 'react';
import { format, isAfter, isBefore } from 'date-fns';
import { ko } from 'date-fns/locale';
import '../../styles/ScheduleItem.css';

const ScheduleItem = ({ schedule, onEdit, onDelete }) => {
  const [showActions, setShowActions] = useState(false);

  const formatDateTime = (dateString) => {
    return format(new Date(dateString), 'M월 d일 HH:mm', { locale: ko });
  };

  const getScheduleStatus = (schedule) => {
    const now = new Date();
    const endDate = new Date(schedule.endDateTime);
    
    if (isAfter(now, endDate)) {
      return 'expired';
    }
    return 'ongoing';
  };

  const getProgressPercentage = (schedule) => {
    const now = new Date();
    const startDate = new Date(schedule.startDateTime);
    const endDate = new Date(schedule.endDateTime);
    
    if (isBefore(now, startDate)) return 0;
    if (isAfter(now, endDate)) return 100;
    
    const total = endDate - startDate;
    const current = now - startDate;
    return Math.min(Math.max((current / total) * 100, 0), 100);
  };

  const handleEdit = () => {
    setShowActions(false);
    onEdit(schedule);
  };

  const handleDelete = () => {
    if (window.confirm('정말로 이 일정을 삭제하시겠습니까?')) {
      onDelete(schedule.id);
    }
    setShowActions(false);
  };

  const status = getScheduleStatus(schedule);
  const progressPercentage = getProgressPercentage(schedule);

  return (
    <div className={`schedule-item ${status}`}>
      <div className="schedule-header">
        <div className="schedule-title-section">
          <h3>{schedule.title}</h3>
          <span className={`schedule-status ${status}`}>
            {status === 'ongoing' ? '진행 중' : '만료됨'}
          </span>
        </div>
        
        <div className="schedule-actions">
          <button
            className="action-button"
            onClick={() => setShowActions(!showActions)}
            title="더보기"
          >
            ⋯
          </button>
          
          {showActions && (
            <div className="action-menu">
              <button 
                className="action-menu-item edit"
                onClick={handleEdit}
              >
                ✏️ 수정
              </button>
              <button 
                className="action-menu-item delete"
                onClick={handleDelete}
              >
                🗑️ 삭제
              </button>
            </div>
          )}
        </div>
      </div>

      <span className="schedule-date">
        {formatDateTime(schedule.startDateTime)} ~ {formatDateTime(schedule.endDateTime)}
      </span>
      
      <p className="schedule-description">{schedule.description}</p>
      
      <div className="schedule-progress">
        <div className="progress-bar">
          <div 
            className="progress" 
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <span className="progress-text">
          {Math.round(progressPercentage)}%
        </span>
      </div>
    </div>
  );
};

export default ScheduleItem; 