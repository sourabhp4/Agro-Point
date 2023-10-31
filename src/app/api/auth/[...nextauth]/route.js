import { connect } from "@/db/dbConfig"
import User from "@/models/userModel"
import NextAuth from "next-auth/next"
import CredentialsProvider from "next-auth/providers/credentials"

import bcryptjs from "bcryptjs"

export const authOptions = {
    session: {
        strategy: 'jwt'
    },
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {},
            async authorize(credentials, req) {
                const { email, password } = credentials

                await connect()

                const user = await User.findOne({ email })
                if (!user) {
                    throw new Error("Invalid Credentials")
                }
                if (!user.isVerified) {
                    throw new Error("Account verification pending. If emailed token have become invalid, Please Register again")
                }

                const validPassword = await bcryptjs.compare(password, user.password)
                if (!validPassword) {
                    throw new Error("Invalid Credentials")
                }

                return { message: "Login successful", success: true, status: 200, id: user._id, isAdmin: user.isAdmin, email: user.email, username: user.username }
            }
        }),
    ],
    callbacks: {
        jwt(params) {
            if(params.user){
                params.token.isAdmin = params.user.isAdmin
                params.token.id = params.user.id
                params.token.username = params.user.username
            }
            return params.token
        },
        session({ session, token }) {
            if(session.user){
                session.user.id = token.id
                session.user.isAdmin = token.isAdmin
                session.user.username = token.username
            }
            return session
        }
    },
    secret: process.env.NEXTAUTH_SECRET
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }