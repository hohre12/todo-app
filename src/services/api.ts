import axios, { AxiosResponse, AxiosError } from 'axios'

const BASE_URL = '/api'

const onResponse = (response: AxiosResponse): AxiosResponse => {
  return response
}

const onErrorResponse = (error: AxiosError): Promise<AxiosError> => {
  console.error('API Error: ', error.message)
  return Promise.reject(error)
}

const axiosInstance = axios.create({
  baseURL: BASE_URL,
})

axiosInstance.interceptors.response.use(onResponse, onErrorResponse)

export default axiosInstance
