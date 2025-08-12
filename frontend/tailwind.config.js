module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "hero-gradient": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        "card-gradient": "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      },
      animation: {
        float: "float 3s ease-in-out infinite",
        "bounce-slow": "bounce 2s infinite",
        "pulse-slow": "pulse 3s infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};
