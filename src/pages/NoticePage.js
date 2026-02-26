import React, { useState, useEffect } from 'react';
import { NoticeService } from '../services/notice.service';
import NoticeForm from '../components/notice/NoticeForm';
import NoticeItem from '../components/notice/NoticeItem';
import '../styles/NoticePage.css';

function NoticePage() {
  const [notices, setNotices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingNotice, setEditingNotice] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [userRole, setUserRole] = useState(null);
  
  // 페이징 상태
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  // 사용자 권한 확인
  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await NoticeService.getUserRole();
        // NoticeService에서 { data: string } 형태로 반환
        const role = response.data;
        setUserRole(role);
        console.log('사용자 권한:', role);
      } catch (error) {
        console.error('권한 조회 실패:', error);
        // 토큰에서 권한 정보 추출 (백업 방법)
        const token = localStorage.getItem('token');
        if (token) {
          try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            const authorities = payload.auth;
            if (authorities && authorities.includes('ROLE_MASTER')) {
              setUserRole('ROLE_MASTER');
            } else {
              setUserRole('ROLE_USER');
            }
          } catch (error) {
            console.log('토큰 파싱 실패:', error);
            setUserRole('ROLE_USER');
          }
        } else {
          setUserRole('ROLE_USER');
        }
      }
    };

    fetchUserRole();
  }, []);

  const isMaster = userRole === 'ROLE_MASTER';
  const isUser = userRole === 'ROLE_USER';
  
  // 디버깅용 로그
  console.log('현재 사용자 역할:', userRole);
  console.log('마스터 권한 여부:', isMaster);
  console.log('일반 사용자 여부:', isUser);

  useEffect(() => {
    fetchNotices();
  }, [priorityFilter, statusFilter, currentPage, pageSize]);
  
  // 검색어는 수동 검색으로 변경 (엔터 또는 검색 버튼 클릭 시)

  // filterNotices 함수는 더 이상 필요하지 않으므로 제거
  // useEffect(() => {
  //   filterNotices();
  // }, [notices, searchTerm, priorityFilter, statusFilter]);

  const fetchNotices = async () => {
    try {
      setIsLoading(true);
      
      // 백엔드로 전달할 검색 조건 구성
      // API 스펙: NoticeSearchDto { title, content, keyword, priority, isActive, page, size }
      const searchParams = {
        page: currentPage,
        size: pageSize
      };
      
      if (searchTerm.trim()) {
        searchParams.keyword = searchTerm.trim();
      }
      
      if (priorityFilter) {
        searchParams.priority = priorityFilter;
      }
      
      if (statusFilter === 'active') {
        searchParams.isActive = true;
      } else if (statusFilter === 'inactive') {
        searchParams.isActive = false;
      }
      // statusFilter === 'all'일 때는 isActive 파라미터를 전달하지 않음
      
      const response = await NoticeService.getNotices(searchParams);
      // NoticeService에서 { data: PageNoticeEntity } 형태로 반환
      const pageData = response.data;
      
      console.log('페이징 응답:', pageData);
      console.log('현재 페이지:', currentPage, '페이지 크기:', pageSize);
      
      setNotices(pageData.content || []);
      setTotalPages(pageData.totalPages || 0);
      setTotalElements(pageData.totalElements || 0);
    } catch (error) {
      console.error('공지사항 조회 실패:', error);
      // 에러가 발생해도 페이지는 유지하고 빈 배열로 설정
      setNotices([]);
      setTotalPages(0);
      setTotalElements(0);
    } finally {
      setIsLoading(false);
    }
  };


  const handleCreateNotice = () => {
    setEditingNotice(null);
    setShowForm(true);
  };

  const handleEditNotice = (notice) => {
    // ROLE_USER는 비활성화된 공지사항을 수정할 수 없음
    if (isUser && !notice.isActive) {
      alert('비활성화된 공지사항은 수정할 수 없습니다.');
      return;
    }
    
    setEditingNotice(notice);
    setShowForm(true);
  };

  const handleDeleteNotice = async (noticeId) => {
    if (!window.confirm('정말로 이 공지사항을 삭제하시겠습니까?')) {
      return;
    }

    try {
      setIsLoading(true);
      await NoticeService.deleteNotice(noticeId);
      await fetchNotices();
      alert('공지사항이 삭제되었습니다.');
    } catch (error) {
      console.error('공지사항 삭제 실패:', error);
      let errorMessage = '공지사항 삭제에 실패했습니다.';
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

  const handleToggleStatus = async (noticeId, isActive) => {
    try {
      setIsLoading(true);
      // API 스펙: PATCH /v1/notices/{noticeId}/status?isActive={boolean}
      await NoticeService.updateNoticeStatus(noticeId, isActive);
      await fetchNotices();
      alert(`공지사항이 ${isActive ? '활성화' : '비활성화'}되었습니다.`);
    } catch (error) {
      console.error('공지사항 상태 변경 실패:', error);
      let errorMessage = '공지사항 상태 변경에 실패했습니다.';
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

  const handleSubmitNotice = async (noticeData) => {
    try {
      setIsLoading(true);
      
      // API 스펙: NoticeDto { title, content, priority } - 모두 required
      if (editingNotice) {
        await NoticeService.updateNotice(editingNotice.id, noticeData);
        alert('공지사항이 수정되었습니다.');
      } else {
        await NoticeService.createNotice(noticeData);
        alert('공지사항이 등록되었습니다.');
      }
      
      await fetchNotices();
      setShowForm(false);
      setEditingNotice(null);
    } catch (error) {
      console.error('공지사항 저장 실패:', error);
      let errorMessage = '공지사항 저장에 실패했습니다.';
      // CommonResponse 구조의 에러 메시지 처리
      if (error.response && error.response.data) {
        const errorData = error.response.data;
        if (errorData.errorMessage) {
          errorMessage = errorData.errorMessage;
        } else if (errorData.message) {
          errorMessage = errorData.message;
        }
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
    setEditingNotice(null);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setPriorityFilter('');
    setStatusFilter('all');
    setCurrentPage(0);
  };
  
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  
  const handlePageSizeChange = (newSize) => {
    setPageSize(newSize);
    setCurrentPage(0); // 페이지 크기 변경 시 첫 페이지로 이동
  };
  
  // 검색 실행 핸들러
  const handleSearch = () => {
    setCurrentPage(0); // 검색 시 첫 페이지로 이동
    fetchNotices();
  };
  
  // 엔터 키 핸들러
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  if (isLoading && notices.length === 0) {
    return (
      <div className="notice-loading">
        <div className="loading-spinner"></div>
        <p>공지사항을 불러오는 중입니다...</p>
      </div>
    );
  }

  return (
    <div className="notice-container">
      <div className="notice-header">
        <h1>공지사항</h1>
        <p className="notice-description">
          중요한 소식과 업데이트를 확인하세요
        </p>
      </div>

      <div className="notice-controls">
        <div className="search-section">
          <input
            type="text"
            placeholder="제목 또는 내용으로 검색... (엔터 키로 검색)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
            className="search-input"
          />
        </div>

                    <div className="filter-section">
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="filter-select"
              >
                <option value="">모든 중요도</option>
                <option value="HIGH">높음</option>
                <option value="MEDIUM">보통</option>
                <option value="LOW">낮음</option>
              </select>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="filter-select"
              >
                <option value="all">전체</option>
                <option value="active">활성</option>
                <option value="inactive">비활성</option>
              </select>

              <button 
                className="clear-filters-button"
                onClick={clearFilters}
              >
                필터 초기화
              </button>
            </div>
        
        {isMaster && (
          <button 
            className="add-notice-button"
            onClick={handleCreateNotice}
          >
            + 새 공지사항
          </button>
        )}
      </div>

      <div className="notice-content">
        {notices.length > 0 ? (
          <>
            <div className="notice-table">
              <table>
                <thead>
                  <tr>
                    <th>번호</th>
                    <th>제목</th>
                    <th>작성자</th>
                    <th>중요도</th>
                    <th>상태</th>
                    <th>작성일</th>
                    <th>관리</th>
                  </tr>
                </thead>
                <tbody>
                  {notices.map((notice, index) => (
                    <tr key={notice.id}>
                      <td>{totalElements - (currentPage * pageSize + index)}</td>
                      <td className="title-cell">
                        <div 
                          className={`notice-title ${isUser && !notice.isActive ? 'disabled' : ''}`} 
                          onClick={() => handleEditNotice(notice)}
                        >
                          {notice.title}
                        </div>
                      </td>
                      <td>{notice.createdBy}</td>
                      <td>
                        <span className={`priority-badge priority-${notice.priority.toLowerCase()}`}>
                          {notice.priority === 'HIGH' ? '높음' : 
                           notice.priority === 'MEDIUM' ? '보통' : '낮음'}
                        </span>
                      </td>
                      <td>
                        <span className={`status-badge status-${notice.isActive ? 'active' : 'inactive'}`}>
                          {notice.isActive ? '활성' : '비활성'}
                        </span>
                      </td>
                      <td>{new Date(notice.createdDateTime).toLocaleDateString()}</td>
                      <td>
                        {isMaster ? (
                          <div className="action-buttons">
                            <button 
                              className="action-btn edit-btn"
                              onClick={() => handleEditNotice(notice)}
                            >
                              수정
                            </button>
                            <button 
                              className="action-btn toggle-btn"
                              onClick={() => handleToggleStatus(notice.id, !notice.isActive)}
                            >
                              {notice.isActive ? '비활성화' : '활성화'}
                            </button>
                            <button 
                              className="action-btn delete-btn"
                              onClick={() => handleDeleteNotice(notice.id)}
                            >
                              삭제
                            </button>
                          </div>
                        ) : (
                          <div className="action-buttons">
                            <button 
                              className="action-btn view-btn"
                              onClick={() => handleEditNotice(notice)}
                            >
                              상세보기
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* 페이징 */}
            <div className="pagination-container">
              <div className="pagination-info">
                총 {totalElements}개 중 {(currentPage * pageSize) + 1}-{Math.min((currentPage + 1) * pageSize, totalElements)}개
              </div>
              
              <div className="pagination-controls">
                <button 
                  className="pagination-btn"
                  disabled={currentPage === 0}
                  onClick={() => handlePageChange(0)}
                >
                  처음
                </button>
                <button 
                  className="pagination-btn"
                  disabled={currentPage === 0}
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  이전
                </button>
                
                {(() => {
                  const startPage = Math.max(0, currentPage - 2);
                  const endPage = Math.min(totalPages - 1, startPage + 4);
                  const pages = [];
                  
                  for (let i = startPage; i <= endPage; i++) {
                    pages.push(
                      <button
                        key={i}
                        className={`pagination-btn ${currentPage === i ? 'active' : ''}`}
                        onClick={() => handlePageChange(i)}
                      >
                        {i + 1}
                      </button>
                    );
                  }
                  return pages;
                })()}
                
                <button 
                  className="pagination-btn"
                  disabled={currentPage === totalPages - 1}
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  다음
                </button>
                <button 
                  className="pagination-btn"
                  disabled={currentPage === totalPages - 1}
                  onClick={() => handlePageChange(totalPages - 1)}
                >
                  마지막
                </button>
              </div>
              
              <div className="page-size-control">
                <select 
                  value={pageSize} 
                  onChange={(e) => handlePageSizeChange(parseInt(e.target.value))}
                  className="page-size-select"
                >
                  <option value={10}>10개씩</option>
                  <option value={20}>20개씩</option>
                  <option value={50}>50개씩</option>
                </select>
              </div>
            </div>
          </>
        ) : (
          <div className="empty-state">
            {searchTerm || priorityFilter || statusFilter !== 'all' ? (
              <>
                <p>검색 조건에 맞는 공지사항이 없습니다.</p>
                <button 
                  className="clear-filters-button"
                  onClick={clearFilters}
                >
                  필터 초기화
                </button>
              </>
            ) : (
              <p>등록된 공지사항이 없습니다.</p>
            )}
          </div>
        )}
      </div>

      {showForm && (
        <NoticeForm
          notice={editingNotice}
          onSubmit={handleSubmitNotice}
          onCancel={handleCancelForm}
          userRole={userRole}
        />
      )}
    </div>
  );
}

export default NoticePage; 