    /** @type {import('tailwindcss').Config} */
    export default {
      darkMode: 'class', // Enable dark mode based on 'dark' class on HTML
      content: [
        "./index.html", // Your main HTML file
        "./src/**/*.{js,ts,jsx,tsx}", // All your JS, TS, JSX, TSX files in src/
      ],
      theme: {
        extend: {},
      },
      plugins: [],
    }
    