import React, { useState, useEffect, useContext } from 'react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useNavigate } from 'react-router-dom';
import { DashboardService } from '../services/dashboard.service';
import { AuthContext } from '../contexts/AuthContext';
import { useLoading } from '../contexts/LoadingContext';
import '../styles/Home.css';

function Home() {
  const [dashboardData, setDashboardData] = useState(null);
  const { user } = useContext(AuthContext);
  const { setIsLoading, isLoading } = useLoading();
  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleViewAllSchedules = () => {
    navigate('/schedules');
  };

  const handleViewAllTodos = () => {
    navigate('/todos');
  };

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      // 현재 날짜를 YYYY-MM-DD 형식으로 변환
      const today = format(new Date(), 'yyyy-MM-dd');
      
      const response = await DashboardService.getDashboardData(
        user?.email || 'jaypark8282@gmail.com', // 임시로 기본값 설정
        today
      );
      
      if (response.result) {
        setDashboardData(response.data);
      } else {
        throw new Error(response.errorMessage || '데이터를 불러오는데 실패했습니다');
      }
    } catch (error) {
      console.error('대시보드 데이터 로딩 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDateTime = (dateString) => {
    return format(new Date(dateString), 'M월 d일 HH:mm', { locale: ko });
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'PENDING': return 'status-badge pending';
      case 'IN_PROGRESS': return 'status-badge in-progress';
      case 'COMPLETED': return 'status-badge completed';
      case 'CANCELLED': return 'status-badge cancelled';
      default: return 'status-badge';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'PENDING': return '대기 중';
      case 'IN_PROGRESS': return '진행 중';
      case 'COMPLETED': return '완료';
      case 'CANCELLED': return '취소';
      default: return status;
    }
  };

  if (isLoading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>데이터를 불러오는 중입니다...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>대시보드</h1>
        <p className="current-date">{format(new Date(), 'yyyy년 M월 d일 EEEE', { locale: ko })}</p>
      </div>

      <div className="dashboard-grid">
        {/* 일정 카드 */}
        <div className="dashboard-card schedules-card">
          <div className="card-header">
            <h2>다가오는 일정</h2>
            <button 
              className="view-all-button"
              onClick={handleViewAllSchedules}
              title="모든 일정 보기"
            >
              전체보기
            </button>
          </div>
          <div className="card-content">
            {dashboardData?.schedulesDtoList.map((schedule) => (
              <div key={schedule.id} className="schedule-item">
                <div className="schedule-header">
                  <h3>{schedule.title}</h3>
                  <span className="schedule-date">
                    {formatDateTime(schedule.startDateTime)} ~ {formatDateTime(schedule.endDateTime)}
                  </span>
                </div>
                <p className="schedule-description">{schedule.description}</p>
                <div className="schedule-progress-bar">
                  <div 
                    className="progress" 
                    style={{ 
                      width: `${Math.min(
                        Math.max(
                          ((new Date() - new Date(schedule.startDateTime)) /
                          (new Date(schedule.endDateTime) - new Date(schedule.startDateTime))) * 100,
                          0
                        ),
                        100
                      )}%`
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 오늘의 할 일 카드 */}
        <div className="dashboard-card todos-card">
          <div className="card-header">
            <h2>오늘의 할 일</h2>
            <button 
              className="view-all-button"
              onClick={handleViewAllTodos}
              title="모든 할 일 보기"
            >
              전체보기
            </button>
          </div>
          <div className="card-content">
            {dashboardData?.todayList.map((todo) => (
              <div key={todo.id} className="todo-item">
                <div className="todo-checkbox">
                  <input
                    type="checkbox"
                    checked={todo.status === 'COMPLETED'}
                    onChange={() => {/* 상태 변경 핸들러 */}}
                  />
                </div>
                <div className="todo-content">
                  <span className="todo-text">{todo.task}</span>
                  <span className={getStatusBadgeClass(todo.status)}>
                    {getStatusText(todo.status)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
