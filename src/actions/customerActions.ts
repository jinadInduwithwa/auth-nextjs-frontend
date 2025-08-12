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
} from '../types/types';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { nanoid } from 'nanoid';

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
  mode: string = '1'
): Promise<ApiResponse<VerifyPhoneResponse> | { error: string }> {
  try {
    const data = await apiFetch<VerifyPhoneResponse>(
      `/api/Customer/VerifyPhone/${encodeURIComponent(phoneNumber)}?mode=${encodeURIComponent(mode)}`,
      'POST',
      {Accept : 'text/plain'},
      { AccessToken: 'fit360' }
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
      'PUT',
      {Accept : 'text/plain'},
      { AccessToken: 'fit360' }
    );
    return data;
  } catch (error) {
    return { error: (error as Error).message };
  }
}

export async function saveImages(
  originalFile: File | null,
  croppedImageBase64: string | null
): Promise<{ image: string | null; fullSizeImage: string | null } | { error: string }> {
  try {
    const uploadDir = join(process.cwd(), 'public/uploads');
    await mkdir(uploadDir, { recursive: true });

    let imagePath: string | null = null;
    let fullSizeImagePath: string | null = null;

    if (originalFile) {
      const originalFileExtension = originalFile.name.split('.').pop() || 'jpg';
      const originalFileName = `${nanoid()}.${originalFileExtension}`;
      const originalFilePath = join(uploadDir, originalFileName);
      const originalBuffer = Buffer.from(await originalFile.arrayBuffer());
      await writeFile(originalFilePath, originalBuffer);
      fullSizeImagePath = `/uploads/${originalFileName}`;
    }

    if (croppedImageBase64) {
      const croppedFileName = `${nanoid()}.jpg`;
      const croppedFilePath = join(uploadDir, croppedFileName);
      const croppedBuffer = Buffer.from(croppedImageBase64.split(',')[1], 'base64');
      await writeFile(croppedFilePath, croppedBuffer);
      imagePath = `/uploads/${croppedFileName}`; // Fixed: Use croppedFileName
    }

    return { image: imagePath, fullSizeImage: fullSizeImagePath };
  } catch (error) {
    console.error('SaveImages Error:', error);
    return { error: (error as Error).message };
  }
}

// Register user
export async function registerUser(
  body: RegisterRequest
): Promise<ApiResponse<any> | { error: string }> {
  try {
    console.log('registerUser Payload:', body); // Debug
    const data = await apiFetch<any>(
      '/api/Customer/Register',
      'POST',
      body,
      { AccessToken: 'fit360' }
    );
    console.log('registerUser Response:', data); // Debug
    if (data.isSuccessful) {
      revalidatePath('/');
      redirect('/dashboard');
    }
    return data;
  } catch (error) {
    console.error('registerUser Error:', error);
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