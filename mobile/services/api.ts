/**
 * API Service
 */

import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { MMKV } from 'react-native-mmkv';
import Config from 'react-native-config';

const storage = new MMKV();

class APIService {
  private client: AxiosInstance;
  private refreshPromise: Promise<string> | null = null;

  constructor() {
    this.client = axios.create({
      baseURL: Config.API_URL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        const token = storage.getString('access_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const newToken = await this.refreshToken();
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return this.client(originalRequest);
          } catch (refreshError) {
            // Logout user
            storage.delete('access_token');
            storage.delete('refresh_token');
            throw refreshError;
          }
        }

        return Promise.reject(error);
      }
    );
  }

  private async refreshToken(): Promise<string> {
    if (this.refreshPromise) {
      return this.refreshPromise;
    }

    this.refreshPromise = (async () => {
      const refreshToken = storage.getString('refresh_token');
      if (!refreshToken) {
        throw new Error('No refresh token');
      }

      const response = await axios.post(`${Config.API_URL}/auth/refresh`, {
        refresh_token: refreshToken,
      });

      const { access_token } = response.data;
      storage.set('access_token', access_token);

      return access_token;
    })();

    try {
      return await this.refreshPromise;
    } finally {
      this.refreshPromise = null;
    }
  }

  // Auth
  async login(apiKey: string, apiSecret: string) {
    const response = await this.client.post('/auth/token', {
      api_key: apiKey,
      api_secret: apiSecret,
    });

    storage.set('access_token', response.data.access_token);
    storage.set('refresh_token', response.data.refresh_token);

    return response.data;
  }

  async logout() {
    try {
      await this.client.post('/auth/revoke');
    } finally {
      storage.delete('access_token');
      storage.delete('refresh_token');
    }
  }

  // Catalog
  async searchParts(query: string, filters = {}, page = 1) {
    const response = await this.client.post('/catalog/search', {
      query,
      filters,
      limit: 25,
      offset: (page - 1) * 25,
    });
    return response.data;
  }

  async getPart(partId: string, include?: string[]) {
    const params = include ? { include: include.join(',') } : {};
    const response = await this.client.get(`/catalog/parts/${partId}`, { params });
    return response.data;
  }

  async getAnalogs(partNumber: string, minConfidence = 0.75) {
    const response = await this.client.get(`/catalog/analogs/${partNumber}`, {
      params: { min_confidence: minConfidence },
    });
    return response.data;
  }

  // Repairs
  async getRepairs(params = {}) {
    const response = await this.client.get('/repairs', { params });
    return response.data;
  }

  async getRepair(repairId: string) {
    const response = await this.client.get(`/repairs/${repairId}`);
    return response.data;
  }

  async createRepair(data: any) {
    const response = await this.client.post('/repairs', data);
    return response.data;
  }

  async updateRepair(repairId: string, data: any) {
    const response = await this.client.patch(`/repairs/${repairId}`, data);
    return response.data;
  }

  // Fleet
  async getVehicles(params = {}) {
    const response = await this.client.get('/fleet/vehicles', { params });
    return response.data;
  }

  async getFleetReadiness() {
    const response = await this.client.get('/fleet/readiness');
    return response.data;
  }

  // AI
  async askAI(query: string, context = {}) {
    const response = await this.client.post('/ai/ask', { query, context });
    return response.data;
  }
}

export const api = new APIService();
export default api;
