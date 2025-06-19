/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
      "./index.html",
      "./src/**/*.{js,jsx}",
    ],
    theme: {
      container: {
        center: true,
        padding: '2rem',
        screens: {
          '2xl': '1400px'
        }
      },
      extend: {
        colors: {
          primary: '#8B5CF6',    // Violet-500
          secondary: '#6366F1',   // Indigo-500
          accent: '#EC4899',      // Pink-500
          dark: '#1E1B4B',        // Indigo-900
          light: '#F1F5F9'        // Slate-100
        },
        backgroundImage: {
          'gradient-main': 'linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)',
          'gradient-dark': 'linear-gradient(135deg, #1E1B4B 0%, #312E81 100%)'
        },
        keyframes: {
          'fade-in': {
            '0%': {
              opacity: '0',
              transform: 'translateY(10px)'
            },
            '100%': {
              opacity: '1',
              transform: 'translateY(0)'
            }
          },
          'progress': {
            '0%': { width: '0%' },
            '100%': { width: '100%' }
          },
          'pulse-purple': {
            '0%, 100%': {
              boxShadow: '0 0 0 0 rgba(139, 92, 246, 0.7)'
            },
            '70%': {
              boxShadow: '0 0 0 10px rgba(139, 92, 246, 0)'
            }
          }
        },
        animation: {
          'fade-in': 'fade-in 0.3s ease-out',
          'progress': 'progress 2.5s ease-out',
          'pulse-purple': 'pulse-purple 2s infinite'
        }
      },
    },
    plugins: [],
  };