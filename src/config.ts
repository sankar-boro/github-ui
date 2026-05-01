const { NODE_HTTP_PORT, NODE_HTTPS_PORT, NODE_ENV } = process.env;

export const AUTH_URL =
  `https://localhost:${NODE_ENV === 'production' ? NODE_HTTPS_PORT : NODE_HTTP_PORT}` ||
  '';
export const API_URL =
  `https://localhost:${NODE_ENV === 'production' ? NODE_HTTPS_PORT : NODE_HTTP_PORT}` ||
  'http://localhost:2000';

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
// export const REPOS_URL = API_URL;
// export const GET_REPO = API_URL + '/getRepo';

// export const CREATE_REPO = API_URL + '/createRepo';
// export const DELETE_REPO = API_URL + '/deleteRepo';
