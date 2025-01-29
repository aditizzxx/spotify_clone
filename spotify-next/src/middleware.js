export {default} from "next-auth/middleware";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";



// import protectedPage from 'next-auth/middleware';
// import {protectedPage} from "next-auth/middleware";

// export default protectedPage();

// export const config = {
    //     matcher: [
        //       /*
        //        * Match all request paths except for the ones starting with:
        //        * - api (API routes)
        //        * - _next/static (static files)
        //        * - _next/image (image optimization files)
        //        * - favicon.ico (favicon file)
        //        */
        //       '/((?!api|_next/static|_next/image|favicon.ico).*)',
//     ],
//   }

export async function middleware(request) {
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET});
    if (token?.role !== "superAdmin" && token?.role !== "artist") {
        if (request.nextUrl.pathname.startsWith("/admin")) {
            return NextResponse.redirect(new URL("/", request.url));
        }
    }

    if (!token){
        return NextResponse.redirect(new URL("/login", request.url));
    }
    else{
        return NextResponse.next();
    }
}

export const config = {matcher: ["/","/premium/:path*","/playlist","/artist","/search","/likedSongs","/admin"]};