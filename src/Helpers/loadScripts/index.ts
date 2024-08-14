import tailwindConfig from "../../../tailwind.config";
import { mainStyles } from "@/styles";

export const scripts = [
  "https://unpkg.com/i18next/dist/umd/i18next.min.js",
  "https://cdn.jsdelivr.net/npm/dayjs@1/dayjs.min.js",
  "https://unpkg.com/tailwindcss-jit-cdn",
];

export const styles = [
  "https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap",
  "https://unpkg.com/@phosphor-icons/web@2.1.1/src/regular/style.css",
  "https://unpkg.com/@phosphor-icons/web@2.1.1/src/light/style.css",
  "https://cdn.jsdelivr.net/npm/react-phone-input-2@2.15.1/lib/style.min.css",
];

export const loadScripts = (srcs: string[]) => {
  return Promise.all(
    srcs.map((src) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = src;
        script.crossOrigin = "anonymous";
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    })
  );
};

export const loadStylesheets = (hrefs: string[]) => {
  return Promise.all(
    hrefs.map((href) => {
      return new Promise((resolve, reject) => {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = href;
        link.crossOrigin = "anonymous";
        link.onload = resolve;
        link.onerror = reject;
        document.head.appendChild(link);
      });
    })
  );
};

export const injectCssStyle = () => {
  const style = document.createElement("style");
  style.textContent = mainStyles;
  document.head.appendChild(style);
};

export const loadBuildScripts = async () => {
  await loadScripts(["https://unpkg.com/react@18/umd/react.production.min.js"]);
  await loadScripts([
    "https://unpkg.com/react-dom@18/umd/react-dom.production.min.js",
  ]);
};

export const loadCommonScripts = async () => {
  await Promise.all([loadScripts(scripts), loadStylesheets(styles)]);

  return new Promise<void>((resolve) => {
    const script = document.createElement("script");
    script.type = "tailwind-config";
    script.textContent = JSON.stringify(tailwindConfig, null, 2);
    document.head.appendChild(script);
    resolve();
  });
};
