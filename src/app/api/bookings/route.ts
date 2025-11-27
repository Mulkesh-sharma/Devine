import { NextResponse } from 'next/server';
import { SERVER_API_ENDPOINTS } from '@/lib/config';

export async function POST(request: Request) {
    try {
        const bookingData = await request.json();

        // Get token from Authorization header
        const authHeader = request.headers.get('authorization');
        const token = authHeader?.replace('Bearer ', '');

        if (!token) {
            console.error('Missing authorization token');
            return NextResponse.json({ success: false, message: 'Unauthorized: No token provided' }, { status: 401 });
        }

        console.log('Received Token (first 20 chars):', token.substring(0, 20));
        console.log('Received Token Length:', token.length);

        console.log('Proxying booking request to:', SERVER_API_ENDPOINTS.BOOKINGS.CREATE);

        // Forward the request to the backend API
        const backendResponse = await fetch(SERVER_API_ENDPOINTS.BOOKINGS.CREATE, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(bookingData),
        });

        console.log('Backend Response Status:', backendResponse.status);
        const data = await backendResponse.json();
        console.log('Backend Response Data:', JSON.stringify(data, null, 2));

        if (!backendResponse.ok) {
            console.error('Backend error:', data);
            return NextResponse.json(data, { status: backendResponse.status });
        }

        return NextResponse.json(data);
    } catch (err) {
        console.error('Booking proxy error:', err);
        return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
    }
}

export async function GET(request: Request) {
    try {
        // Get token from Authorization header
        const authHeader = request.headers.get('authorization');
        const token = authHeader?.replace('Bearer ', '');

        if (!token) {
            console.error('GET Bookings - Missing authorization token');
            return NextResponse.json({ success: false, message: 'Unauthorized: No token provided' }, { status: 401 });
        }

        console.log('Proxying GET bookings request to:', SERVER_API_ENDPOINTS.BOOKINGS.GET_ALL);

        // Forward the request to the backend API
        // Note: We need to append query parameters if any
        const url = new URL(request.url);
        const queryParams = url.searchParams.toString();
        const backendUrl = `${SERVER_API_ENDPOINTS.BOOKINGS.GET_ALL}${queryParams ? `?${queryParams}` : ''}`;

        const backendResponse = await fetch(backendUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        console.log('Backend GET Response Status:', backendResponse.status);
        const data = await backendResponse.json();

        if (!backendResponse.ok) {
            console.error('Backend GET error:', data);
            return NextResponse.json(data, { status: backendResponse.status });
        }

        return NextResponse.json(data);
    } catch (err) {
        console.error('Booking GET proxy error:', err);
        return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
    }
}
