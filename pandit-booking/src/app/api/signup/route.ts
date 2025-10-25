import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
  const newUser = await req.json();
  const filePath = path.join(process.cwd(), 'src', 'lib', 'users', 'users.json');
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  if (data.find((u: any) => u.email === newUser.email || u.phone === newUser.phone)) {
    return NextResponse.json({ message: 'User already exists' }, { status: 400 });
  }

  data.push(newUser);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

  // Remove password from response for security
  const { password: _, ...userWithoutPassword } = newUser;
  return NextResponse.json({ message: 'Signup successful', user: userWithoutPassword });
}
