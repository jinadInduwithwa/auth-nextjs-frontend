'use server';

import { cookies } from 'next/headers';
import { ApiResponse } from './types';

export async function apiFetch<T>(
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' = 'GET',
  body: object | FormData | null = null,
  headers: Record<string, string> = {}
): Promise<ApiResponse<T>> {
  const baseUrl = process.env.API_BASE_URL;
  if (!baseUrl) throw new Error('API_BASE_URL not defined');

  const url = `${baseUrl}${endpoint}`;
  const token = (await cookies()).get('accessToken')?.value;

  const defaultHeaders: Record<string, string> = {
    Accept: 'text/plain',
    ...(body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
    ...(token ? { Authorization: `Bearer ${token}` } : {}), // Adjust if API uses custom header
    ...headers,
  };

  const options: RequestInit = {
    method,
    headers: defaultHeaders,
    ...(body ? { body: body instanceof FormData ? body : JSON.stringify(body) } : {}),
  };

  try {
    const response = await fetch(url, options);
    const data: ApiResponse<T> = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `API request failed: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}