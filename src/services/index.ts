import axios from "axios";
import { message } from "antd";

/* request config */
axios.defaults.baseURL = process.env.NODE_ENV == "production" ? "./" : "./";
axios.interceptors.response.use(
  (response) => {
    let { errorNo, errorDesc } = response.data;
    if (errorNo != 200) {
      message.error(errorDesc);
    }
    return response.data;
  },
  (error) => {
    message.error(error);
    return Promise.reject(error);
  }
);
const request = (url: string, options?: any) => {
  return axios({ url: url, ...options });
};

export default request;
