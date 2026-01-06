'use server';

import { cookies } from 'next/headers';

import { encrypt } from 'utils/encryption';

export async function saveToken(token: string) {
  if (!token) return;
  const encrypted = encrypt(token);
  const cookieStore = await cookies();
  cookieStore.set('gh_token', encrypted, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
}

export async function deleteToken() {
  const cookieStore = await cookies();
  cookieStore.delete('gh_token');
}

export async function hasToken() {
  const cookieStore = await cookies();
  return cookieStore.has('gh_token');
}