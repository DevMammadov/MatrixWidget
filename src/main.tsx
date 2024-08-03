import App from "@/App";
import {
  injectCssStyle,
  loadBuildScripts,
  loadCommonScripts,
} from "@/Helpers/loadScripts/index";
import { TContext } from "@/Store/TStore";

const createRootElement = (): HTMLElement => {
  let root = document.getElementById("root");
  if (!root) {
    root = document.createElement("div");
    root.id = "root";
    document.body.appendChild(root);
  }
  return root;
};

const renderApp = async () => {
  const root = createRootElement();
  await loadCommonScripts();
  injectCssStyle();

  try {
    if (import.meta.env.MODE === "production") {
      await loadBuildScripts();

      const { React, ReactDOM } = window as any;

      if (ReactDOM && React) {
        if (!window.matrixContext) {
          window.matrixContext = React.createContext({} as TContext);
        }

        if (!window.matrixWidget) {
          window.matrixWidget = ReactDOM.createRoot(root);
        }

        window.matrixWidget.render(<App />);
      }
    } else {
      const [{ default: React }, { default: ReactDOM }] = await Promise.all([
        import("react"),
        import("react-dom"),
      ]);

      if (!window.matrixContext) {
        window.matrixContext = React.createContext({} as TContext);
      }

      window.React = React;
      window.ReactDOM = ReactDOM;

      const { default: ReactDOMClient } = await import("react-dom/client");

      if (!window.matrixWidget) {
        window.matrixWidget = ReactDOMClient.createRoot(root);
      }
      window.matrixWidget.render(<App />);
    }
  } catch (error) {
    console.error("Error rendering app:", error);
  }
};

renderApp();
