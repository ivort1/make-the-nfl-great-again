import { NextResponse } from 'next/server';
import fetch from 'node-fetch';

export async function GET() {
  // Call an external API
  const response = await fetch(`https://api.sleeper.app/v1/league/${process.env.NEXT_PUBLIC_SLEEPER_LEAGUE_ID}/users`);
  const data = await response.json();
  let users = [];

  if(data && data.length > 0) {
    users = data.map(user => (
      {
        user_id: user.user_id,
        display_name: user.display_name,
        team_name: "team_name" in user.metadata ? user.metadata.team_name : null,
        avatar: user.avatar
      }
    ))
  }

  return NextResponse.json(users);
}