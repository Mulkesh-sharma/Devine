import { NextResponse, type NextRequest } from 'next/server';
import { SERVER_API_ENDPOINTS } from '@/lib/config';

type RouteParams = {
  params: {
    id: string;
  };
};

type Handler = (request: NextRequest, context: { params: Promise<{}> }) => Promise<Response>;

const SERVICES_ENDPOINTS = SERVER_API_ENDPOINTS.SERVICES;

async function handleRequest(request: NextRequest, method: string, id: string = '') {
  try {
    const url = new URL(request.url);
    const backendUrl = id ? SERVICES_ENDPOINTS.GET_BY_ID(id) : SERVICES_ENDPOINTS.GET_ALL;

    // For GET requests, forward query parameters
    const queryString = method === 'GET' ? url.searchParams.toString() : '';
    const fullUrl = queryString ? `${backendUrl}?${queryString}` : backendUrl;

    const requestBody = method !== 'GET' && method !== 'DELETE'
      ? await request.json()
      : undefined;

    const backendResponse = await fetch(fullUrl, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': request.headers.get('Authorization') || '',
      },
      body: requestBody ? JSON.stringify(requestBody) : undefined,
    });

    const data = await backendResponse.json();

    if (!backendResponse.ok) {
      return NextResponse.json(data, { status: backendResponse.status });
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error(`Services ${method} error:`, err);
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}

export const GET: Handler = async (request) => {
  return handleRequest(request, 'GET');
};

export const POST: Handler = async (request) => {
  return handleRequest(request, 'POST');
};

export const PUT: Handler = async (request, context) => {
  const params = await context.params;
  const id = 'id' in params ? String(params.id) : '';
  return handleRequest(request, 'PUT', id);
};

export const DELETE: Handler = async (request, context) => {
  const params = await context.params;
  const id = 'id' in params ? String(params.id) : '';
  return handleRequest(request, 'DELETE', id);
};
