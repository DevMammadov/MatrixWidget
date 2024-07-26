import { useI18 } from "@/i18next";

const Footer = () => {
  const t = useI18();

  return (
    <footer className="pb-4">
      <div className="flex w-full items-center gap-2 justify-center">
        <h3 className="text-3xl text-gray-400 font-medium">{t("worksOn")}</h3>
        <div>
          <span className="gray-1000 text-5xl font-bold">Matrix</span>
          <span className="text-primary text-5xl font-bold">CRM</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
