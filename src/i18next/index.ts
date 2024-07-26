import ru from "./ru.json";

export const initI18n = () => {
  //@ts-expect-error abc
  if (i18next) {
    //@ts-expect-error abc
    i18next.init({
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
    //@ts-expect-error abc
    i18next.on("languageChanged", forceUpdate);
    return () => {
      //@ts-expect-error abc
      i18next.off("languageChanged", forceUpdate);
    };
  }, [forceUpdate]);

  //@ts-expect-error - i18next.changeLanguage(lng)
  return (key: keyof typeof ru) => i18next.t(key);
};
