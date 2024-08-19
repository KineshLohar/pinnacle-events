import { withAuth } from 'next-auth/middleware';

export default withAuth({
  callbacks: {
    authorized: ({ req, token }) => {
      if (req.nextUrl.pathname.startsWith('/admin') && token) {
        return true;
      }
      return false;
    },
  },
});

export const config = { matcher: ['/admin/:path*'] };