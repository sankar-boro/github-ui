const { AUTH_HTTPS_PORT, API_HTTPS_PORT } = process.env;

export const AUTH_URL =
  `https://localhost:${AUTH_HTTPS_PORT}` || 'http://localhost:2443';
export const API_URL =
  `https://localhost:${API_HTTPS_PORT}` || 'http://localhost:2000';

//
export const LOGIN_URL = API_URL + '/login';
export const REGISTER_URL = API_URL + '/register';
export const LOGOUT_URL = API_URL + '/logout';
//
export const REFRESH_TOKEN_URL = API_URL + '/refreshToken';
export const VALIDATE_TOKEN_URL = API_URL + '/validateToken';
//
export const USERS_PROFILE_URL = API_URL;
//
export const REPOS_URL = API_URL + '/repos';
export const GET_REPO = API_URL + '/repos/getRepo';

export const CREATE_REPO = API_URL + '/repos/createRepo';
export const DELETE_REPO = API_URL + '/repos/deleteRepo';
