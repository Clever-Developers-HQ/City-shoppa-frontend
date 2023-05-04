/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // this includes files from the monorepo base two directories up
    outputFileTracingRoot: path.join(__dirname, '../../'),
  },
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
