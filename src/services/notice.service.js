import axios from '../util/axiosInstance';

const NOTICE_API_BASE_URL = '/v1/notices';

export const NoticeService = {
  // 공지사항 목록 조회
  // GET /v1/notices?searchDto={...}
  // 응답: CommonResponsePageNoticeEntity { result, data: PageNoticeEntity, errorCode, errorMessage }
  getNotices: async (searchParams = {}) => {
    try {
      // API 스펙에 따르면 searchDto 객체로 전달해야 함
      // 하지만 axios는 자동으로 객체를 쿼리 파라미터로 변환하므로
      // searchDto 키로 감싸거나, 백엔드가 평면 구조를 받는지 확인 필요
      // 일단 평면 구조로 전달 (백엔드 구현에 따라 조정 가능)
      const response = await axios.get(NOTICE_API_BASE_URL, {
        params: searchParams
      });
      
      // CommonResponsePageNoticeEntity 구조: { result, data: PageNoticeEntity, ... }
      const commonResponse = response.data;
      if (commonResponse && commonResponse.result && commonResponse.data) {
        return { data: commonResponse.data };
      }
      // 에러 응답인 경우
      if (commonResponse && !commonResponse.result) {
        const error = new Error(commonResponse.errorMessage || '공지사항 목록 조회 실패');
        error.response = { data: commonResponse };
        throw error;
      }
      return response.data;
    } catch (error) {
      console.error('공지사항 목록 조회 실패:', error);
      throw error;
    }
  },

  // 공지사항 상세 조회
  // GET /v1/notices/{noticeId}
  // 응답: CommonResponseNoticeEntity { result, data: NoticeEntity, errorCode, errorMessage }
  getNoticeById: async (noticeId) => {
    try {
      const response = await axios.get(`${NOTICE_API_BASE_URL}/${noticeId}`);
      
      // CommonResponseNoticeEntity 구조: { result, data: NoticeEntity, ... }
      const commonResponse = response.data;
      if (commonResponse && commonResponse.result && commonResponse.data) {
        return { data: commonResponse.data };
      }
      // 에러 응답인 경우
      if (commonResponse && !commonResponse.result) {
        const error = new Error(commonResponse.errorMessage || '공지사항 상세 조회 실패');
        error.response = { data: commonResponse };
        throw error;
      }
      return response.data;
    } catch (error) {
      console.error('공지사항 상세 조회 실패:', error);
      throw error;
    }
  },

  // 공지사항 생성
  // POST /v1/notices
  // RequestBody: NoticeDto { title, content, priority } - 모두 required
  // 응답: CommonResponseNoticeEntity { result, data: NoticeEntity, errorCode, errorMessage }
  createNotice: async (noticeData) => {
    try {
      const response = await axios.post(NOTICE_API_BASE_URL, noticeData);
      
      // CommonResponseNoticeEntity 구조: { result, data: NoticeEntity, ... }
      const commonResponse = response.data;
      if (commonResponse && commonResponse.result && commonResponse.data) {
        return { data: commonResponse.data };
      }
      // 에러 응답인 경우
      if (commonResponse && !commonResponse.result) {
        const error = new Error(commonResponse.errorMessage || '공지사항 생성 실패');
        error.response = { data: commonResponse };
        throw error;
      }
      return response.data;
    } catch (error) {
      console.error('공지사항 생성 실패:', error);
      throw error;
    }
  },

  // 공지사항 수정
  // PUT /v1/notices/{noticeId}
  // RequestBody: NoticeDto { title, content, priority }
  // 응답: CommonResponseNoticeEntity { result, data: NoticeEntity, errorCode, errorMessage }
  updateNotice: async (noticeId, noticeData) => {
    try {
      const response = await axios.put(`${NOTICE_API_BASE_URL}/${noticeId}`, noticeData);
      
      // CommonResponseNoticeEntity 구조: { result, data: NoticeEntity, ... }
      const commonResponse = response.data;
      if (commonResponse && commonResponse.result && commonResponse.data) {
        return { data: commonResponse.data };
      }
      // 에러 응답인 경우
      if (commonResponse && !commonResponse.result) {
        const error = new Error(commonResponse.errorMessage || '공지사항 수정 실패');
        error.response = { data: commonResponse };
        throw error;
      }
      return response.data;
    } catch (error) {
      console.error('공지사항 수정 실패:', error);
      throw error;
    }
  },

  // 공지사항 상태 변경
  // PATCH /v1/notices/{noticeId}/status?isActive={boolean}
  // 응답: CommonResponseNoticeEntity { result, data: NoticeEntity, errorCode, errorMessage }
  updateNoticeStatus: async (noticeId, isActive) => {
    try {
      const response = await axios.patch(`${NOTICE_API_BASE_URL}/${noticeId}/status`, null, {
        params: { isActive }
      });
      
      // CommonResponseNoticeEntity 구조: { result, data: NoticeEntity, ... }
      const commonResponse = response.data;
      if (commonResponse && commonResponse.result && commonResponse.data) {
        return { data: commonResponse.data };
      }
      // 에러 응답인 경우
      if (commonResponse && !commonResponse.result) {
        const error = new Error(commonResponse.errorMessage || '공지사항 상태 변경 실패');
        error.response = { data: commonResponse };
        throw error;
      }
      return response.data;
    } catch (error) {
      console.error('공지사항 상태 변경 실패:', error);
      throw error;
    }
  },

  // 공지사항 삭제
  // DELETE /v1/notices/{noticeId}
  // 응답: CommonResponseString { result, data: string, errorCode, errorMessage }
  deleteNotice: async (noticeId) => {
    try {
      const response = await axios.delete(`${NOTICE_API_BASE_URL}/${noticeId}`);
      
      // CommonResponseString 구조: { result, data: string, ... }
      const commonResponse = response.data;
      if (commonResponse && commonResponse.result) {
        return { data: commonResponse.data };
      }
      // 에러 응답인 경우
      if (commonResponse && !commonResponse.result) {
        const error = new Error(commonResponse.errorMessage || '공지사항 삭제 실패');
        error.response = { data: commonResponse };
        throw error;
      }
      return response.data;
    } catch (error) {
      console.error('공지사항 삭제 실패:', error);
      throw error;
    }
  },

  // 사용자 권한 조회
  // GET /v1/notices/user-role
  // 응답: CommonResponseString { result, data: string, errorCode, errorMessage }
  getUserRole: async () => {
    try {
      const response = await axios.get(`${NOTICE_API_BASE_URL}/user-role`);
      
      // CommonResponseString 구조: { result, data: string, ... }
      const commonResponse = response.data;
      if (commonResponse && commonResponse.result && commonResponse.data) {
        return { data: commonResponse.data };
      }
      // 에러 응답인 경우
      if (commonResponse && !commonResponse.result) {
        const error = new Error(commonResponse.errorMessage || '사용자 권한 조회 실패');
        error.response = { data: commonResponse };
        throw error;
      }
      return response.data;
    } catch (error) {
      console.error('사용자 권한 조회 실패:', error);
      throw error;
    }
  }
}; 