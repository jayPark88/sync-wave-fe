import React, { useState, useEffect } from 'react';
import { format, isAfter, isBefore, isEqual } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useLoading } from '../contexts/LoadingContext';
import { DashboardService } from '../services/dashboard.service';
import '../styles/SchedulesPage.css';

function SchedulesPage() {
  const [schedules, setSchedules] = useState([]);
  const [activeTab, setActiveTab] = useState('ongoing');
  const { setIsLoading, isLoading } = useLoading();

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    try {
      setIsLoading(true);
      const today = format(new Date(), 'yyyy-MM-dd');
      const response = await DashboardService.getDashboardData(
        'jaypark8282@gmail.com',
        today
      );
      
      if (response.result) {
        setSchedules(response.data.schedulesDtoList);
      }
    } catch (error) {
      console.error('일정 목록 로딩 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };

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

  const filteredSchedules = schedules.filter(schedule => {
    if (activeTab === 'ongoing') {
      return getScheduleStatus(schedule) === 'ongoing';
    }
    return getScheduleStatus(schedule) === 'expired';
  });

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

  if (isLoading) {
    return (
      <div className="schedules-loading">
        <div className="loading-spinner"></div>
        <p>일정을 불러오는 중입니다...</p>
      </div>
    );
  }

  return (
    <div className="schedules-container">
      <div className="schedules-header">
        <h1>전체 일정</h1>
        <p className="current-date">
          {format(new Date(), 'yyyy년 M월 d일 EEEE', { locale: ko })}
        </p>
      </div>

      <div className="schedule-tabs">
        <button
          className={`tab-button ${activeTab === 'ongoing' ? 'active' : ''}`}
          onClick={() => setActiveTab('ongoing')}
        >
          진행 중인 일정
          <span className="tab-count">
            {schedules.filter(s => getScheduleStatus(s) === 'ongoing').length}
          </span>
        </button>
        <button
          className={`tab-button ${activeTab === 'expired' ? 'active' : ''}`}
          onClick={() => setActiveTab('expired')}
        >
          만료된 일정
          <span className="tab-count">
            {schedules.filter(s => getScheduleStatus(s) === 'expired').length}
          </span>
        </button>
      </div>

      <div className="schedules-list">
        {filteredSchedules.length > 0 ? (
          filteredSchedules.map((schedule) => (
            <div 
              key={schedule.id} 
              className={`schedule-item ${getScheduleStatus(schedule)}`}
            >
              <div className="schedule-header">
                <div className="schedule-title-section">
                  <h3>{schedule.title}</h3>
                  <span className={`schedule-status ${getScheduleStatus(schedule)}`}>
                    {getScheduleStatus(schedule) === 'ongoing' ? '진행 중' : '만료됨'}
                  </span>
                </div>
                <span className="schedule-date">
                  {formatDateTime(schedule.startDateTime)} ~ {formatDateTime(schedule.endDateTime)}
                </span>
              </div>
              <p className="schedule-description">{schedule.description}</p>
              <div className="schedule-progress">
                <div className="progress-bar">
                  <div 
                    className="progress" 
                    style={{ width: `${getProgressPercentage(schedule)}%` }}
                  />
                </div>
                <span className="progress-text">
                  {Math.round(getProgressPercentage(schedule))}%
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon">
              {activeTab === 'ongoing' ? '📅' : '⏰'}
            </div>
            <p className="empty-state-text">
              {activeTab === 'ongoing' 
                ? '진행 중인 일정이 없습니다' 
                : '만료된 일정이 없습니다'}
            </p>
            <p className="empty-state-subtext">
              {activeTab === 'ongoing'
                ? '새로운 일정을 추가해보세요!'
                : '모든 일정이 진행 중입니다'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SchedulesPage; 