import { request } from './httpClient.js';

export const authService = {
  login: (username, password) =>
    request('/auth/login', { method: 'POST', body: { username, password } }),
};
