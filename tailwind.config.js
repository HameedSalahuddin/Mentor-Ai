/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gh: {
          bg: '#0d1117',         // Main background
          canvas: '#161b22',     // Cards / Containers
          header: '#010409',     // Top Navigation
          border: '#30363d',     // Subtle dividers
          hover: '#21262d',      // Button hover state
          text: '#c9d1d9',       // Primary text
          muted: '#8b949e',      // Secondary text / subtitles
          accent: '#58a6ff',     // GitHub Link Blue
          green: '#238636',      // GitHub Green (Buttons/Badges)
          greenHover: '#2ea043',
        },
      },
      fontFamily: {
        mono: ['ui-monospace', 'SFMono-Regular', 'SF Mono', 'Menlo', 'Consolas', 'Liberation Mono', 'monospace'],
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Helvetica', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
