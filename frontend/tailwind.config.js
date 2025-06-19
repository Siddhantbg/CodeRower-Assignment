/** @type {import('tailwindcss').Config} */ 
export default { 
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], 
  theme: { 
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
      } 
    }, 
  }, 
  plugins: [], 
}