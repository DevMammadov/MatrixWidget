import { clsx } from "@/Helpers/clsx";

type TCheckbox = Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">;

const Checkbox = ({ className, id, checked = true, ...rest }: TCheckbox) => {
  return (
    <div className={className}>
      <label
        className={clsx(
          "border border-gray-400 rounded-tiny h-[20px] w-[20px] inline-flex items-center justify-center cursor-pointer select-none text-white",
          checked && "bg-blue-500"
        )}
      >
        {checked && <i className="ph ph-check font-bold" />}
        <input
          type="checkbox"
          className="hidden"
          id={id}
          checked={checked}
          {...rest}
        />
      </label>
    </div>
  );
};

export default Checkbox;
