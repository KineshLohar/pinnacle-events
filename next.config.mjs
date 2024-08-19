/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['res.cloudinary.com'], // Add any other domains you need
      },
    // async rewrites() {
    //     return [
    //       {
    //         source: '/:path*',
    //         destination: '/',
    //       },
    //     ];
    // }
};

export default nextConfig;
