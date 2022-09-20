import { login } from "../api/auth.api";

import { TokenService } from "./storage.service";

const UserService = {
  login: async function (username, password) {
    const response = await login(username, password);
    TokenService.saveToken(response.data.token);
    return response.data.token;
  },
  logout() {
    TokenService.removeToken();
  },
};

export { UserService };
