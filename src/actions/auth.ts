'use server';

import axios from 'axios';
import { cookies } from 'next/headers';

import axiosInstance, { endpoints, getErrorMessage, SharedApiClient } from 'src/utils/axios';

import { HOST_API_SHARED } from 'src/config-global';

const getServerLanguage = async () => {
  const cookieStore = await cookies();
  return cookieStore.get('Language')?.value || 'en';
};

export const Login = async (data: { email: string; password: string }) => {
  const lang = await getServerLanguage();
  try {
    const res = await SharedApiClient.post(`${endpoints.auth.login}`, data, {
      headers: {
        'Accept-Language': lang,
      },
    });

    return res.data;
  } catch (e) {
    return { error: getErrorMessage(e) };
  }
};

// Backward-compatible alias for existing imports
export const LoginWithEmail = Login;

export const Register = async (data: {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  projectName: string;
}) => {
  const lang = await getServerLanguage();
  try {
    const res = await axiosInstance.post(`${endpoints.auth.register}`, data, {
      headers: {
        'Accept-Language': lang,
      },
    });
    return res?.status;
  } catch (e) {
    return {
      error: getErrorMessage(e.error),
    };
  }
};

export const ForgetPassword = async (data: { email: string }) => {
  const lang = await getServerLanguage();
  try {
    const res = await axiosInstance.post(`${endpoints.auth.forgetPassword}`, data, {
      headers: {
        'Accept-Language': lang,
      },
    });
    return res?.status;
  } catch (e) {
    return {
      error: getErrorMessage(e.error),
    };
  }
};

export const ResetPassword = async (data: { email: string; code: string; newPassword: string }) => {
  const lang = await getServerLanguage();
  try {
    const res = await axiosInstance.post(`${endpoints.auth.verifyforgetPassword}`, data, {
      headers: {
        'Accept-Language': lang,
      },
    });
    return res?.status;
  } catch (e) {
    return {
      error: getErrorMessage(e.error),
    };
  }
};

export const VerifyOtpLogin = async (data: { phone: string; code: string }) => {
  const lang = await getServerLanguage();
  try {
    const res = await SharedApiClient.post(`${endpoints.auth.verifyOtpLogin}`, data, {
      headers: {
        'Accept-Language': lang,
      },
    });
    return res?.data;
  } catch (e) {
    return {
      error: getErrorMessage(e.error),
    };
  }
};

export const RefreshToken = async () => {
  const lang = await getServerLanguage();
  const cookieStore = await cookies();
  const refresh = cookieStore.get('refreshToken')?.value;

  try {
    const res = await axios.post(
      HOST_API_SHARED?.replace('admin', 'refresh-token')!,
      {
        refreshToken: refresh,
      },
      {
        headers: {
          'Accept-Language': lang,
        },
      }
    );

    return res?.data;
  } catch (e) {
    return {
      error: getErrorMessage(e.error),
    };
  }
};

export const getServerUser = async () => {
  const cookieStore = await cookies();
  const userCookie = cookieStore.get('user')?.value;
  if (!userCookie) {
    return null;
  }
  try {
    return JSON.parse(userCookie);
  } catch {
    return null;
  }
};
