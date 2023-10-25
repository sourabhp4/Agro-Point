import NextAuth from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions = {

    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {},
            async authorize(credentials, req) {
                const { email, password } = credentials
                if (email !== 'admin@gmail.com' || password !== 'admin@gmail.com')
                    return null
                return { id: '1', name: 'admin', email: 'admin@gmail.com' }
            }
        }),
    ],
    session: {
        strategy: 'jwt'
    },
    secret: process.env.NEXTAUTH_SECRET
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }