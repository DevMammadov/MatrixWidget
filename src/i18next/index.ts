import { i18next } from "@/global";
import ru from "./ru.json";

export const initI18n = () => {
  if (i18next) {
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
    i18next.on("languageChanged", forceUpdate);
    return () => {
      i18next.off("languageChanged", forceUpdate);
    };
  }, [forceUpdate]);

  return {
    t: (key: keyof typeof ru) => i18next.t(key),
    changeLanguage: (lng: string) => i18next.changeLanguage(lng),
  };
};
