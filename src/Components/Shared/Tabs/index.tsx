import { clsx } from "@/Helpers/clsx";
import ArrowButton from "./ArrowButton";

type TTabs = {
  tabs?: string[];
  className?: string;
  onChange?(tab: number): void;
  active: number;
};

const Tabs = ({ tabs, className, onChange, active }: TTabs) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [isScrollingLeft, setIsScrollingLeft] = React.useState<boolean>(false);
  const [isScrollingRight, setIsScrollingRight] = React.useState<boolean>(true);

  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      setIsScrollingLeft(scrollLeft > 0);
      setIsScrollingRight(scrollLeft + clientWidth < scrollWidth);
    }
  };

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -100, behavior: "smooth" });
      setTimeout(handleScroll, 200);
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      const { scrollWidth } = containerRef.current;
      containerRef.current.scrollTo({ left: scrollWidth, behavior: "smooth" });
      setTimeout(() => {
        handleScroll();
      }, 200);
    }
  };

  return (
    <div className={clsx("bg-gray-150  rounded-small relative", className)}>
      <ArrowButton
        onClick={scrollLeft}
        className={clsx(
          "absolute top-0 left-0 rounded-r-md",
          !isScrollingLeft && "hidden"
        )}
      />
      <div
        ref={containerRef}
        className={clsx(
          "flex gap-1 overflow-hidden overflow-x-auto hide-scrollbar",
          className
        )}
      >
        {tabs?.map((tab, i) => (
          <button
            key={tab}
            className={clsx(
              "relative flex-1 capitalize text-xl min-h-[40px] text-gray-600 whitespace-nowrap flex items-center leading-none focus:outline-none",
              active >= i && "active-tab bg-gray-700 !text-white",
              i !== tabs.length - 1 && "mtx-menu"
            )}
            onClick={() => onChange?.(i)}
          >
            <span className="py-1 px-5">{tab}</span>
          </button>
        ))}
      </div>
      <ArrowButton
        onClick={scrollRight}
        direction="right"
        className={clsx(
          "absolute top-0 right-0 z-30 h-full rounded-l-md",
          !isScrollingRight && "hidden"
        )}
      />
    </div>
  );
};

export default Tabs;
