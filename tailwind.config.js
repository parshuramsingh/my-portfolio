    /** @type {import('tailwindcss').Config} */
    export default {
      darkMode: 'class', // Enable dark mode based on 'dark' class on HTML
      content: [
        "./index.html", // Your main HTML file
        "./src/**/*.{js,ts,jsx,tsx}", // All your JS, TS, JSX, TSX files in src/
      ],
      theme: {
        extend: {
          fontFamily: {
            sans: ['Outfit', 'ui-sans-serif', 'system-ui', 'sans-serif'],
            serif: ['"Instrument Serif"', 'Georgia', 'serif'],
          },
          colors: {
            ink: '#17191f',
            paper: '#f3f0e8',
            night: '#07080c',
          },
        },
      },
      plugins: [],
    }
    