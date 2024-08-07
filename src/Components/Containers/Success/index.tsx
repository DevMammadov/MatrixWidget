import { clsx } from "@/Helpers/clsx";
import { useI18 } from "@/i18next";

type TSuccess = {
  onChange(): void;
  mode?: "success" | "error";
};

const modeStyles = {
  ["success"]: {
    bg: "bg-green-800",
    color: "text-green-800",
    icon: "ph ph-check",
    langkey: "youRegisteredSuccessfuly",
  },
  ["error"]: {
    bg: "bg-red-800",
    color: "text-red-800",
    icon: "ph ph-x",
    langkey: "anErrorHasOccurred",
  },
};

const SuccessPage = ({ onChange, mode = "success" }: TSuccess) => {
  const t = useI18();

  React.useEffect(() => {
    setTimeout(() => {
      onChange();
    }, 2000);
  }, []);

  return (
    <div className="h-full flex justify-center items-center flex-col gap-3">
      <div
        className={clsx(
          "h-[110px] w-[110px] rounded-full flex justify-center items-center text-white text-6xl",
          modeStyles[mode].bg
        )}
      >
        <i className={clsx(modeStyles[mode].icon)}></i>
      </div>
      <span className={clsx("font-bold text-4xl", modeStyles[mode].color)}>
        {t(modeStyles[mode].langkey as keyof typeof t)}
      </span>
    </div>
  );
};

export default SuccessPage;
