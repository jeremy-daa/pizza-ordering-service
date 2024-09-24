import { defineAbilitiesFor } from "@/lib/abilities";
import { getAuthSession } from "@/lib/authOptions";
import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  //   const password = "test";
  //   const hashedPassword = await bcrypt.hash(password, 10);

  const user = await sql`
            SELECT * FROM users WHERE email = 'testuser@example.com'`;

  console.log(user.rows[0]);
  return NextResponse.json({ users: user.rows }, { status: 200 });
}
