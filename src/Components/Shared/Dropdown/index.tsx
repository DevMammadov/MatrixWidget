import ClickAway from "@/Components/Shared/ClickAway";
import { clsx } from "@/Helpers/clsx";

type TDropdown<T> = {
  data: T[];
  optionLabel: (item: T) => string;
  optionValue: (item: T) => unknown;
  className?: string;
  onChange(value: unknown): void;
  value?: unknown;
};

const Dropdown = <T,>({
  data,
  optionLabel,
  optionValue = () => "",
  className,
  onChange,
  value,
}: TDropdown<T>) => {
  const [open, setOpen] = React.useState(false);
  const [_value, setValue] = React.useState<T>(data[0]);

  React.useEffect(() => {
    if (data) {
      setValue(data[0]);
    }
  }, [data]);

  React.useEffect(() => {
    if (value) {
      const item = data.find(
        (d) => JSON.stringify(optionValue(d)) === JSON.stringify(value)
      );

      if (item) {
        setValue(item);
      }
    }
  }, [value, data, optionValue]);

  const handleSelect = (item: T) => {
    onChange(optionValue(item));
    setOpen(false);
  };

  return (
    <ClickAway onClickAway={() => setOpen(false)}>
      <div className={clsx("relative inline-block", className)}>
        <button
          className={clsx(
            "text-5xl font-bold flex gap-2 items-center cursor-pointer focus:outline-none hover:bg-gray-150 rounded-md px-2 w-full justify-between",
            open && "shadow-inner"
          )}
          onClick={() => setOpen(!open)}
        >
          <span className="whitespace-nowrap">
            {optionLabel(_value || ({} as T))}
          </span>
          <span className="flex items-center focus:outline-none ">
            <i className="ph-caret-down ph" />
          </span>
        </button>
        {open && (
          <div className="absolute bottom-0 translate-y-full shadow-sm border rounded-b-md border-t-0 w-full bg-white">
            {data.map((item) => (
              <button
                className="cursor-pointer hover:bg-gray-150 px-3 py-2 w-full text-left focus:outline-none"
                key={optionLabel(item)}
                onClick={() => handleSelect(item)}
              >
                {optionLabel(item)}
              </button>
            ))}
          </div>
        )}
      </div>
    </ClickAway>
  );
};

export default Dropdown;
