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
          'black8' : '#000000',
          'blueGrey2' : '#c0c3d2'
        }
      },
      boxShadow : {
        'dialog' : '0 16px 10px 0 rgba(0, 0, 0, 0.16)',
        'btnSave' : `inset 0 0 0 1px rgba(255, 255, 255, 0.16), 0 0 0 0.5px rgba(0, 0, 0, 0.08), inset 0 0 0 0.5px rgba(0, 0, 0, 0.08), 0 2px 4px 0.5px rgba(0, 0, 0, 0.16);`,
      }
    },
  },
  plugins: [],
}
