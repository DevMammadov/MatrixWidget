import { useI18 } from "@/i18next";

export const useSteps = () => {
  const t = useI18();

  return [
    `1 ${t("filial")}`,
    `2 ${t("specialist")}`,
    `3 ${t("service")}`,
    `4 ${t("time")}`,
    `5 ${t("contacts")}`,
  ];
};
