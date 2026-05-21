/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  transpilePackages: ['@pr-monitor/ui'],
  compiler: {
    relay: {
      src: '../ui/components',
      language: 'typescript',
      schema: '../ui/data/schema.graphql',
      excludes: [
        '**/node_modules/**',
        '**/__mocks__/**',
        '**/__generated__/**',
      ],
    },
  },
};

export default nextConfig;
