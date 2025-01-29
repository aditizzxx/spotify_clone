import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {},

            async authorize(credentials) {
                const { email, id, token,name,img, role } = credentials;
                
                return { id: id, user: email, token,name,img,role };
                // return { user: email, role_id: role_id , token };
            },
        })
    ],
    session: {
        jwt: true,
    },
    callbacks: {
        async jwt({ token, user }) {
            return { ...token, ...user };
        },
        async session({ session, token, email }) {
            session.user = token;
            return session;
        },
        async redirect({ url, baseUrl }) {
            return baseUrl;
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/login",
    },

};

const handler = NextAuth(authOptions);
export default NextAuth(authOptions);
export { handler as GET, handler as POST }