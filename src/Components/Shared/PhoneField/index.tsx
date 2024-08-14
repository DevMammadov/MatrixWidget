import { clsx } from "@/Helpers/clsx";

type TPhoneInput = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "required"
> & {
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

const PhoneField = ({
  onClear,
  value,
  label,
  required,
  className,
  error,
  classes,
  ...rest
}: TPhoneInput) => {
  const PhoneInput = React.useMemo(
    () =>
      React.lazy(
        () =>
          // @ts-expect-error cdn
          import("https://cdn.skypack.dev/@jstarmx/react-phone-input-2")
      ),
    []
  );

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
          "border-gray-300 hover:border-gray-900 focus:border-gray-900 border rounded-large relative min-h-[35px]",
          error && "border-red-600",
          classes?.field
        )}
        tabIndex={0}
      >
        <React.Suspense fallback={<div></div>}>
          <PhoneInput
            value={value}
            inputClass={clsx(
              "focus:outline-none py-[5px] p-3 !w-full !rounded-huge text-xl !border-none",
              classes?.input
            )}
            buttonClass="!rounded-l-huge !hover:bg-red-500 !border-0 !bg-transparent"
            inputExtraProps={{
              name: rest.name,
              ["data-required"]: required,
              ...rest,
            }}
            defaultCountry="ru"
            disabled={rest.disabled}
          />
        </React.Suspense>

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

export default PhoneField;
