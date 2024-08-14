import { config } from "@/config";
import {
  EWidgetMode,
  EWidgetButtonPosition,
  EWidgetPosition,
  EAnimationType,
} from "@/Data/enum";
import { clsx } from "@/Helpers/clsx";
import { useI18 } from "@/i18next";

type TContainer = {
  children: React.ReactNode;
};

const position = {
  [EWidgetButtonPosition.BottomLeft]: "bottom-[2%] left-[2%]",
  [EWidgetButtonPosition.BottomRight]: "bottom-[2%] right-[2%]",
  [EWidgetButtonPosition.TopLeft]: "top-[2%] left-[2%]",
  [EWidgetButtonPosition.TopRight]: "top-[2%] right-[2%]",
};

const Container = ({ children }: TContainer) => {
  const [visible, setVisible] = React.useState(false);
  const t = useI18();
  const isProd = config.mode === EWidgetMode.prod;
  const isRight = config.positionWidjet === EWidgetPosition.right;
  const isAnimated = config.isAnimated === EAnimationType.animated;

  return (
    <div className="h-screen z-[99999]">
      {(visible || !isProd) && (
        <div
          className={clsx(
            "fade-in w-auto sm:w-[500px] h-screen border border-gray-200 border-b-none flex flex-col z-[99999]",
            isRight ? "right-0" : "left-0",
            !isProd && "relative mx-auto",
            isProd && "fixed"
          )}
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {isProd && (
            <button
              onClick={() => setVisible(false)}
              className={clsx(
                "rounded-full top-[5px] p-1 bg-gray-400 absolute z-[99999] focus:outline-none text-white h-[25px] w-[25px] flex items-center justify-center",
                isRight ? "left-[-40px]" : "right-[-40px]"
              )}
            >
              <i className="ph ph-x"></i>
            </button>
          )}

          {children}
        </div>
      )}
      {isProd && (
        <button
          onClick={() => setVisible(!visible)}
          className={clsx(
            "fixed focus:outline-none active:scale-95 select-none z-[999999] rounded-full h-[100px] w-[100px] text-center flex items-center text-white bg-green-500",
            isAnimated && "wave-animation",
            position[config.positionButton as keyof typeof position]
          )}
        >
          <span>{t("onlineRegister")}</span>
        </button>
      )}
    </div>
  );
};

export default Container;
