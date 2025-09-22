import axios from '../util/axiosInstance';

const NOTICE_API_BASE_URL = '/v1/notices';

export const NoticeService = {
  // 공지사항 목록 조회
  getNotices: async (searchParams = {}) => {
    try {
      const response = await axios.get(NOTICE_API_BASE_URL, {
        params: searchParams
      });
      return response.data;
    } catch (error) {
      console.error('공지사항 목록 조회 실패:', error);
      throw error;
    }
  },

  // 공지사항 상세 조회
  getNoticeById: async (noticeId) => {
    try {
      const response = await axios.get(`${NOTICE_API_BASE_URL}/${noticeId}`);
      return response.data;
    } catch (error) {
      console.error('공지사항 상세 조회 실패:', error);
      throw error;
    }
  },

  // 공지사항 생성
  createNotice: async (noticeData) => {
    try {
      const response = await axios.post(NOTICE_API_BASE_URL, noticeData);
      return response.data;
    } catch (error) {
      console.error('공지사항 생성 실패:', error);
      throw error;
    }
  },

  // 공지사항 수정
  updateNotice: async (noticeId, noticeData) => {
    try {
      const response = await axios.put(`${NOTICE_API_BASE_URL}/${noticeId}`, noticeData);
      return response.data;
    } catch (error) {
      console.error('공지사항 수정 실패:', error);
      throw error;
    }
  },

  // 공지사항 상태 변경
  updateNoticeStatus: async (noticeId, isActive) => {
    try {
      const response = await axios.patch(`${NOTICE_API_BASE_URL}/${noticeId}/status?isActive=${isActive}`);
      return response.data;
    } catch (error) {
      console.error('공지사항 상태 변경 실패:', error);
      throw error;
    }
  },

  // 공지사항 삭제
  deleteNotice: async (noticeId) => {
    try {
      const response = await axios.delete(`${NOTICE_API_BASE_URL}/${noticeId}`);
      return response.data;
    } catch (error) {
      console.error('공지사항 삭제 실패:', error);
      throw error;
    }
  },

  // 사용자 권한 조회
  getUserRole: async () => {
    try {
      const response = await axios.get(`${NOTICE_API_BASE_URL}/user-role`);
      return response.data;
    } catch (error) {
      console.error('사용자 권한 조회 실패:', error);
      throw error;
    }
  }
}; 