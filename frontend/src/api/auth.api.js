import httpClient from "./httpClient";

const ENDPOINT = "/api/v1/api-token-auth/";

const login = (username, password) =>
  httpClient.post(ENDPOINT, { username, password });

export { login };
