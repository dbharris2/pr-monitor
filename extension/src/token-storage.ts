export const TOKEN_KEY = 'gh_token';

export async function getToken(): Promise<string | null> {
  const result = await chrome.storage.local.get(TOKEN_KEY);
  const value = result[TOKEN_KEY];
  return typeof value === 'string' && value.length > 0 ? value : null;
}

export async function saveToken(token: string): Promise<void> {
  await chrome.storage.local.set({ [TOKEN_KEY]: token });
}

export async function deleteToken(): Promise<void> {
  await chrome.storage.local.remove(TOKEN_KEY);
}
