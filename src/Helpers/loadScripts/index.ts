import tailwindConfig from "../../../tailwind.config";

export const scripts = [
  "https://unpkg.com/react@18/umd/react.production.min.js",
  "https://unpkg.com/react-dom@18/umd/react-dom.production.min.js",
  "https://unpkg.com/i18next/dist/umd/i18next.min.js",
];

export const styles = [];

export const fonts = [
  "https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap",
  "https://unpkg.com/@phosphor-icons/web@2.1.1/src/regular/style.css",
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

export const loadBuildScripts = async () => {
  await Promise.all([loadScripts(scripts), loadStylesheets(styles)]);
};

export const loadTailwindCDN = async () => {
  const tailwindConfigRunner = "https://unpkg.com/tailwindcss-jit-cdn";
  const tailwindCss = "https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css";

  await Promise.all([
    loadScripts([tailwindConfigRunner]),
    loadStylesheets([tailwindCss]),
  ]);

  return new Promise<void>((resolve) => {
    const script = document.createElement("script");
    script.type = "tailwind-config";
    script.textContent = JSON.stringify(tailwindConfig, null, 2);
    document.head.appendChild(script);
    resolve();
  });
};

export const loadFonts = async () => {
  loadStylesheets(fonts);
};
