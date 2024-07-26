import { useI18 } from "@/i18next";

export const useSteps = () => {
  const t = useI18();

  return [
    `1 ${t("service")}`,
    `2 ${t("specialist")}`,
    `3 ${t("time")}`,
    `4 ${t("contacts")}`,
  ];
};
