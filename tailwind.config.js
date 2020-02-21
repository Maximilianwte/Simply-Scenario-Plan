module.exports = {
  theme: {
    extend: {
      spacing: {
        "40" : "11rem",
        "80": "20rem",
        "96": "24rem",
        "128": "36rem",
        "156": "46rem"
      },
      borderRadius: {
        'none': '0px',
        'full': '9999px'
      }
     },
    colors: {
      bg_primary: "var(--bg-primary)",
      bg_secondary: "var(--bg-secondary)",
      main_primary: "var(--main-primary)",
      main_secondary: "var(--main-secondary)",
      main_focus: "var(--main-focus)",
      main_focus_active: "var(--main-focus-active)",
    },
    borderRadius: {
      "xl": "1rem"
    }
  },
  variants: {
    backgroundColor: ['responsive', 'hover', 'focus'],
  },
  plugins: []
}
