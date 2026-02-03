/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'mayai-bg': '#0f0f23',
        'mayai-card': '#16213e',
        'mayai-header': '#1a1a2e',
        'mayai-accent': '#00d4ff',
        'mayai-success': '#4ade80',
        'mayai-warning': '#facc15',
        'mayai-danger': '#ef4444',
      },
    },
  },
  plugins: [],
}
