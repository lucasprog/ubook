/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,vue}"],
  theme: {
    fontFamily : {
      'sans': ['Roboto', 'Arial', 'sans-serif'],
    },
    extend: {
      colors :{
        default :{
          'fundo' : '#f8f9fd',
          'paleGrey' : '#e4e7f4',
          'blueGrey' : '#9198af',
          'red' : '#fa7268',
          'dark' : '#2a2d3b',
          'skyBlue' : '#68a0fa',
          'paleOGreen' :'#90d26c',
          'lightGreen' : '#dbff90',
          'white' : '#e1e1e1',
          'whiteTwo' : '#ffffff',
          'veryLightPink' : '#fff3f2',
          'black8' : '#000000'
        }
      }
    },
  },
  plugins: [],
}
