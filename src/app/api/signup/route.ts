import { NextResponse } from 'next/server';
import { SERVER_API_ENDPOINTS } from '@/lib/config';

export async function POST(req: Request) {
  const userData = await req.json();

  try {
    console.log('Sending signup request to backend:', SERVER_API_ENDPOINTS.AUTH.REGISTER);
    console.log('Payload:', {
      name: userData.name || `${userData.firstName} ${userData.lastName}`.trim(),
      email: userData.email,
      password: userData.password,
      phone: userData.phone,
      role: userData.role || 'user',
      age: userData.age,
      address: userData.address
    });

    // Sanitize phone number (remove non-digits)
    const cleanPhone = userData.phone.replace(/\D/g, '').slice(-10);

    // Forward the request to the backend API
    const backendResponse = await fetch(SERVER_API_ENDPOINTS.AUTH.REGISTER, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: userData.name || `${userData.firstName} ${userData.lastName}`.trim(),
        email: userData.email,
        password: userData.password,
        phone: cleanPhone,
        role: userData.role || 'user',
        // Pass other fields if backend supports them, or ignore
        age: userData.age,
        address: userData.address
      }),
    });

    const data = await backendResponse.json();
    console.log('Backend response:', backendResponse.status, data);

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
