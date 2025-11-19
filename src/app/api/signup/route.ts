import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const userData = await req.json();

  try {
    // Forward the request to the backend API
    const backendResponse = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: userData.name,
        email: userData.email,
        password: userData.password,
        phone: userData.phone,
        role: userData.role || 'user'
      }),
    });

    const data = await backendResponse.json();

    if (!backendResponse.ok) {
      return NextResponse.json(data, { status: backendResponse.status });
    }

    // Return the backend response
    return NextResponse.json(data);
  } catch (error) {
    console.error('Signup proxy error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
