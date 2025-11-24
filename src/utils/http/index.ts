import axios from 'axios';
import type { AxiosRequestConfig } from 'axios';

const isDev = process.env.NODE_ENV === 'development';

const axiosInstance = axios.create({
  baseURL: isDev ? process.env.VUE_APP_AMAP_API_DEV : process.env.VUE_APP_AMAP_API_PROD,
  timeout: 10000,
});

// 请求拦截器
axiosInstance.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 响应拦截器
axiosInstance.interceptors.response.use(res => {
  const { status, data } = res;
  if (status === 200) {
    return data;
  } else {
    return Promise.reject('请求失败');
  }
});

// 创建类型声明，使http直接返回响应数据而不是AxiosResponse
function http<T = any>(config: AxiosRequestConfig): Promise<T> {
  return axiosInstance(config) as unknown as Promise<T>;
}

export default http;
