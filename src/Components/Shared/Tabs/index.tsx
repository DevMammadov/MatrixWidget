import { clsx } from "@/Helpers/clsx";

type TTabs = {
  tabs?: string[];
  className?: string;
  onChange?(tab: number): void;
  active: number;
};

const Tabs = ({ tabs, className, onChange, active }: TTabs) => {
  return (
    <div
      className={clsx(
        "flex bg-gray-150 gap-1 rounded-small z-20  overflow-hidden",
        className
      )}
    >
      {tabs?.map((tab, i) => (
        <button
          key={tab}
          className={clsx(
            "relative flex-1 text-xl min-h-[40px] text-gray-600 whitespace-nowrap flex items-center leading-none focus:outline-none mtx-menu",
            active >= i && "active-tab bg-gray-700 !text-white"
          )}
          onClick={() => onChange?.(i)}
        >
          <span className="py-1 px-5">{tab}</span>
        </button>
      ))}
    </div>
  );
};

export default Tabs;
