import { NextResponse, type NextRequest } from 'next/server';
import { SERVER_API_ENDPOINTS } from '@/lib/config';

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();

        const backendResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/upload`, {
            method: 'POST',
            headers: {
                'Authorization': request.headers.get('Authorization') || '',
            },
            body: formData,
        });

        const data = await backendResponse.json();

        if (!backendResponse.ok) {
            return NextResponse.json(data, { status: backendResponse.status });
        }

        return NextResponse.json(data);
    } catch (err) {
        console.error('Upload error:', err);
        return NextResponse.json(
            { success: false, message: 'Upload failed' },
            { status: 500 }
        );
    }
}
