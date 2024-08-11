import { clsx } from "@/Helpers/clsx";

type TArrowButton = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  direction?: "left" | "right";
};

const ArrowButton = ({
  direction = "left",
  className,
  ...rest
}: TArrowButton) => {
  return (
    <button
      {...rest}
      className={clsx(
        "z-30 bg-gray-700 text-white h-full w-[25px] focus:outline-none",
        className
      )}
    >
      <i
        className={clsx(
          direction === "left" ? "ph ph-caret-left" : "ph ph-caret-right"
        )}
      />
    </button>
  );
};

export default ArrowButton;
