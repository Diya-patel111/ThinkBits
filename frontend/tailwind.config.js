/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "on-tertiary-fixed-variant": "#723600",
        "tertiary-fixed": "#ffdcc6",
        "surface-variant": "#e1e2e4",
        "tertiary": "#924700",
        "primary": "#0058be",
        "surface-container-highest": "#e1e2e4",
        "surface-container-high": "#e7e8ea",
        "on-primary-container": "#fefcff",
        "on-primary": "#ffffff",
        "on-secondary-container": "#405682",
        "secondary-fixed": "#d8e2ff",
        "on-secondary": "#ffffff",
        "secondary-container": "#b6ccff",
        "on-secondary-fixed-variant": "#304671",
        "tertiary-container": "#b75b00",
        "inverse-on-surface": "#f0f1f3",
        "surface": "#f8f9fb",
        "surface-container-low": "#f3f4f6",
        "background": "#f8f9fb",
        "inverse-primary": "#adc6ff",
        "inverse-surface": "#2e3132",
        "tertiary-fixed-dim": "#ffb786",
        "secondary": "#495e8a",
        "outline": "#727785",
        "on-error": "#ffffff",
        "error-container": "#ffdad6",
        "on-error-container": "#93000a",
        "surface-container-lowest": "#ffffff",
        "on-secondary-fixed": "#001a42",
        "on-tertiary-fixed": "#311400",
        "on-primary-fixed": "#001a42",
        "surface-container": "#edeef0",
        "surface-bright": "#f8f9fb",
        "error": "#ba1a1a",
        "on-primary-fixed-variant": "#004395",
        "secondary-fixed-dim": "#b1c6f9",
        "outline-variant": "#c2c6d6",
        "primary-fixed": "#d8e2ff",
        "on-background": "#191c1e",
        "surface-dim": "#d9dadc",
        "surface-tint": "#005ac2",
        "on-surface": "#191c1e",
        "on-tertiary-container": "#fffbff",
        "primary-fixed-dim": "#adc6ff",
        "on-surface-variant": "#424754",
        "primary-container": "#2170e4",
        "on-tertiary": "#ffffff"
      },
      fontFamily: {
        headline: ["Manrope", "sans-serif"],
        body: ["Inter", "sans-serif"],
        label: ["Inter", "sans-serif"]
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms')({ strategy: 'class' }),
    require('@tailwindcss/container-queries')
  ],
}