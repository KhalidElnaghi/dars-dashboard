import axios from 'axios';
import jwt from 'jsonwebtoken';
import Cookies from 'js-cookie';

import { paths } from 'src/routes/paths';

import { RefreshToken } from 'src/actions/auth';

let accessTokenTimer: ReturnType<typeof setTimeout>;
let refreshTokenTimer: ReturnType<typeof setTimeout>;

export interface JwtPayload {
  exp: number;
  iat?: number;
  sub?: string;
  [key: string]: any;
}

export function decodeToken(token: string): JwtPayload | null {
  try {
    const decoded = jwt.decode(token) as JwtPayload;
    return decoded || null;
  } catch (error) {
    return null;
  }
}

function logout() {
  Cookies.remove('accessToken');
  Cookies.remove('refreshToken');
  Cookies.remove('accessTokenExpireAt');
  Cookies.remove('refreshTokenExpireAt');
  Cookies.remove('user');
  delete axios.defaults.headers.common.Authorization;
  window.location.href = paths.auth.jwt.login;
}

// Refresh accessToken before it expires
async function refreshAccessToken() {
  try {
    const res = await RefreshToken();
    const token = res.accessToken || res.token;
    const { refreshToken, accessTokenExpireAt, refreshTokenExpireAt } = res;

    if (!token || !refreshToken || !accessTokenExpireAt || !refreshTokenExpireAt) {
      throw new Error('Invalid refresh token response');
    }

    setSession({
      accessToken: token,
      refreshToken,
      accessTokenExpireAt,
      refreshTokenExpireAt,
    });
  } catch (error) {
    setTimeout(() => {
      refreshAccessToken();
    }, 2000);
  }
}

export const setSession = ({
  accessToken,
  refreshToken,
  accessTokenExpireAt,
  refreshTokenExpireAt,
}: {
  accessToken: string | null;
  refreshToken: string | null;
  accessTokenExpireAt: string | null;
  refreshTokenExpireAt: string | null;
}) => {
  clearTimeout(accessTokenTimer);
  clearTimeout(refreshTokenTimer);
  if (accessToken && refreshToken && accessTokenExpireAt && refreshTokenExpireAt) {
    Cookies.set('accessToken', accessToken);
    Cookies.set('refreshToken', refreshToken);
    Cookies.set('accessTokenExpireAt', accessTokenExpireAt);
    Cookies.set('refreshTokenExpireAt', refreshTokenExpireAt);

    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    const now = Date.now();
    const accessExpTime = new Date(accessTokenExpireAt).getTime();
    const refreshExpTime = new Date(refreshTokenExpireAt).getTime();

    const refreshIn = accessExpTime - now - 20000;
    if (refreshIn > 0) {
      accessTokenTimer = setTimeout(() => {
        refreshAccessToken();
      }, refreshIn);
    }

    const logoutIn = refreshExpTime - now - 20000;
    if (logoutIn > 0) {
      refreshTokenTimer = setTimeout(() => {
        if (Cookies.get('refreshToken') === refreshToken) {
          logout();
        }
      }, logoutIn);
    }
  } else {
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    Cookies.remove('accessTokenExpireAt');
    Cookies.remove('refreshTokenExpireAt');
    Cookies.remove('user');
    delete axios.defaults.headers.common.Authorization;
    clearTimeout(accessTokenTimer);
    clearTimeout(refreshTokenTimer);
  }
};

export const isValidToken = (token: string) => {
  const decoded = decodeToken(token);
  if (!decoded?.exp) return false;

  const expMs = decoded.exp * 1000;
  const nowMs = Date.now();

  return expMs > nowMs;
};
