export const loadScriptAsync = (urls: string[], onLoad: () => void) => {
  let loadedScripts = 0;
  const totalScripts = urls.length;

  const scriptLoaded = () => {
    loadedScripts += 1;
    if (loadedScripts === totalScripts && onLoad) {
      onLoad();
    }
  };

  urls.forEach((url) => {
    const script = document.createElement("script");
    script.src = url;
    script.onload = scriptLoaded;
    script.onerror = () => {
      console.error(`Failed to load script: ${url}`);
    };
    document.head.appendChild(script);
  });
};

export const loadStyles = (paths: string[]) => {
  paths.forEach((stylePath) => {
    const link = document.createElement("link");
    link.href = stylePath;
    link.rel = "stylesheet";
    link.crossOrigin = "anonymous";
    document.head.appendChild(link);
  });
};

export const createScript = (content: string, type: string) => {
  const script = document.createElement("script");
  script.type = type;
  script.textContent = content;
  document.head.appendChild(script);
};
