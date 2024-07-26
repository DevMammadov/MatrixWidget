import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import checker from "vite-plugin-checker";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isProduction = mode === "production";

  return {
    plugins: [
      react({
        jsxRuntime: "classic",
      }),
      tsconfigPaths(),
      checker({ typescript: true }),
    ],
    build: {
      rollupOptions: {
        external: isProduction ? ["react", "react-dom", "i18next"] : [],
        input: {
          main: "./index.html",
        },
        output: {
          globals: {
            react: "React",
            "react-dom": "ReactDOM",
            i18next: "i18next",
          },
          format: "iife",
          entryFileNames: "index.js",
          chunkFileNames: "[name].js",
          assetFileNames: "[name].[ext]",
        },
      },
      minify: false,
      terserOptions: {
        compress: false,
        mangle: false,
      },
    },
  };
});
