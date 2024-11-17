/** @type {import('tailwindcss').Config} */
export default {
  daisyui: {
    themes: ["light", "dark", "cupcake"],
  },
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // primary: '#3490dc', // Normal
        // 'primary-dark': '#2779bd', // Hover
        // 'primary-darker': '#1c3d5a', // Active
        // secondary: '#4caf50', // Normal
        // 'secondary-dark': '#43a047', // Hover
        // 'secondary-darker': '#388e3c', // Active
        cancel: '#f44336', // Normal
        'cancel-dark': '#e53935', // Hover
        'cancel-darker': '#d32f2f', // Active
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
};
