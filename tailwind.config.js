/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Ensure 'class' mode is properly set
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'], // Make sure all relevant paths are included
  theme: {
    extend: {
      borderRadius: {
        // Correctly define custom border radius using CSS variables
        lg: 'var(--radius, 0.5rem)', // Default fallback if --radius is not defined
        md: 'calc(var(--radius, 0.5rem) - 2px)', // Add default fallback values
        sm: 'calc(var(--radius, 0.5rem) - 4px)', // Add default fallback values
      },
      colors: {
        primary: '#3490dc', // Example of custom colors
        secondary: '#ffed4a',
        // Add other custom colors if needed
      },
    },
  },
  plugins: [require('tailwindcss-animate')], // Ensure plugin is properly included
};
