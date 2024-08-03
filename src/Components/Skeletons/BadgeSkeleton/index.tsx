import Counter from "@/Components/Shared/Counter";
import Skeleton from "@/Components/Shared/Skeleton";
import { TSkeletonProps } from "@/Components/Skeletons/skeleton.types";
import { clsx } from "@/Helpers/clsx";

const BadgeSkeleton = ({ count, className }: TSkeletonProps) => {
  return (
    <Counter count={count}>
      <Skeleton className={clsx("h-[40px] rounded-full", className)} />
    </Counter>
  );
};

export default BadgeSkeleton;
