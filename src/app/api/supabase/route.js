import { NextResponse } from 'next/server';
import fetch from 'node-fetch';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export async function GET() {
    let users;

    try {
        [users] = await Promise.all([
            supabase.from("user").select()
        ]);

        users = users.data;
    } catch(error) {
        console.log(error);
    }

    console.log(users);

  return NextResponse.json(users);
}