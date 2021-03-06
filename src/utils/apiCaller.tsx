import axios from "axios";
import { API_URL, PROXY_URL } from "../constants";

const instance = axios.create({
  baseURL: PROXY_URL + API_URL,
});

instance.defaults.timeout = 20000;
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
