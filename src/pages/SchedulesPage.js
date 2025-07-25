import React, { useState, useEffect } from 'react';
import { format, isAfter, isBefore, isEqual } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useLoading } from '../contexts/LoadingContext';
import { SchedulesService } from '../services/schedules.service';
import ScheduleForm from '../components/schedule/ScheduleForm';
import ScheduleItem from '../components/schedule/ScheduleItem';
import '../styles/SchedulesPage.css';

function SchedulesPage() {
  const [schedules, setSchedules] = useState([]);
  const [activeTab, setActiveTab] = useState('ongoing');
  const [showForm, setShowForm] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { setIsLoading, isLoading } = useLoading();

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    try {
      setIsLoading(true);
      
      // 모든 일정을 조회하도록 날짜 범위 없이 호출
      const response = await SchedulesService.getSchedules({});
      
      if (response.result) {
        setSchedules(response.data);
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
    
    // 날짜 비교를 더 안전하게 처리
    const nowTime = now.getTime();
    const endTime = endDate.getTime();
    
    if (nowTime > endTime) {
      return 'expired';
    }
    return 'ongoing';
  };

  const filteredSchedules = schedules.filter(schedule => {
    const status = getScheduleStatus(schedule);
    const matchesTab = activeTab === 'ongoing' ? status === 'ongoing' : status === 'expired';
    const matchesSearch = !searchTerm || 
      schedule.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      schedule.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesTab && matchesSearch;
  });

  const handleCreateSchedule = () => {
    setEditingSchedule(null);
    setShowForm(true);
  };

  const handleEditSchedule = (schedule) => {
    setEditingSchedule(schedule);
    setShowForm(true);
  };

  const handleDeleteSchedule = async (scheduleId) => {
    try {
      setIsLoading(true);
      await SchedulesService.deleteSchedule(scheduleId);
      await fetchSchedules();
    } catch (error) {
      console.error('일정 삭제 실패:', error);
      alert('일정 삭제에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitSchedule = async (scheduleData) => {
    try {
      setIsLoading(true);
      
      if (editingSchedule) {
        await SchedulesService.updateSchedule(editingSchedule.id, scheduleData);
      } else {
        await SchedulesService.createSchedule(scheduleData);
      }
      await fetchSchedules();
      setShowForm(false);
      setEditingSchedule(null);
    } catch (error) {
      console.error('일정 저장 실패:', error);
      
      // 더 구체적인 에러 메시지 표시
      let errorMessage = '일정 저장에 실패했습니다.';
      if (error.response && error.response.data && error.response.data.errorMessage) {
        errorMessage = error.response.data.errorMessage;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      alert(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingSchedule(null);
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

      <div className="schedules-controls">
        <div className="search-section">
          <input
            type="text"
            placeholder="일정 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        <button 
          className="add-schedule-button"
          onClick={handleCreateSchedule}
        >
          + 새 일정 추가
        </button>
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
            <ScheduleItem
              key={schedule.id}
              schedule={schedule}
              onEdit={handleEditSchedule}
              onDelete={handleDeleteSchedule}
            />
          ))
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon">
              {activeTab === 'ongoing' ? '📅' : '⏰'}
            </div>
            <p className="empty-state-text">
              {searchTerm 
                ? '검색 결과가 없습니다'
                : activeTab === 'ongoing' 
                  ? '진행 중인 일정이 없습니다' 
                  : '만료된 일정이 없습니다'}
            </p>
            <p className="empty-state-subtext">
              {searchTerm
                ? '다른 검색어를 시도해보세요'
                : activeTab === 'ongoing'
                  ? '새로운 일정을 추가해보세요!'
                  : '모든 일정이 진행 중입니다'}
            </p>
          </div>
        )}
      </div>

      {showForm && (
        <ScheduleForm
          schedule={editingSchedule}
          onSubmit={handleSubmitSchedule}
          onCancel={handleCancelForm}
          isEdit={!!editingSchedule}
        />
      )}
    </div>
  );
}

export default SchedulesPage; 