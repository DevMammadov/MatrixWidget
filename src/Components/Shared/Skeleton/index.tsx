import { clsx } from "@/Helpers/clsx";

type TSkeleton = {
  className?: string;
};

const Skeleton = ({ className }: TSkeleton) => {
  return (
    <div
      className={clsx("animate-pulse bg-gray-150 h-24 w-full", className)}
    ></div>
  );
};

export default Skeleton;
