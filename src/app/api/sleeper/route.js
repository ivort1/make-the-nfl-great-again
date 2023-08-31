import { NextResponse } from 'next/server';
import fetch from 'node-fetch';

export async function GET() {
  // Call an external API
  const response = await fetch(`https://api.sleeper.app/v1/league/${process.env.NEXT_PUBLIC_SLEEPER_LEAGUE_ID}/users`);
  const data = await response.json();
  console.log(data);

  return NextResponse.json(data);
}