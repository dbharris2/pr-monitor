import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';

// In a real app, this should be in process.env.ENCRYPTION_KEY
// and must be 32 bytes (256 bits) for aes-256-cbc.
const ENCRYPTION_KEY =
  process.env.ENCRYPTION_KEY || '12345678901234567890123456789012';
const IV_LENGTH = 16; // For AES, this is always 16

export function encrypt(text: string) {
  const iv = randomBytes(IV_LENGTH);
  const cipher = createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
}

export function decrypt(text: string) {
  const textParts = text.split(':');
  const iv = Buffer.from(textParts.shift() as string, 'hex');
  const encryptedText = Buffer.from(textParts.join(':'), 'hex');
  const decipher = createDecipheriv(
    'aes-256-cbc',
    Buffer.from(ENCRYPTION_KEY),
    iv
  );
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}