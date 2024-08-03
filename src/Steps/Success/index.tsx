import { useI18 } from "@/i18next";

type TSuccess = {
  onChange(): void;
};

const SuccessPage = ({ onChange }: TSuccess) => {
  const t = useI18();

  React.useEffect(() => {
    setTimeout(() => {
      onChange();
    }, 2000);
  }, []);

  return (
    <div className="h-full flex justify-center items-center flex-col gap-3">
      <div className="h-[110px] w-[110px] bg-green-800 rounded-full flex justify-center items-center text-white text-6xl">
        <i className="ph ph-check"></i>
      </div>
      <span className="font-bold text-4xl text-green-800">
        {t("youRegisteredSuccessfuly")}
      </span>
    </div>
  );
};

export default SuccessPage;
