import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import plugin from "tailwindcss/plugin";

const backfaceVisibility = plugin(function ({ addUtilities }) {
  addUtilities({
    ".backface-visible": {
      "backface-visibility": "visible",
    },
    ".backface-hidden": {
      "backface-visibility": "hidden",
    },
  });
});

const transformStyle = plugin(function ({ addUtilities }) {
  addUtilities({
    ".tstyle-preserve": {
      "transform-style": "preserve-3d",
    },
    ".tstyle-flat": {
      "transform-style": "flat",
    },
  });
});

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
    },
  },
  plugins: [backfaceVisibility, transformStyle],
} satisfies Config;
