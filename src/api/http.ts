import axios, { AxiosRequestConfig } from 'axios';
import { getToken, removeToken } from '../store/authStore';

const BASE_URL = 'http://localhost:9999';
const DEFAULT_TIMEOUT = 30000;

export const createClient = (config?: AxiosRequestConfig) => {
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: DEFAULT_TIMEOUT,
    headers: {
      'content-type': 'application/json',
      Authorization: getToken() ? getToken() : '',
    },
    withCredentials: true,
    ...config,
  });

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      // 로그인 만료 처리
      if (error.response.status === 401) {
        removeToken();
        window.location.href = '/login';
        return;
      }

      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export const httpClient = createClient();

// 공통 요청 부분
type RequestMethod = 'get' | 'post' | 'put' | 'delete';

interface RequestOptions {
  headers?: Record<string, string>;
  tokenRequired?: boolean;
}

export const requestHandler = async <T>(
  method: RequestMethod,
  url: string,
  payload?: T,
  options: RequestOptions = {}
) => {
  const { headers = {}, tokenRequired = false } = options;

  if (tokenRequired) {
    const token = getToken();
    headers.Authorization = `Bearer ${token}`;
  }

  let response;

  switch (method) {
    case 'post':
      response = await httpClient.post(url, payload, { headers });
      break;
    case 'get':
      const config = {
        headers,
        params: payload,
      };
      response = await httpClient.get(url, config);
      break;
    case 'put':
      response = await httpClient.put(url, payload, { headers });
      break;
    case 'delete':
      response = await httpClient.delete(url, { headers });
      break;
  }

  return response.data;
};
