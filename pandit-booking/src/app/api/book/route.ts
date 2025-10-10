// app/api/book/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // TODO: persist to DB or send email/SMS. For demo just echo back.
    console.log('Booking received:', body);
    return NextResponse.json({ ok: true, data: body });
  } catch (err) {
    return NextResponse.json({ ok: false, error: 'Invalid request' }, { status: 400 });
  }
}
