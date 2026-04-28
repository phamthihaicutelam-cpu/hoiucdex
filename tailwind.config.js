/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        accent: '#ff6b35',
        'accent-light': '#ff9a5c',
        bg: '#0f0f13',
        bg2: '#1a1a22',
        bg3: '#22222e',
      },
    },
  },
  plugins: [],
};
