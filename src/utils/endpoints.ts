export const endpoints = {
  auth: {
    login: '/auth/email-login',
    register: '/users/register',
    forgetPassword: '/auth/forget-password-by-email',
    verifyForgetPasswordOtp: '/auth/verify-forget-password-otp',
    resetPasswordByEmail: '/auth/reset-password-by-email',
  },
  countries: {
    root: '/countries',
    detail: (id: string | number) => `/countries/${id}`,
  },
} as const;
