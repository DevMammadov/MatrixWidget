import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import checker from "vite-plugin-checker";
import tailwindConfig from "./tailwind.config.ts";

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
      injectCdnsPlugin(),
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

export const injectCdnsPlugin = () => {
  return {
    name: "vite-plugin-inject-cdn",
    transformIndexHtml(html: string) {
      const cdns = `
        <script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
        <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
        <script src="https://unpkg.com/i18next/dist/umd/i18next.min.js"></script>
        <link rel="stylesheet" href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" crossorigin="anonymous" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossorigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" crossorigin="anonymous" />
        <script src="https://unpkg.com/tailwindcss-jit-cdn"></script>
        <script type="tailwind-config">${JSON.stringify(
          tailwindConfig,
          null,
          2
        )}</script>
      `;

      return html.replace(/<\/head>/, `${cdns}</head>`);
    },
  };
};
