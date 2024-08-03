import { clsx } from "@/Helpers/clsx";

const Button = ({
  className,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      {...rest}
      className={clsx(
        "rounded bg-gray-700 text-white w-full p-2 hover:opacity-90",
        rest.disabled && "bg-gray-400 cursor-default",
        className
      )}
    ></button>
  );
};

export default Button;
