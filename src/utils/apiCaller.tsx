import axios from "axios";
import { API_URL, PROXY_URL } from "../constants";

const instance = axios.create({
  baseURL: PROXY_URL + API_URL,
  timeout: 15000,
});

instance.interceptors.request.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
