/** @type {import('next').NextConfig} */

import relay from './relay.config.js';

const nextConfig = {
  reactCompiler: true,
  compiler: {
    relay,
  },
};

export default nextConfig;
