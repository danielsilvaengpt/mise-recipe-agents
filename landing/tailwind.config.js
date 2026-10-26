/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: 'var(--paper)',
          2: 'var(--paper-2)',
        },
        ink: {
          DEFAULT: 'var(--ink)',
          soft: 'var(--ink-soft)',
        },
        tomato: {
          DEFAULT: 'var(--tomato)',
        },
        olive: {
          DEFAULT: 'var(--olive)',
        },
        saffron: {
          DEFAULT: 'var(--saffron)',
        },
        line: {
          DEFAULT: 'var(--line)',
        },
      },
      fontFamily: {
        fraunces: ['Fraunces', 'serif'],
        jakarta: ['"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
      },
      borderRadius: {
        card: '14px',
      },
      borderWidth: {
        1.5: '1.5px',
      },
      boxShadow: {
        warm: '0 10px 30px -12px rgba(60, 40, 10, 0.25)',
        'warm-sm': '0 4px 15px -4px rgba(60, 40, 10, 0.15)',
        'warm-dark': '0 10px 30px -12px rgba(0, 0, 0, 0.5)',
      },
      maxWidth: {
        text: '62ch',
      },
    },
  },
  plugins: [],
};
