import ru from "./ru.json";

export const initI18n = () => {
  if (window.i18next) {
    window.i18next.init({
      fallbackLng: "ru",
      debug: false,
      resources: {
        ru: {
          translation: ru,
        },
      },
    });
  }
};

export const useI18 = () => {
  const [_, setTick] = React.useState(0);

  const forceUpdate = React.useCallback(() => {
    setTick((tick) => tick + 1);
  }, []);

  React.useEffect(() => {
    window.i18next.on("languageChanged", forceUpdate);
    return () => {
      window.i18next.off("languageChanged", forceUpdate);
    };
  }, [forceUpdate]);

  //i18next.changeLanguage(lng)
  return (key: keyof typeof ru) => window.i18next.t(key);
};
