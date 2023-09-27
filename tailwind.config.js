/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  darkMode: 'class', // or 'media' or 'false'
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      },
      screens: {
        '2xs': '380px',
        xs: '475px',
        height: {
          screen: ['100vh /* fallback for Opera, IE and etc. */', '100dvh']
        }
      },
      fontFamily: {
        inter: ['var(--font-inter)'],
        oswald: ['var(--font-oswald)']
      },
      colors: {
        grey: {
          50: '#F7F8F9',
          100: '#EEF0F3',
          200: '#D5DAE1',
          300: '#BBC3CF',
          400: '#8896AB',
          500: '#556987',
          600: '#4D5F7A',
          700: '#404F65',
          800: '#333F51',
          900: '#2A3342'
        },
        primary: {
          50: '#F0FDF4',
          100: '#DCFCE7',
          200: '#BBF7D0',
          300: '#86EFAC',
          400: '#4ADE80',
          500: '#22C55E',
          600: '#16A34A',
          700: '#15803D',
          800: '#166534',
          900: '#14532D'
        },
        secondary: {
          50: '#FFFAF3',
          100: '#FEF5E7',
          200: '#FDE7C2',
          300: '#FBD89D',
          400: '#F8BB54',
          500: '#F59E0B',
          600: '#DD8E0A',
          700: '#B87708',
          800: '#935F07',
          900: '#784D05'
        },
        warning: {
          50: '#FEF7F6',
          100: '#FDEEEC',
          200: '#FBD6D0',
          300: '#F9BDB4',
          400: '#F48B7C',
          500: '#EF5944',
          600: '#D7503D',
          700: '#B34333',
          800: '#8F3529',
          900: '#752C21'
        },
        info: {
          50: '#F5F9FF',
          100: '#EBF3FE',
          200: '#CEE0FD',
          300: '#B1CDFB',
          400: '#76A8F9',
          500: '#3B82F6',
          600: '#3575DD',
          700: '#2C62B9',
          800: '#234E94',
          900: '#1D4079'
        }
      }
    }
  },
  plugins: []
}
