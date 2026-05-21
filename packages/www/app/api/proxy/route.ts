import { cookies } from 'next/headers';
import { type NextRequest, NextResponse } from 'next/server';

import { decrypt } from 'utils/encryption';

export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const encryptedToken = cookieStore.get('gh_token')?.value;

    if (!encryptedToken) {
      return NextResponse.json(
        { status: '401', message: 'Missing token' },
        { status: 401 }
      );
    }

    let decryptedToken;
    try {
      decryptedToken = decrypt(encryptedToken);
    } catch (e) {
      console.error('Decryption failed', e);
      return NextResponse.json(
        { status: '401', message: 'Invalid token' },
        { status: 401 }
      );
    }

    const body = await req.json();

    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${decryptedToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
