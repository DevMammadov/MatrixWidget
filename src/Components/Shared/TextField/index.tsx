import { clsx } from "@/Helpers/clsx";

type TTextField = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "required"
> & {
  phosphorIcon?: string;
  onClear?(): void;
  label?: string;
  required?: boolean;
  error?: boolean;
  classes?: {
    label?: string;
    input?: string;
    field?: string;
  };
};

const TextField = ({
  phosphorIcon,
  onClear,
  value,
  label,
  required,
  className,
  error,
  classes,
  ...rest
}: TTextField) => {
  return (
    <div className={className}>
      {label && (
        <label
          className={clsx(
            "text-lg leading-3 mb-2 block ml-2",
            error && "text-red-600",
            classes?.label
          )}
        >
          {label} {required && "*"}
        </label>
      )}
      <div
        className={clsx(
          "border-gray-300 hover:border-gray-900 focus:border-gray-900 border rounded-large relative",
          error && "border-red-600",
          classes?.field
        )}
        tabIndex={0}
      >
        <input
          {...rest}
          value={value}
          className={clsx(
            "focus:outline-none py-[5px] p-3 w-full rounded-huge text-xl",
            phosphorIcon && "pl-[35px]",
            onClear && "pr-[40px]",
            classes?.input
          )}
        />
        {phosphorIcon && (
          <div className="absolute top-1/2 translate-y-[-50%] left-2 flex items-center justify-center">
            <i className={phosphorIcon} />
          </div>
        )}

        {onClear && value && (
          <button
            onClick={onClear}
            className="absolute top-1/2 translate-y-[-50%] right-2 flex items-center justify-center p-1 focus:outline-none hover:bg-gray-100 rounded-md"
          >
            <i className="ph ph-x" />
          </button>
        )}
      </div>
    </div>
  );
};

export default TextField;
