import App from "@/App";
import {
  loadBuildScripts,
  loadFonts,
  loadTailwindCDN,
} from "@/Helpers/loadScripts/index";

const createRootElement = () => {
  const root = document.createElement("div");
  root.id = "root";
  document.body.appendChild(root);
  return root;
};

export let context: any;

const renderApp = async () => {
  const root = createRootElement();
  await loadTailwindCDN();
  await loadFonts();

  if (import.meta.env.MODE === "production") {
    await loadBuildScripts();

    //@ts-expect-error i18next problem in global
    const { React, ReactDOM, i18next } = window;

    if (ReactDOM && React) {
      context = React.createContext({});

      try {
        //@ts-expect-error createRoot expects to be imported from /client
        ReactDOM.createRoot(root).render(<App />);
      } catch (error) {
        console.error("Error rendering app with ReactDOM:", error);
      }
    }
  } else {
    const [{ default: React }, { default: ReactDOM }, { default: i18next }] =
      await Promise.all([
        import("react"),
        import("react-dom"),
        import("i18next"),
      ]);

    context = React.createContext({});

    // Define React, ReactDOM, and i18next as global variables in development
    window.React = React;
    window.ReactDOM = ReactDOM;
    //@ts-expect-error i18next problem in global
    window.i18next = i18next;

    import("react-dom/client").then(({ default: ReactDOMClient }) => {
      ReactDOMClient.createRoot(root).render(<App />);
    });
  }
};

renderApp();
