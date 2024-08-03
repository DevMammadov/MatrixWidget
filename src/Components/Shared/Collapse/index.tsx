import { clsx } from "@/Helpers/clsx";

type TCollapse = {
  title: string;
  children: React.ReactNode;
};

const Collapse = ({ title, children }: TCollapse) => {
  const [isOpen, setIsOpen] = React.useState(true);
  const [height, setHeight] = React.useState("0px");
  const contentRef = React.useRef<HTMLDivElement>(null);

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };

  React.useEffect(() => {
    setHeight(isOpen ? `${contentRef.current?.scrollHeight}px` : "0px");
  }, [isOpen]);

  return (
    <div className="w-full max-w-md mx-auto bg-white overflow-hidden md:max-w-2xl">
      <button
        className="w-full p-4 text-left flex justify-between items-center focus:outline-none"
        onClick={toggleCollapse}
      >
        <h2 className="text-base text-gray-600 capitalize">{title}</h2>
        <i
          className={clsx(
            "ph ph-caret-down transition-transform duration-300 text-4xl text-gray-600",
            isOpen && "transform rotate-180"
          )}
        ></i>
      </button>
      <div
        ref={contentRef}
        style={{ maxHeight: `${height}`, transition: "max-height 0.3s ease" }}
        className="overflow-hidden"
      >
        <div className="px-4">{children}</div>
      </div>
    </div>
  );
};

export default Collapse;
