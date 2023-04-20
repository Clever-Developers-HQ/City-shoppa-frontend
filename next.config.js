/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // loaderFile: './src/components/loader/Loader.tsx',
    domains: [
      'images.unsplash.com',
      'fastly.picsum.photos',
      'images.unsplash.com',
      'images.unsplash.com',
      'images.unsplash.com',
      'res.cloudinary.com',
      'graphicsfamily.com',
    ],

    remotePatterns: [
      {
        // protocol: 'https',
        port: '',
        hostname: '**.com',
        pathname: '**',
      },
    ],
  },
}

module.exports = nextConfig
