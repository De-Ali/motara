/** @type {import('next').NextConfig} */
// GitHub Pages deploy: static export under /motara basePath.
// Set NEXT_PUBLIC_BASE_PATH=/motara at build time (CI workflow does this).
const isPages = process.env.GITHUB_PAGES === 'true';
const basePath = isPages ? '/motara' : '';

const nextConfig = {
  reactStrictMode: true,
  output: isPages ? 'export' : undefined,
  basePath,
  assetPrefix: basePath || undefined,
  trailingSlash: isPages,
  images: {
    unoptimized: isPages,
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'plus.unsplash.com' },
      { protocol: 'https', hostname: 'source.unsplash.com' }
    ]
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath
  }
};

// `headers()` is not supported with `output: 'export'`.
if (!isPages) {
  nextConfig.headers = async () => [
    {
      source: '/(.*)',
      headers: [
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' }
      ]
    },
    {
      source: '/sw.js',
      headers: [
        { key: 'Content-Type', value: 'application/javascript; charset=utf-8' },
        { key: 'Cache-Control', value: 'no-cache, no-store, must-revalidate' }
      ]
    }
  ];
}

export default nextConfig;
