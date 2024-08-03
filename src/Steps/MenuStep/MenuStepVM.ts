import { config } from "@/config";
import { EMenuNavigate } from "@/Data/enum";
import { useI18 } from "@/i18next";
import { MenuItem } from "@/Steps/MenuStep/TMenuStep";

export const MenuStepVM = () => {
  const t = useI18();

  const menu = React.useMemo(() => {
    const unsortedMenu: MenuItem[] = [
      {
        label: t("chooseSpecialist"),
        icon: "ph-light ph-users-three",
        key: "chooseEmployee",
        index: EMenuNavigate.ChooseEmployee,
      },
      {
        label: t("chooseService"),
        icon: "ph-light ph-list-dashes",
        key: "chooseServices",
        index: EMenuNavigate.ChooseServices,
      },
      {
        label: t("chooseDateAndTime"),
        icon: "ph-light ph-calendar",
        key: "chooseDateTime",
        index: EMenuNavigate.ChooseDateTime,
      },
    ];

    return unsortedMenu.sort((a, b) => {
      return config.tabId[a.key] - config.tabId[b.key];
    });
  }, [t]);

  return { menu };
};
