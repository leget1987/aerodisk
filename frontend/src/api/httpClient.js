import axios from "axios";

import { TokenService } from "../services/storage.service";

const httpClient = axios.create({
  baseURL: "http://localhost:8000/",

  timeout: 10000, // indicates, 10000ms ie. 10 seconds

  headers: {
    "Content-Type": "application/json"
  }
});

const getAuthToken = () => TokenService.getToken();

const authInterceptor = config => {
  config.headers["Authorization"] = getAuthToken();

  return config;
};

httpClient.interceptors.request.use(authInterceptor);

export default httpClient;
