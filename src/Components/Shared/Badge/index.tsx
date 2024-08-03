import { clsx } from "@/Helpers/clsx";

type TBadge = {
  children: React.ReactNode;
  className?: string;
  onClick?(): void;
};

const Badge = ({ children, className, onClick }: TBadge) => {
  return (
    <button
      className={clsx(
        "p-2 text-xl rounded-full text-gray-600 bg-cyan-100 flex justify-center items-center font-semibold focus:outline-none active:scale-95 transition-colors",
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Badge;
