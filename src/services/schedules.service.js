import axios from '../util/axiosInstance';

const SCHEDULES_API_BASE_URL = '/v1/schedules';

export const SchedulesService = {
  // 스케줄 목록 조회
  getSchedules: async (searchParams = {}) => {
    try {
      const response = await axios.get(SCHEDULES_API_BASE_URL, {
        params: searchParams
      });
      return response.data;
    } catch (error) {
      console.error('스케줄 목록 조회 실패:', error);
      throw error;
    }
  },

  // 스케줄 상세 조회
  getScheduleById: async (scheduleId) => {
    try {
      const response = await axios.get(`${SCHEDULES_API_BASE_URL}/${scheduleId}`);
      return response.data;
    } catch (error) {
      console.error('스케줄 상세 조회 실패:', error);
      throw error;
    }
  },

  // 스케줄 생성
  createSchedule: async (scheduleData) => {
    try {
      const response = await axios.post(SCHEDULES_API_BASE_URL, scheduleData);
      return response.data;
    } catch (error) {
      console.error('스케줄 생성 실패:', error);
      throw error;
    }
  },

  // 스케줄 수정
  updateSchedule: async (scheduleId, scheduleData) => {
    try {
      const response = await axios.patch(`${SCHEDULES_API_BASE_URL}/${scheduleId}`, scheduleData);
      return response.data;
    } catch (error) {
      console.error('스케줄 수정 실패:', error);
      throw error;
    }
  },

  // 스케줄 삭제
  deleteSchedule: async (scheduleId) => {
    try {
      const response = await axios.delete(`${SCHEDULES_API_BASE_URL}/${scheduleId}`);
      return response.data;
    } catch (error) {
      console.error('스케줄 삭제 실패:', error);
      throw error;
    }
  }
}; 