import { clsx } from "@/Helpers/clsx";

type TTextField = React.InputHTMLAttributes<HTMLInputElement> & {
  phosphorIcon?: string;
};

const TextField = ({ phosphorIcon, ...rest }: TTextField) => {
  return (
    <div className="border-gray-700 border rounded-huge relative">
      <input
        {...rest}
        type="text"
        className={clsx(
          "focus:outline-none py-[5px] pr-1 pl-[35px] w-full rounded-huge text-xl",
          !phosphorIcon && "rounded-l-huge",
          rest.className
        )}
      />
      {phosphorIcon && (
        <div className="absolute top-1/2 translate-y-[-50%] left-2 flex items-center justify-center">
          <i className={phosphorIcon} />
        </div>
      )}
    </div>
  );
};

export default TextField;
