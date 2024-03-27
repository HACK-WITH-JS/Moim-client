import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api", // TODO 환경 변수 분리 예정
  timeout: 3000, // TODO 환경 변수 분리 예정
  withCredentials: true,
});
