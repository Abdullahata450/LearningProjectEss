import { NextAuthOptions } from "next-auth";
import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";

const users = [ //for testing
    {
        id: "1",
        name: "John Doe",
        email: "john@example.com",
        password: "1234",
        role: "admin",
    },
    {
        id: "2",
        name: "Jane Smith",
        email: "jane@example.com",
        password: "1234",
        role: "user",
    },
];


export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },

            async authorize(credentials): Promise<any> {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Please enter email and password");
                }

                const user = users.find(user => user.email === credentials.email);

                if (!user) {
                    throw new Error("No user found with the given email");
                }

                //   const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

                const isPasswordValid = credentials.password === user.password;

                if (!isPasswordValid) {
                    throw new Error("Invalid password");
                }

                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                }
            },

        }),

        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            authorization: {params: { scope: "openid email profile" } },
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        })

    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
                token.role = user.role;

            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id;
                session.user.name = token.name;
                session.user.email = token.email;
                session.user.role = token.role;
            }
            return session;
        },
        async redirect({ url, baseUrl }) {
            return `${baseUrl}/dashboard`;
        }
    },

    session: {
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET,
}