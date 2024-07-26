import { clsx } from "@/Helpers/clsx";

type TTabs = {
  tabs?: string[];
  className?: string;
  onChange?(tab: number): void;
};

const Tabs = ({ tabs, className, onChange }: TTabs) => {
  return (
    <div className={clsx("flex bg-gray-150 gap-1 rounded-small", className)}>
      {tabs?.map((tab, i) => (
        <button
          key={tab}
          className="relative flex-1 text-xl min-h-[41px] text-gray-600 whitespace-nowrap flex items-center leading-none focus:outline-none"
          onClick={() => onChange?.(i)}
        >
          <span className="py-1 px-5">{tab}</span>

          {i < tabs.length - 1 && (
            <>
              <span className="absolute bg-white h-[29px] w-[2px] top-[-4px] right-[-8px] rotate-[-35deg]"></span>
              <span className="absolute bg-white h-[29px] w-[2px] bottom-[-4px] right-[-8px] rotate-[35deg]"></span>
            </>
          )}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
