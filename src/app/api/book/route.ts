// app/api/book/route.ts
import { NextResponse } from 'next/server';
import { SERVER_API_ENDPOINTS } from '@/lib/config';

export async function POST(request: Request) {
  try {
    const bookingData = await request.json();
    
    // Get token from Authorization header
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');
    
    // Transform frontend booking data to backend format
    const backendBookingData = {
      service: bookingData.serviceId,
      bookingDate: bookingData.dateTime ? new Date(bookingData.dateTime).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      bookingTime: bookingData.dateTime ? new Date(bookingData.dateTime).toTimeString().split(' ')[0].substring(0, 5) : '10:00',
      address: 'At user location', // Default value, can be updated
      contactPerson: bookingData.name,
      contactPhone: bookingData.phone,
      poojaDetails: {
        title: bookingData.serviceTitle,
        specialInstructions: ''
      },
      pricing: {
        totalAmount: 0, // Will be calculated based on service
        currency: 'INR'
      }
    };
    
    // Forward the request to the backend API
    const backendResponse = await fetch(SERVER_API_ENDPOINTS.BOOKINGS.CREATE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
      },
      body: JSON.stringify(backendBookingData),
    });

    const data = await backendResponse.json();

    if (!backendResponse.ok) {
      return NextResponse.json(data, { status: backendResponse.status });
    }

    // Return the backend response
    return NextResponse.json(data);
  } catch (err) {
    console.error('Booking proxy error:', err);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
