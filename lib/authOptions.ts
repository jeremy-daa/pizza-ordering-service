import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getServerSession } from "next-auth";
import bcrypt from "bcrypt";
import { sql } from "@vercel/postgres";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password) {
          return null;
        }

        try {
          // SQL query to find the user by email
          const userResult = await sql`
            SELECT id, name, email, password, role FROM users WHERE email = ${credentials.email}
          `;

          if (userResult.rows.length === 0) {
            // User not found
            return null;
          }

          const user = userResult.rows[0];
          console.log("User found: ", user);

          // Compare the provided password with the hashed password in the database
          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isPasswordValid) {
            // Password is incorrect
            return null;
          }

          // Create user object to return (could add more fields as necessary)
          const authorizedUser = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          };

          return authorizedUser; // Return user if authentication is successful
        } catch (error) {
          console.error("Authorization error:", error);
          return null; // Return null in case of error
        }
      },
    }),
  ],
};

export const getAuthSession = () => getServerSession(authOptions);
