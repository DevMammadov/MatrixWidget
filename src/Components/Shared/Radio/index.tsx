import { clsx } from "@/Helpers/clsx";

type TRadio = Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">;

const Radio = ({ className, id, checked, ...rest }: TRadio) => {
  return (
    <div className={clsx(className, "relative inline-block")}>
      <label
        htmlFor={id}
        className={clsx(
          "h-[30px] w-[30px] border-[3px] rounded-full cursor-pointer block",
          checked && "bg-blue-500"
        )}
      >
        <input
          type="radio"
          className="hidden"
          id={id}
          checked={checked}
          {...rest}
        />
      </label>
    </div>
  );
};

export default Radio;
