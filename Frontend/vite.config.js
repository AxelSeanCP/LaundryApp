import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";

// https://vite.dev/config/
export default defineConfig({
  // Add this to configure tailwindcss with vite
  css: {
    postcss: {
      plugins: [tailwindcss],
    },
  },
  plugins: [react()],
});
