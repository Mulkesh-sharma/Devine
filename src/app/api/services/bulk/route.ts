import { NextResponse, type NextRequest } from 'next/server';
import { SERVER_API_ENDPOINTS } from '@/lib/config';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const backendResponse = await fetch(`${SERVER_API_ENDPOINTS.SERVICES.CREATE.replace('/api/services', '/api/services/bulk')}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': request.headers.get('Authorization') || '',
            },
            body: JSON.stringify(body)
        });

        const data = await backendResponse.json();

        if (!backendResponse.ok) {
            return NextResponse.json(data, { status: backendResponse.status });
        }

        return NextResponse.json(data);
    } catch (err) {
        console.error('Bulk upload error:', err);
        return NextResponse.json(
            { success: false, message: 'Server error' },
            { status: 500 }
        );
    }
}
