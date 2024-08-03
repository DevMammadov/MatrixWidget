import Counter from "@/Components/Shared/Counter";
import Skeleton from "@/Components/Shared/Skeleton";
import { TSkeletonProps } from "@/Components/Skeletons/skeleton.types";

const SelectItemSkeleton = ({ count }: TSkeletonProps) => {
  return (
    <Counter count={count}>
      <div className="flex items-center justify-between w-full">
        <div className="flex gap-2 w-full">
          <Skeleton className="rounded-full h-[40px] w-[40px]" />
          <div className="flex flex-col justify-center gap-2 flex-1">
            <Skeleton className="h-[13px] w-[60%] rounded-md" />
            <Skeleton className="h-[12px] w-[20%] rounded-md" />
          </div>
        </div>
        <div className="relative">
          <Skeleton className="w-[30px] h-[30px] rounded-full" />
          <div className="bg-white w-[25px] h-[25px] absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] rounded-full"></div>
        </div>
      </div>
    </Counter>
  );
};

export default SelectItemSkeleton;
