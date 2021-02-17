import axios from "axios";

const instance = axios.create({
  baseURL:
    "https://api.allorigins.win/get?url=https://bad-api-assignment.reaktor.com/v2",
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
