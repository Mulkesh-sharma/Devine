import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
  const { identifier, password } = await req.json();

  if (!identifier || !password) {
    return NextResponse.json({ message: 'Email/Phone and password are required' }, { status: 400 });
  }

  const filePath = path.join(process.cwd(), 'src', 'lib', 'users', 'users.json');

  try {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const user = data.find((u: any) =>
      (u.email === identifier || u.phone === identifier) && u.password === password
    );

    if (user) {
      // Remove password from response for security
      const { password: _, ...userWithoutPassword } = user;
      return NextResponse.json({
        message: 'Login successful',
        user: userWithoutPassword
      });
    } else {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
