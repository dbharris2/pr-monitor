import type { Config } from 'tailwindcss';

import preset from '../ui/tailwind-preset';

const config: Config = {
  presets: [preset],
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './popup.html',
    '../ui/components/**/*.{js,ts,jsx,tsx,mdx}',
    '../ui/utils/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  plugins: [],
};

export default config;
