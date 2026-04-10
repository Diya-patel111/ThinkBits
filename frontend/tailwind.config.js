/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'surface-container-low': '#f3f4f5',
        'on-tertiary': '#ffffff',
        'on-secondary': '#ffffff',
        'surface-container-lowest': '#ffffff',
        'surface-tint': '#4d44e3',
        'surface-container-high': '#e7e8e9',
        'on-secondary-container': '#006172',
        'primary': '#3525cd',
        'tertiary-fixed-dim': '#ffb695',
        'surface-container': '#edeeef',
        'inverse-primary': '#c3c0ff',
        'outline-variant': '#c7c4d8',
        'inverse-surface': '#2e3132',
        'on-error': '#ffffff',
        'on-tertiary-container': '#ffd2be',
        'on-primary-fixed-variant': '#3323cc',
        'primary-fixed-dim': '#c3c0ff',
        'error': '#ba1a1a',
        'on-surface': '#191c1d',
        'outline': '#777587',
        'secondary-fixed': '#acedff',
        'surface': '#f8f9fa',
        'surface-dim': '#d9dadb',
        'on-primary': '#ffffff',
        'surface-container-highest': '#e1e3e4',
        'on-primary-fixed': '#0f0069',
        'on-secondary-fixed': '#001f26',
        'tertiary-fixed': '#ffdbcc',
        'secondary-container': '#57dffe',
        'primary-container': '#4f46e5',
        'on-secondary-fixed-variant': '#004e5c',
        'background': '#f8f9fa',
        'on-tertiary-fixed-variant': '#7b2f00',
        'on-background': '#191c1d',
        'tertiary': '#7e3000',
        'on-surface-variant': '#464555',
        'surface-bright': '#f8f9fa',
        'surface-variant': '#e1e3e4',
        'secondary': '#00687a',
        'tertiary-container': '#a44100',
        'inverse-on-surface': '#f0f1f2',
        'on-error-container': '#93000a',
        'error-container': '#ffdad6',
        'on-tertiary-fixed': '#351000'
      },
      borderRadius: {
        DEFAULT: '1rem',
        lg: '2rem',
        xl: '3rem',
        full: '9999px'
      },
      fontFamily: {
        headline: ['Manrope'],
        body: ['Inter'],
        label: ['Inter']
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries'),
  ],
}
