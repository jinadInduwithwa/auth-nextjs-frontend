'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { apiFetch } from '../lib/api';
import {
  ApiResponse,
  VerifyPhoneResponse,
  SignInResponse,
  RegisterRequest,
  ChangePasswordRequest,
  ResetPasswordRequest,
} from '../lib/types';

// Helper to set token
async function setAccessToken(token: string) {
  (await cookies()).set('accessToken', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24, // 1 day
    path: '/',
  });
}

// Verify Phone (POST: Send OTP)
export async function verifyPhoneSend(
  phoneNumber: string,
  mode: string
): Promise<ApiResponse<VerifyPhoneResponse> | { error: string }> {
  try {
    const data = await apiFetch<VerifyPhoneResponse>(
      `/api/Customer/VerifyPhone/${encodeURIComponent(phoneNumber)}?mode=${encodeURIComponent(mode)}`,
      'POST'
    );
    return data;
  } catch (error) {
    return { error: (error as Error).message };
  }
}

// Verify Phone (PUT: Confirm OTP)
export async function verifyPhoneConfirm(
  phoneNumber: string,
  code: string
): Promise<ApiResponse<VerifyPhoneResponse> | { error: string }> {
  try {
    const data = await apiFetch<VerifyPhoneResponse>(
      `/api/Customer/VerifyPhone/${encodeURIComponent(phoneNumber)}?code=${encodeURIComponent(code)}`,
      'PUT'
    );
    return data;
  } catch (error) {
    return { error: (error as Error).message };
  }
}

// Sign In
export async function signIn(
  _prevState: any,
  formData: FormData
): Promise<ApiResponse<SignInResponse> | { error: string }> {
  const phoneNumber = formData.get('phoneNumber') as string;
  const password = formData.get('password') as string;

  if (!phoneNumber || !password) {
    return { error: 'Phone number and password are required' };
  }

  try {
    const data = await apiFetch<SignInResponse>('/api/Customer/SignIn', 'POST', {
      phoneNumber,
      password,
    });
    if (data.isSuccessful && data.content.accessToken) {
      setAccessToken(data.content.accessToken);
      revalidatePath('/');
      redirect('/dashboard');
    }
    return data;
  } catch (error) {
    return { error: (error as Error).message };
  }
}

// Register
export async function register(
  _prevState: any,
  formData: FormData
): Promise<ApiResponse<VerifyPhoneResponse> | { error: string }> {
  const body: RegisterRequest = {
    contactNumber: formData.get('contactNumber') as string,
    dateOfBirth: formData.get('dateOfBirth') as string,
    firstName: formData.get('firstName') as string,
    gender: formData.get('gender') as string,
    lastName: formData.get('lastName') as string,
    image: formData.get('image') as string,
    fullSizeImage: formData.get('fullSizeImage') as string,
  };

  if (!body.contactNumber || !body.firstName || !body.lastName) {
    return { error: 'Required fields are missing' };
  }

  try {
    const data = await apiFetch<VerifyPhoneResponse>('/api/Customer/Register', 'POST', body);
    return data;
  } catch (error) {
    return { error: (error as Error).message };
  }
}

// Change Password
export async function changePassword(
  _prevState: any,
  formData: FormData
): Promise<ApiResponse<SignInResponse> | { error: string }> {
  const body: ChangePasswordRequest = {
    oldPassword: formData.get('oldPassword') as string,
    newPassword: formData.get('newPassword') as string,
  };

  if (!body.oldPassword || !body.newPassword) {
    return { error: 'Old and new passwords are required' };
  }

  try {
    const data = await apiFetch<SignInResponse>('/api/Customer/Password/Change', 'PUT', body);
    return data;
  } catch (error) {
    return { error: (error as Error).message };
  }
}

// Reset Password
export async function resetPassword(
  _prevState: any,
  formData: FormData
): Promise<ApiResponse<SignInResponse> | { error: string }> {
  const body: ResetPasswordRequest = {
    phoneNumber: formData.get('phoneNumber') as string,
    code: formData.get('code') as string,
    password: formData.get('password') as string,
  };

  if (!body.phoneNumber || !body.code || !body.password) {
    return { error: 'Phone number, code, and password are required' };
  }

  try {
    const data = await apiFetch<SignInResponse>('/api/Customer/Password/Reset', 'PUT', body);
    return data;
  } catch (error) {
    return { error: (error as Error).message };
  }
}

// Logout
export async function logout() {
  (await cookies()).delete('accessToken');
  redirect('/signin');
}