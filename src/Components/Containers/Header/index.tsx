import { config } from "@/config";
import { ESteps } from "@/Data/enum";
import { clsx } from "@/Helpers/clsx";
import { useStore } from "@/Store";

const Header = () => {
  const {
    store: {
      main: { step },
      filial: { selectedFilial },
    },
  } = useStore();
  const isActive = step > -1;

  return (
    <header
      className={clsx(
        "h-[120px] bg-gray-100 relative",
        isActive && "bg-white !h-auto pt-[15px]"
      )}
      style={{ backgroundImage: `url(${!isActive && config.bgImage})` }}
    >
      <div className="flex items-center gap-[10px]">
        {isActive && (
          <button className="ml-1">
            <i className="ph ph-arrow-left text-[28px]" />
          </button>
        )}
        <img
          src={config.logo}
          className={clsx(
            isActive && "w-[55px] h-[55px] static pb-2",
            !isActive &&
            "h-20 w-20 rounded-full absolute left-[10px] translate-y-3 bottom-0 z-20"
          )}
        />
        {isActive && (
          <div>
            <div>{selectedFilial.name}</div>
            <div className="text-sm text-gray-500">
              {selectedFilial.address}
            </div>
          </div>
        )}
      </div>

      {!isActive && (
        <div className="h-[30px] w-full absolute left-0 bottom-0 bg-white rounded-t-extra"></div>
      )}
    </header>
  );
};

export default Header;
