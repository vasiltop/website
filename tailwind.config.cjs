const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {},
  },

  plugins: [
    require('daisyui')
  ],

  daisyui: {
    themes: ["night"]
  },
};

module.exports = config;
