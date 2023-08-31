import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export async function GET() {
    let users;

    try {
        [users] = await Promise.all([
            supabase.from("user").select()
        ]);

        users = users.data.filter(user => user.active);
    } catch(error) {
        console.log(error);
    }

  return NextResponse.json(users);
}