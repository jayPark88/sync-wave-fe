import axiosInstance from "../util/axiosInstance";

export class DashboardService {
  static async getDashboardData(userId, targetDate) {
    const response = await axiosInstance.get("/v1/dashboard", {
      params: {
        userId,
        targetDate
      }
    });
    return response.data;
  }
} 