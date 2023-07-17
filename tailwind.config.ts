import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      borderWidth: {
        0.5: "0.5px",
      },
    },
  },
  plugins: [],
} satisfies Config;
