/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class', // This enables dark mode based on class
  theme: {
    extend: {
      colors: {
        gray: {
          850: '#1e2132', // Custom shade between gray-800 and gray-900
        }
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.800'),
            a: {
              color: theme('colors.indigo.500'),
              '&:hover': {
                color: theme('colors.indigo.600'),
              },
            },
          },
        },
        invert: {
          css: {
            color: theme('colors.gray.200'),
            a: {
              color: theme('colors.indigo.400'),
              '&:hover': {
                color: theme('colors.indigo.300'),
              },
            },
          },
        },
      }),
      boxShadow: {
        'inner-lg': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-in': 'slideIn 0.4s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
  ],
}

