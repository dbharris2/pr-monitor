/** @type {import('next').NextConfig} */

import relay from './relay.config.js';

const nextConfig = {
  compiler: {
    relay,
  },
};

export default nextConfig;
