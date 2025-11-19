import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Build query string for backend
    const queryString = searchParams.toString();
    const backendUrl = `http://localhost:5000/api/services${queryString ? `?${queryString}` : ''}`;
    
    // Forward the request to the backend API
    const backendResponse = await fetch(backendUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await backendResponse.json();

    if (!backendResponse.ok) {
      return NextResponse.json(data, { status: backendResponse.status });
    }

    // Return the backend response
    return NextResponse.json(data);
  } catch (err) {
    console.error('Services proxy error:', err);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
