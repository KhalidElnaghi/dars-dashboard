'use server';

import { cookies } from "next/headers";

import { decodeToken } from "./decodeToken";

export function hasServerPermission(permission: string): boolean {
    try {
      const cookieStore = cookies();
      const token = cookieStore.get('accessToken')?.value;
      if (token) {
        const decoded = decodeToken(token);
        const permissions = decoded?.permission || [];
        return permissions.includes(permission);
      }
    } catch (error) {
      console.error('Error checking server permission:', error);
    }
    return false;
  }
  