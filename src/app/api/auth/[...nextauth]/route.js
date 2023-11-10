import { connect } from "@/db/dbConfig"
import User from "@/models/userModel"
import NextAuth from "next-auth/next"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from 'next-auth/providers/google'

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
                if (!user.password) {
                    throw new Error("Continue with Google, or click forgot password to set the password... :)")
                }

                const validPassword = await bcryptjs.compare(password, user.password)
                if (!validPassword) {
                    throw new Error("Invalid Credentials")
                }

                return { message: "Login successful", success: true, status: 200, id: user._id, isAdmin: user.isAdmin, email: user.email, username: user.username }
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
    ],
    callbacks: {
        jwt(params) {
            if (params.user) {
                params.token.isAdmin = params.user.isAdmin
                params.token.id = params.user.id
                params.token.username = params.user.username
            }
            return params.token
        },
        session({ session, token }) {
            if (session.user) {
                session.user.id = token.id
                session.user.isAdmin = token.isAdmin
                session.user.username = token.username
            }
            return session
        },
        async signIn({ user, account }) {

            if (account.provider === 'google') {
                const { name, email } = user

                await connect()

                const userInfo = await User.findOne({ email })
                if (userInfo) {
                    if (!userInfo.isVerified) {
                        userInfo.isVerified = true
                        userInfo.verifyToken = undefined
                        userInfo.verifyTokenExpiry = undefined

                        await userInfo.save()
                    }

                    user.id = userInfo._id
                    user.isAdmin = userInfo.isAdmin
                    user.username = userInfo.username

                    return user
                }
                else {
                    const newUser = new User({
                        username: name,
                        email,
                        isVerified: true,
                    })
                    const savedUser = await newUser.save()

                    user.id = savedUser._id
                    user.isAdmin = savedUser.isAdmin
                    user.username = name

                    return user
                }

            }
            else return user
        }
    },
    secret: process.env.NEXTAUTH_SECRET
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }