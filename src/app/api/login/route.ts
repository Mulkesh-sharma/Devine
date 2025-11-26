import { NextResponse } from 'next/server';
import { SERVER_API_ENDPOINTS } from '@/lib/config';

export async function POST(req: Request) {
  const { identifier, password } = await req.json();

  if (!identifier || !password) {
    return NextResponse.json({ message: 'Email/Phone and password are required' }, { status: 400 });
  }

  try {
    // Forward the request to the backend API
    const backendResponse = await fetch(SERVER_API_ENDPOINTS.AUTH.LOGIN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: identifier, // Backend expects email
        password
      }),
    });

    const data = await backendResponse.json();

    if (!backendResponse.ok) {
      return NextResponse.json(data, { status: backendResponse.status });
    }

    // Return the backend response
    return NextResponse.json(data);
  } catch (error) {
    console.error('Login proxy error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
