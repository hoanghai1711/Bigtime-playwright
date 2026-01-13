
import { APIRequestContext, APIResponse } from '@playwright/test';

export class CheckDayApi {
  constructor(private request: APIRequestContext) {}

  /**
   * Tạo chấm công cho nhân viên
   */
  async createCheckDay(data: {
    user_code: string;
    check_day: string; // format: YYYY-MM-DD
    check_times: string[]; // array of times: ["HH:MM:SS", "HH:MM:SS"]
  }): Promise<APIResponse> {
    return await this.request.post('/api/check-day/create', {
      data,
    });
  }

  /**
   * Lấy danh sách chấm công
   */
  async getCheckDays(params?: {
    user_code?: string;
    start_date?: string;
    end_date?: string;
    page?: number;
    limit?: number;
  }): Promise<APIResponse> {
    return await this.request.get('/api/check-day/list', {
      params,
    });
  }

  /**
   * Cập nhật chấm công
   */
  async updateCheckDay(
    checkDayId: string,
    data: {
      check_times?: string[];
      note?: string;
      status?: string;
    }
  ): Promise<APIResponse> {
    return await this.request.put(`/api/check-day/update/${checkDayId}`, {
      data,
    });
  }

  /**
   * Xóa chấm công
   */
  async deleteCheckDay(checkDayId: string): Promise<APIResponse> {
    return await this.request.delete(`/api/check-day/delete/${checkDayId}`);
  }

  /**
   * Chấm công tự động (check-in/check-out)
   */
  async checkInOut(data: {
    user_code: string;
    check_type: 'in' | 'out';
    latitude?: number;
    longitude?: number;
    note?: string;
  }): Promise<APIResponse> {
    return await this.request.post('/api/check-day/check-in-out', {
      data,
    });
  }
}