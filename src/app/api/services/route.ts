import { NextResponse, type NextRequest } from 'next/server';

type RouteParams = {
  params: {
    id: string;
  };
};

type Handler = (request: NextRequest, context: { params: Promise<{}> }) => Promise<Response>;

const BACKEND_URL = 'http://localhost:5000/api/services';

async function handleRequest(request: NextRequest, method: string, id: string = '') {
  try {
    const url = new URL(request.url);
    const backendUrl = id ? `${BACKEND_URL}/${id}` : BACKEND_URL;
    
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
