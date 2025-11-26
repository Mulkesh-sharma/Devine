import { NextResponse, type NextRequest } from 'next/server';
import { SERVER_API_ENDPOINTS } from '@/lib/config';

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const backendResponse = await fetch(`${SERVER_API_ENDPOINTS.SERVICES.GET_BY_ID(params.id)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': request.headers.get('Authorization') || '',
            },
        });

        const data = await backendResponse.json();

        if (!backendResponse.ok) {
            return NextResponse.json(data, { status: backendResponse.status });
        }

        return NextResponse.json(data);
    } catch (err) {
        console.error('Get service error:', err);
        return NextResponse.json(
            { success: false, message: 'Server error' },
            { status: 500 }
        );
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const body = await request.json();

        const backendResponse = await fetch(`${SERVER_API_ENDPOINTS.SERVICES.UPDATE(params.id)}`, {
            method: 'PUT',
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
        console.error('Update service error:', err);
        return NextResponse.json(
            { success: false, message: 'Server error' },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const backendResponse = await fetch(`${SERVER_API_ENDPOINTS.SERVICES.DELETE(params.id)}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': request.headers.get('Authorization') || '',
            },
        });

        const data = await backendResponse.json();

        if (!backendResponse.ok) {
            return NextResponse.json(data, { status: backendResponse.status });
        }

        return NextResponse.json(data);
    } catch (err) {
        console.error('Delete service error:', err);
        return NextResponse.json(
            { success: false, message: 'Server error' },
            { status: 500 }
        );
    }
}
