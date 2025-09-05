/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f7fdf7',
          100: '#ecfdf0',
          200: '#d1fad8',
          300: '#a7f3b8',
          400: '#6ee890',
          500: '#42d86f',
          600: '#2fb85a',
          700: '#28a04b',
          800: '#247d40',
          900: '#1f6836',
        },
        earth: {
          50: '#fefbf3',
          100: '#fdf5e1',
          200: '#fae8bd',
          300: '#f6d594',
          400: '#f0bd69',
          500: '#e8a147',
          600: '#d4853c',
          700: '#b06934',
          800: '#8e5431',
          900: '#75462a',
        },
        soil: {
          50: '#f9f7f4',
          100: '#f0ebe3',
          200: '#e0d4c7',
          300: '#ccb8a3',
          400: '#b39779',
          500: '#9b7c5a',
          600: '#846649',
          700: '#6d523c',
          800: '#5a4434',
          900: '#4a392d',
        },
        forest: {
          50: '#f4f6f3',
          100: '#e6eae3',
          200: '#cdd6c9',
          300: '#a8baa3',
          400: '#7d9677',
          500: '#5f7959',
          600: '#4a6045',
          700: '#3c4e38',
          800: '#32412f',
          900: '#2b3628',
        },
        wheat: {
          50: '#fffef7',
          100: '#fffbeb',
          200: '#fff4c7',
          300: '#ffea94',
          400: '#ffdc5f',
          500: '#ffcc33',
          600: '#f2b818',
          700: '#cc8f0c',
          800: '#a16f0f',
          900: '#835c13',
        },
        sage: {
          50: '#f6f7f6',
          100: '#e3e8e3',
          200: '#c7d2c7',
          300: '#9fb59f',
          400: '#7a9a7a',
          500: '#5c7f5c',
          600: '#486648',
          700: '#3a523a',
          800: '#304230',
          900: '#283628',
        }
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
        'pulse-slow': 'pulse 3s infinite',
        'tractor-move': 'tractor 12s linear infinite',
        'tractor-plough': 'plough 12s linear infinite',
        'cloud-drift': 'cloudDrift 20s linear infinite',
        'cloud-drift-slow': 'cloudDrift 30s linear infinite',
        'bird-fly': 'birdFly 15s linear infinite',
        'bird-fly-delayed': 'birdFly 18s linear infinite 3s',
        'soil-appear': 'soilAppear 0.5s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'sway': 'sway 4s ease-in-out infinite',
      },
      keyframes: {
        tractor: {
          '0%': { transform: 'translateX(-150px)' },
          '100%': { transform: 'translateX(calc(100vw + 50px))' }
        },
        plough: {
          '0%': { 
            transform: 'translateX(-100px)',
            opacity: '0'
          },
          '10%': {
            opacity: '1'
          },
          '90%': {
            opacity: '1'
          },
          '100%': { 
            transform: 'translateX(calc(100vw + 100px))',
            opacity: '0'
          }
        },
        cloudDrift: {
          '0%': { transform: 'translateX(-200px)' },
          '100%': { transform: 'translateX(calc(100vw + 200px))' }
        },
        birdFly: {
          '0%': { 
            transform: 'translateX(-50px) translateY(0px) scale(0.8)',
            opacity: '0.8'
          },
          '25%': { 
            transform: 'translateX(25vw) translateY(-10px) scale(1)',
            opacity: '1'
          },
          '50%': { 
            transform: 'translateX(50vw) translateY(5px) scale(0.9)',
            opacity: '0.9'
          },
          '75%': { 
            transform: 'translateX(75vw) translateY(-5px) scale(1.1)',
            opacity: '0.8'
          },
          '100%': { 
            transform: 'translateX(calc(100vw + 50px)) translateY(0px) scale(0.7)',
            opacity: '0'
          }
        },
        soilAppear: {
          '0%': { 
            transform: 'scaleX(0)',
            opacity: '0'
          },
          '100%': { 
            transform: 'scaleX(1)',
            opacity: '1'
          }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(2deg)' }
        },
        sway: {
          '0%, 100%': { transform: 'translateX(0px) rotate(0deg)' },
          '50%': { transform: 'translateX(5px) rotate(1deg)' }
        }
      }
    },
  },
  plugins: [],
}
