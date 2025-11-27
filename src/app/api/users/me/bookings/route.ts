import { NextResponse } from 'next/server';
import { SERVER_API_ENDPOINTS } from '@/lib/config';

export async function GET(request: Request) {
    try {
        // Get token from Authorization header
        const authHeader = request.headers.get('authorization');
        const token = authHeader?.replace('Bearer ', '');

        if (!token) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        const url = new URL(request.url);
        const userId = url.searchParams.get('userId');

        let backendUrl = SERVER_API_ENDPOINTS.BOOKINGS.GET_USER_BOOKINGS;

        if (userId) {
            backendUrl = SERVER_API_ENDPOINTS.USERS.GET_USER_BOOKINGS(userId);
        }

        console.log('Fetching user bookings from:', backendUrl);
        console.log('Token present:', !!token);
        console.log('User ID provided:', userId);

        const backendResponse = await fetch(backendUrl, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await backendResponse.json();
        console.log('Backend response status:', backendResponse.status);
        console.log('Backend response data:', JSON.stringify(data, null, 2));

        if (!backendResponse.ok) {
            return NextResponse.json(data, { status: backendResponse.status });
        }

        return NextResponse.json(data);
    } catch (err) {
        console.error('User bookings proxy error:', err);
        return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
    }
}
