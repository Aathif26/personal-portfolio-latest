import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  const cookieStore = await cookies();
  const isAdmin = cookieStore.has('admin-session');
  return NextResponse.json({ isAdmin });
}
