import { NextResponse, NextRequest } from 'next/server';
import axios from 'axios';

export async function middleware(req: NextRequest) {
    // Construct the URL for the backend authentication check
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login/success`;

    try {
        // Make the request to the backend API, including cookies from the request
        const response = await axios.get(url, {
            headers: {
                Cookie: req.headers.get('cookie') || '',
            },
            withCredentials: true,
        });

        // Check the response status and data to determine authentication
        if (response.status === 200 && response.data) {
            // User is authenticated, proceed to the next middleware or request handler
            return NextResponse.next();
        } else {
            // User is not authenticated, redirect to the login page
            const loginUrl = new URL('/login', req.url);
            return NextResponse.redirect(loginUrl);
        }
    } catch (error) {
        // Handle errors (e.g., network issues, unauthorized status)
        const loginUrl = new URL('/login', req.url);
        return NextResponse.redirect(loginUrl);
    }
}

// Apply this middleware to protected routes
export const config = {
    matcher: ['/dashboard/:path*'], // Adjust the matcher to your protected routes
};
