import { clsx } from "@/Helpers/clsx";

type TArrowButton = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  direction?: "left" | "right";
};

const ArrowButton = ({
  className,
  direction = "right",
  children,
  disabled,
  ...rest
}: TArrowButton) => {
  const icon = direction === "left" ? "ph ph-caret-left" : "ph ph-caret-right";

  return (
    <button
      {...rest}
      disabled={disabled}
      className={clsx(
        "text-[2.5rem] leading-3 focus:outline-none rounded-md flex items-center ",
        !disabled && "hover:bg-gray-1000 hover:text-white active:scale-90",
        disabled && "text-gray-200 cursor-default",
        direction === "left" && "flex-row-reverse",
        className
      )}
    >
      {children}
      <i className={icon}></i>
    </button>
  );
};

export default ArrowButton;
