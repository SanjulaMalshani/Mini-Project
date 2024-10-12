/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "primary":"#01245B",
        "secondary":"#0052CC",
        "tertiary-bg":"#D7E7FF",
        "table-bg":"#D4D9D8",
        "lgout-bg": "#283342",
        "primary-txt":"#002538",
        "table-txt":"#33363F",
        "lg-placeholder-txt":"#686677",
        "btn-border":"#59E770",
        "edit-icon-bg":"#10511A",
        "dlt-icon-bg":"#CB3D3D",
        "drop-down-border":"#1B3D34",
        "approve-drop-down-border":"#868A90",
        "view-btn-bg":"#59E770",
        "approval-btn-bg":"#EDF4FF"
      },
    },
  },
  plugins: [],
}

