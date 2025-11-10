import Cookies from 'js-cookie';

import { decodeToken } from './decodeToken';

export function hasClientPermission(permission: string): boolean {
  try {
    const token = Cookies.get('accessToken');
    if (token) {
      const decoded = decodeToken(token);
      const permissions = decoded?.permission || [];
      return permissions.includes(permission);
    }
  } catch (error) {
    console.error('Error checking client permission:', error);
  }
  return false;
}


