import App from "./App";

const renderApp = async () => {
  const root = document.createElement("div");
  root.id = "root";
  document.body.appendChild(root);

  if (import.meta.env.MODE === "production") {
    //@ts-expect-error abc
    i18next = window.i18next;

    //@ts-expect-error abc
    React = window.React;
    //@ts-expect-error abc
    ReactDOM = window.ReactDOM;
  } else {
    const { default: ReactModule } = await import("react");
    const { default: ReactDOMModule } = await import("react-dom");
    const { default: i18nextModule } = await import("i18next");

    //@ts-expect-error abc
    React = ReactModule;

    //@ts-expect-error abc
    ReactDOM = ReactDOMModule;

    //@ts-expect-error abc
    i18next = i18nextModule;
  }

  if (import.meta.env.MODE === "production") {
    if (typeof window.ReactDOM !== "undefined") {
      try {
        //@ts-expect-error abc
        window.ReactDOM.createRoot(root).render(<App />);
      } catch (error) {
        window.location.reload();
        console.error("Error rendering app with ReactDOM:", error);
      }
    } else {
      console.error("ReactDOM is not defined in the global scope.");
    }
  } else {
    import("react-dom/client").then(({ default: ReactDOMClient }) => {
      ReactDOMClient.createRoot(root).render(<App />);
    });
  }
};

renderApp();
