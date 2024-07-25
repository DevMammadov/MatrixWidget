import { createScript, loadScriptAsync, loadStyles } from "@/Helpers/common";
import App from "./App";
import { scripts, styles } from "@/Helpers/scripts";
import tailwindConfig from "../tailwind.config.ts";

const renderApp = async () => {
  const root = document.createElement("div");
  root.id = "root";
  document.body.appendChild(root);

  if (import.meta.env.MODE === "production") {
    //@ts-expect-error abc
    React = window.React;
    //@ts-expect-error abc
    ReactDOM = window.ReactDOM;
  } else {
    const { default: ReactModule } = await import("react");
    const { default: ReactDOMModule } = await import("react-dom");

    //@ts-expect-error abc
    React = ReactModule;
    //@ts-expect-error abc
    ReactDOM = ReactDOMModule;
  }

  if (import.meta.env.MODE === "production") {
    if (typeof window.ReactDOM !== "undefined") {
      try {
        //@ts-expect-error abc
        window.ReactDOM.createRoot(root).render(<App />);
      } catch (error) {
        console.error("Error rendering app with ReactDOM:", error);
      }
    } else {
      console.error("ReactDOM is not defined in the global scope.");
    }
  } else {
    const { default: ReactDOM } = await import("react-dom/client");
    ReactDOM.createRoot(root).render(<App />);
  }
};

const initApp = () => {
  loadScriptAsync(
    [scripts.react, scripts.reactDOM, scripts.tailwindJit],
    () => {
      loadStyles([styles.tailwind]);
      createScript(JSON.stringify(tailwindConfig, null, 2), "tailwind-config");
      renderApp();
    }
  );
};

initApp();
